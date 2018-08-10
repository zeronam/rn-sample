import { getListUser } from '../../../../api/userApi';
import { put, call, takeEvery } from 'redux-saga/effects';

import * as UserActionType from './constants';

export function* getUserAsync(action) {
    const result = yield call(getListUser, action.params);
    const statusCode = result.status;
    
    if (statusCode === 200) {
        yield [
            put({ type: UserActionType.GET_USER_LIST_SUCCESS, status: 'Create success', data: result.list }),
        ];
    } else {
        yield [
            put({ type: UserActionType.GET_USER_LIST_FAILD, status: 'Create faild' }),
        ];
    }
};

export default function* WatchUser() { 
    yield[
        takeEvery(UserActionType.GET_USER_LIST_ASYNC, getUserAsync),
    ]
}