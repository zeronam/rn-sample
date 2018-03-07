﻿(function (root, factory) {
    'use strict';

    var PubSub = {};
    root.PubSub = PubSub;
    factory(PubSub);

    var define = root.define;

    if (typeof define === 'function' && define.amd) {
        define(function () { return PubSub; });

    } else if (typeof exports === 'object') {
        if (module !== undefined && module.exports) {
            exports = module.exports = PubSub; 
        }
        exports.PubSub = PubSub; 
        module.exports = exports = PubSub; 
    }

}((typeof window === 'object' && window) || this, function (PubSub) {
    'use strict';

    var messages = {},
        lastUid = -1;

    function hasKeys(obj) {
        var key;

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                return true;
            }
        }
        return false;
    }

    function throwException(ex) {
        return function reThrowException() {
            throw ex;
        };
    }

    function callSubscriberWithDelayedExceptions(subscriber, message, data) {
        try {
            subscriber(message, data);
        } catch (ex) {
            setTimeout(throwException(ex), 0);
        }
    }

    function callSubscriberWithImmediateExceptions(subscriber, message, data) {
        subscriber(message, data);
    }

    function deliverMessage(originalMessage, matchedMessage, data, immediateExceptions) {
        var subscribers = messages[matchedMessage],
            callSubscriber = immediateExceptions ? callSubscriberWithImmediateExceptions : callSubscriberWithDelayedExceptions,
            s;

        if (!messages.hasOwnProperty(matchedMessage)) {
            return;
        }

        for (s in subscribers) {
            if (subscribers.hasOwnProperty(s)) {
                callSubscriber(subscribers[s], originalMessage, data);
            }
        }
    }

    function createDeliveryFunction(message, data, immediateExceptions) {
        return function deliverNamespaced() {
            var topic = String(message),
                position = topic.lastIndexOf('.');

            deliverMessage(message, message, data, immediateExceptions);

            while (position !== -1) {
                topic = topic.substr(0, position);
                position = topic.lastIndexOf('.');
                deliverMessage(message, topic, data, immediateExceptions);
            }
        };
    }

    function messageHasSubscribers(message) {
        var topic = String(message),
            found = Boolean(messages.hasOwnProperty(topic) && hasKeys(messages[topic])),
            position = topic.lastIndexOf('.');

        while (!found && position !== -1) {
            topic = topic.substr(0, position);
            position = topic.lastIndexOf('.');
            found = Boolean(messages.hasOwnProperty(topic) && hasKeys(messages[topic]));
        }

        return found;
    }

    function publish(message, data, sync, immediateExceptions) {
        var deliver = createDeliveryFunction(message, data, immediateExceptions),
            hasSubscribers = messageHasSubscribers(message);

        if (!hasSubscribers) {
            return false;
        }

        if (sync === true) {
            deliver();
        } else {
            setTimeout(deliver, 0);
        }
        return true;
    }

    PubSub.publish = function (message, data) {
        return publish(message, data, false, PubSub.immediateExceptions);
    };

    PubSub.publishSync = function (message, data) {
        return publish(message, data, true, PubSub.immediateExceptions);
    };

    PubSub.subscribe = function (message, func) {
        if (typeof func !== 'function') {
            return false;
        }

        if (!messages.hasOwnProperty(message)) {
            messages[message] = {};
        }

        var token = 'uid_' + String(++lastUid);
        messages[message][token] = func;

        return token;
    };

    PubSub.clearAllSubscriptions = function clearAllSubscriptions() {
        messages = {};
    };

    PubSub.clearSubscriptions = function clearSubscriptions(topic) {
        var m;
        for (m in messages) {
            if (messages.hasOwnProperty(m) && m.indexOf(topic) === 0) {
                delete messages[m];
            }
        }
    };

    PubSub.unsubscribe = function (value) {
        var descendantTopicExists = function (topic) {
            var m;
            for (m in messages) {
                if (messages.hasOwnProperty(m) && m.indexOf(topic) === 0) {
                    return true;
                }
            }

            return false;
        },
            isTopic = typeof value === 'string' && (messages.hasOwnProperty(value) || descendantTopicExists(value)),
            isToken = !isTopic && typeof value === 'string',
            isFunction = typeof value === 'function',
            result = false,
            m, message, t;

        if (isTopic) {
            PubSub.clearSubscriptions(value);
            return;
        }

        for (m in messages) {
            if (messages.hasOwnProperty(m)) {
                message = messages[m];

                if (isToken && message[value]) {
                    delete message[value];
                    result = value;
                    break;
                }

                if (isFunction) {
                    for (t in message) {
                        if (message.hasOwnProperty(t) && message[t] === value) {
                            delete message[t];
                            result = true;
                        }
                    }
                }
            }
        }

        return result;
    };
}));