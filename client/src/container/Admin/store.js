import * as AdminActionType from './constants';

const AdminStore = (state={}, action) => {
    switch (action.type) {
        case AdminActionType.CREATE_ADMIN_SUCCESS:
            return {
                status: action.status,
                create: true,
            };
        case AdminActionType.CREATE_ADMIN_FAILD:
        return {
            status: action.status,
            create: false,
        };
        case AdminActionType.ADMIN_RESET:
        return {
            status: action.status,
            create: false,
        };
        default:
            return state;
    }
};




export default AdminStore;