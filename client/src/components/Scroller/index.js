import React from 'react';
import deepEqual from 'deep-equal';
import IScroll from 'iscroll/build/iscroll-probe';

import styles from './styles.scss';

const excludePropNames = ['defer', 'iScroll', 'onRefresh', 'options', 'topShadowOnScroll'];

// Events available on iScroll instance
// {`react component event name`: `iScroll event name`}
const availableEventNames = {};
const iScrollEventNames = [
  'beforeScrollStart',
  'scrollCancel',
  'scrollStart',
  'scroll',
  'scrollEnd',
  'flick',
  'zoomStart',
  'zoomEnd',
];

for (let i = 0, len = iScrollEventNames.length; i < len; i += 1) {
  const iScrollEventName = iScrollEventNames[i];
  const reactEventName = `on${iScrollEventName[0].toUpperCase()}${iScrollEventName.slice(1)}`;
  availableEventNames[reactEventName] = iScrollEventName;
  excludePropNames.push(reactEventName);
}

const DEFAULT_OPTIONS = {
  mouseWheel: true,
  disableMouse: true,
  disablePointer: true,
  scrollbars: true,
  freeScroll: true,
  interactiveScrollbars: true,
  shrinkScrollbars: true,
  momentum: true,
  scrollX: true,
  scrollY: true,
  probeType: 2,
  tap: true,
};

export default class Scroller extends React.Component {
  static displayName = 'Scroller';

  static defaultProps = {
    topShadowOnScroll: false,
    defer: true,
    options: DEFAULT_OPTIONS,
    style: {
      // position: 'relative',
      height: '100%',
      width: '100%',
      overflow: 'hidden',
    },
  };

  constructor(props) {
    super(props);

    this._isMounted = false;
    this.initializeTimeout = null;
    this.queuedCallbacks = [];
    this.iScrollBindedEvents = {};
  }

  componentDidMount() {
    this._isMounted = true;
    this.initializeIScroll();
  }

  // There is no state, we can compare only props.
  shouldComponentUpdate(nextProps, nextContext) {
    return !deepEqual(this.props, nextProps) || !deepEqual(this.context, nextContext);
  }

  // Check if iScroll options has changed and recreate instance with new one
  componentDidUpdate(prevProps) {
    // If options are same, iScroll behaviour will not change. Just refresh events and trigger refresh
    if (deepEqual(prevProps.options, this.props.options)) {
      this.updateIScrollEvents(prevProps, this.props);
      this.refresh();

      // If options changed, we will destroy iScroll instance and create new one with same scroll position
      // TODO test if this will work with indicators
    } else {
      this.reload();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.teardownIScroll();
  }

  getIScroll() {
    return this.iScrollInstance;
  }

  getIScrollInstance() {
    console.warn("Function 'getIScrollInstance' is deprecated. Instead use 'getIScroll'");
    return this.iScrollInstance;
  }

  reload() {
    this.withIScroll(true, iScrollInstance => {
      // Save current state
      const { x, y, scale } = iScrollInstance;

      // Destroy current and Create new instance of iScroll
      this.teardownIScroll();
      this.initializeIScroll();

      this.withIScroll(true, newIScrollInstance => {
        // Restore previous state
        if (scale && newIScrollInstance.zoom) {
          newIScrollInstance.zoom(scale, 0, 0, 0);
        }

        newIScrollInstance.scrollTo(x, y);
      });
    });
  }

  withIScroll(waitForInit, callback) {
    if (!callback && typeof waitForInit === 'function') {
      callback = waitForInit;
    }

    if (this.getIScroll()) {
      callback(this.getIScroll());
    } else if (waitForInit === true) {
      this.queuedCallbacks.push(callback);
    }
  }

  refresh() {
    this.withIScroll(iScrollInstance => {
      iScrollInstance.refresh();
    });
  }

  performInitializeIScroll() {
    const { options } = this.props;

    // Create iScroll instance with given options
    const iScrollInstance = new IScroll(this.div, options);
    this.iScrollInstance = iScrollInstance;

    this.triggerInitializeEvent(iScrollInstance);

    // Patch iScroll instance .refresh() function to trigger our onRefresh event
    iScrollInstance.originalRefresh = iScrollInstance.refresh;

    iScrollInstance.refresh = () => {
      iScrollInstance.originalRefresh.apply(iScrollInstance);
      this.triggerRefreshEvent(iScrollInstance);
    };

    // Bind iScroll events
    this.bindIScrollEvents();

    this.callQueuedCallbacks();
  }

  initializeIScroll() {
    if (this._isMounted === false) {
      return;
    }

    const { defer } = this.props;

    if (defer === false) {
      this.performInitializeIScroll();
    } else {
      const timeout = defer === true ? 0 : defer;
      this.initializeTimeout = setTimeout(() => this.performInitializeIScroll(), timeout);
    }
  }

  callQueuedCallbacks() {
    const callbacks = this.queuedCallbacks;
    const len = callbacks.length;

    this.queuedCallbacks = [];

    for (let i = 0; i < len; i += 1) {
      callbacks[i](this.getIScroll());
    }
  }

  teardownIScroll() {
    this.clearInitializeTimeout();

    if (this.iScrollInstance) {
      this.iScrollInstance.off('scroll', this.handleScroll);
      this.iScrollInstance.off('scrollEnd', this.handleScroll);
      this.iScrollInstance.destroy();
      this.triggerDestroyEvent(this.iScrollInstance);
      this.iScrollInstance = undefined;
    }

    this.iScrollBindedEvents = {};
    this.queuedCallbacks = [];
  }

  clearInitializeTimeout() {
    if (this.initializeTimeout !== null) {
      clearTimeout(this.initializeTimeout);
      this.initializeTimeout = null;
    }
  }

  bindIScrollEvents() {
    // Bind events on iScroll instance
    this.iScrollBindedEvents = {};
    this.updateIScrollEvents({}, this.props);
  }

  // Iterate through available events and update one by one
  updateIScrollEvents(prevProps, nextProps) {
    for (const reactEventName in availableEventNames) {
      this.updateIScrollEvent(
        availableEventNames[reactEventName],
        prevProps[reactEventName],
        nextProps[reactEventName],
      );
    }
    this.withIScroll(true, iScrollInstance => {
      iScrollInstance.on('scroll', this.handleScroll);
      iScrollInstance.on('scrollEnd', this.handleScroll);
    });
  }

  // Unbind and/or Bind event if it was changed during update
  updateIScrollEvent(iScrollEventName, prevPropEvent, currentPropEvent) {
    if (prevPropEvent !== currentPropEvent) {
      const currentEvents = this.iScrollBindedEvents;

      this.withIScroll(true, iScrollInstance => {
        if (typeof prevPropEvent === 'function') {
          iScrollInstance.off(iScrollEventName, currentEvents[iScrollEventName]);
          currentEvents[iScrollEventName] = undefined;
        }

        if (typeof currentPropEvent === 'function') {
          const wrappedCallback = function(...args) {
            currentPropEvent(iScrollInstance, ...args);
          };

          iScrollInstance.on(iScrollEventName, wrappedCallback);
          currentEvents[iScrollEventName] = wrappedCallback;
        }
      });
    }
  }

  triggerInitializeEvent(iScrollInstance) {
    const onInitialize = this.props.onInitialize;

    if (typeof onInitialize === 'function') {
      onInitialize(iScrollInstance);
    }
  }

  triggerRefreshEvent(iScrollInstance) {
    const onRefresh = this.props.onRefresh;

    if (typeof onRefresh === 'function') {
      onRefresh(iScrollInstance);
    }
  }

  triggerDestroyEvent(iScrollInstance) {
    const onDestroy = this.props.onDestroy;

    if (typeof onDestroy === 'function') {
      onDestroy(iScrollInstance);
    }
  }

  handleScroll = () => {
    if (!this.props.topShadowOnScroll) {
      return;
    }

    if (this.iScrollInstance && this.iScrollInstance.y !== 0 && this.div) {
      this.div.classList.add(styles.hasScroll);
    } else if (this.div) {
      this.div.classList.remove(styles.hasScroll);
    }
  };

  render() {
    // Keep only non ReactIScroll properties
    const props = {};

    for (const prop in this.props) {
      if (!~excludePropNames.indexOf(prop)) {
        props[prop] = this.props[prop];
      }
    }

    let cls = [];
    if (props.className) {
      cls = props.className.split(' ');
    }

    cls.push('scroller');
    props.className = cls.join(' ');

    return (
      <div
        ref={ref => {
          this.div = ref;
        }}
        {...props}
      />
    );
  }
}
