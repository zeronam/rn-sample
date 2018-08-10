import { signUpApi } from '../../../api/signupApi';
import { put, call, takeEvery } from 'redux-saga/effects';

import * as SignUpActionType from './constants';

export function* signUpAsync(action) {
    const result = yield call(signUpApi, action.params);
    const statusCode = result.statusCode;
    if (statusCode === 200) {        
        yield [
            put({ type: SignUpActionType.SIGNUP_SUCCESS, status: 'Create success' }),
        ];
    } else {
        yield [
            put({ type: SignUpActionType.SIGNUP_FAILD, status: 'Create faild' }),
        ];
    }
};

export default function* WatchSignUp() { 
    yield[
        takeEvery(SignUpActionType.SIGNUP_ASYNC, signUpAsync),
    ]
}