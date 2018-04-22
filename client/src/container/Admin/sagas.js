import { adminCreate } from '../../api/adminApi';
import { put, call, takeEvery } from 'redux-saga/effects';

import * as AdminActionType from './constants';

export function* createAdminAsync(action) {
    const result = yield call(adminCreate, action.params);
    const statusCode = result.statusCode;
    if (statusCode === 200) {
        yield [
            put({ type: AdminActionType.CREATE_ADMIN_SUCCESS, status: 'Create success' }),
        ];
    } else {
        yield [
            put({ type: AdminActionType.CREATE_ADMIN_FAILD, status: 'Create faild' }),
        ];
    }
};

export default function* WatchAdmin() { 
    yield[
        takeEvery(AdminActionType.CREATE_ADMIN_ASYNC, createAdminAsync),
    ]
}