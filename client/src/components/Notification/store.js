import * as PubSubActionType from '../../utils/pubsub-actions';
import * as NotifyActionType from './constatnts';
import PubSub from '../../utils/pubsub-service';

const NotificationStore = (state = {}, action) => {
    switch (action.type) {
        case NotifyActionType.NOTIFY_SUCCESS:
            PubSub.publish(PubSubActionType.TOAST_SUCCESS, { msg: action.data });
            return state;
        case NotifyActionType.NOTIFY_ERROR:
            PubSub.publish(PubSubActionType.TOAST_ERROR, { msg: action.data });
            return state;
        default:
            return state;
    }
}

export default NotificationStore;