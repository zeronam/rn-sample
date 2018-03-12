import * as SignInActionType from './constants';

const LoginDefaultState = {
    signin: false,
    status: '',
    data: null
}

const SignInStore = (state=LoginDefaultState, action) => {
    switch (action.type) {
        case SignInActionType.SIGNIN_SUCCESS:
            return {
                data: action.data,
                status: action.status,
                signin: true,
            };
        case SignInActionType.SIGNIN_FAILD:
        return {
            data: action.data,
            status: action.status,
            signin: false,
        };
        default:
            return state;
    }
};




export default SignInStore;