import * as SignInActionType from './constants';

const LoginDefaultState = {
    signin: false,
    status: ''
}

const SignInStore = (state=LoginDefaultState, action) => {
    switch (action.type) {
        case SignInActionType.SIGNIN_SUCCESS:
            return {
                status: action.status,
                signin: true,
            };
        case SignInActionType.SIGNIN_FAILD:
        return {
            status: action.status,
            signin: false,
        };
        default:
            return state;
    }
};




export default SignInStore;