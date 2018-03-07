import * as SignUpActionType from './constants';

const SignUpStore = (state={}, action) => {
    switch (action.type) {
        case SignUpActionType.SIGNUP_SUCCESS:
            return {
                status: action.status,
                signup: true,
            };
        case SignUpActionType.SIGNUP_FAILD:
        return {
            status: action.status,
            signup: false,
        };
        default:
            return state;
    }
};




export default SignUpStore;