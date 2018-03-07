/**
 * Button Component. Usage:
   <Button label="Primary" kind="primary" />
   <Button label="Full Width" kind="primary" fullWidth />
   <Button label="Primary Disabled" kind="primary" disabled />
   <Button label="Secondary" kind="secondary" />
   <Button label="Secondary Disabled" kind="secondary" disabled />
   <Button label="Icon & Label" kind="primary" icon="user" /> <br />
   <Button label="Icon & Label" kind="secondary" icon="user" /> <br />
   <Button kind="primary" icon="user" /> <br />
   <Button kind="secondary" icon="user" />
   <Button label="Icon & Label" kind="link" icon="arrow-left" /> <br />
*/

import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.scss';

import LoadingIndicator from '../LoadingIndicator';

class Button extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  focus() {
    if (this.button) {
      this.button.focus();
    }
  }

  render() {
    const buttonClassArray = [styles.button];
    if (this.props.theme) {
      buttonClassArray.push(styles[this.props.theme]);
    }
    if (this.props.className) {
      buttonClassArray.push(this.props.className);
    }

    if (this.props.icon) {
      buttonClassArray.push(styles.icon);
      if (!this.props.label) {
        buttonClassArray.push(styles.iconOnly);
      }
    }

    if (this.props.fullWidth) {
      buttonClassArray.push(styles.fullWidth);
    }

    let buttonClassName = 'primary';

    switch (this.props.kind) {
      case 'primary':
        buttonClassArray.push(styles.primary);
        break;
      case 'secondary':
        buttonClassArray.push(styles.secondary);
        break;
      case 'link':
        buttonClassArray.push(styles.link);
        break;
      default:
        buttonClassArray.push(styles.primary);
    }

    buttonClassName = buttonClassArray.join(' ');

    const size = this.props.size || 'regular';

    return (
      <button
        onClick={this.props.onClick}
        disabled={this.props.disabled}
        type={this.props.type ? this.props.type : null}
        className={buttonClassName}
        style={this.props.style ? this.props.style : null}
        tabIndex={this.props.tabIndex}
        title={this.props['data-tip']}
        data-size={size}
        data-tip={this.props['data-tip']}
        ref={ref => {
          this.button = ref;
        }}
        data-test-id={this.props.dataTestId}
      >
        {this.props.icon ? <i data-icon={this.props.icon} /> : ''}
        {this.props.loading ? <LoadingIndicator isLoading={this.props.loading} /> : null}
        {this.props.label}
      </button>
    );
  }
}

Button.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  kind: PropTypes.string,
  title: PropTypes.string,
  tabIndex: PropTypes.number,
  onClick: PropTypes.func,
  fullWidth: PropTypes.bool,
  style: PropTypes.object,
  loading: PropTypes.bool,
  size: PropTypes.string,
  theme: PropTypes.oneOf(['orange']),
  dataTestId: PropTypes.string,
  'data-tip': PropTypes.string,
};

export default Button;
