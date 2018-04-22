import { signInApi } from '../../../api/signinApi';
import { put, call, takeEvery } from 'redux-saga/effects';

import * as SignInActionType from './constants';

export function* signInAsync(action) {
    const result = yield call(signInApi, action.params);
    const statusCode = result.statusCode;
    if (statusCode === 200) {        
        yield [
            put({ type: SignInActionType.SIGNIN_SUCCESS, status: 'Login success', data: result.item }),
        ];
    } else {
        yield [
            put({ type: SignInActionType.SIGNIN_FAILD, status: 'Login faild' }),
        ];
    }
};

export default function* WatchSignIn() { 
    yield[
        takeEvery(SignInActionType.SIGNIN_ASYNC, signInAsync),
    ]
}