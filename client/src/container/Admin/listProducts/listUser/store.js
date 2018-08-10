import * as UserActionType from './constants';

const UserStore = (state={}, action) => {
    switch (action.type) {
        case UserActionType.GET_USER_LIST_SUCCESS:
            return {
                status: action.status,
                data: action.data
            };
        case UserActionType.GET_USER_LIST_FAILD:
        return {
            status: action.status
        };
        default:
            return state;
    }
};

export default UserStore;