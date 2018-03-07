import { create } from '../../api';
import { put, call, takeEvery } from 'redux-saga/effects';

import * as CreateActionType from './constants';

export function* createAsync(action) {
    const result = yield call(create, action.params);
    const statusCode = result.statusCode;

    if (statusCode === 200) {
        yield [
            put({ type: CreateActionType.CREATE_SUCCESS, data: result.data }),
        ];
    } else {
        console.warn("createAsync eror", result.data);
    }
};

export default function* WatchCreate() { 
    yield[
        takeEvery(CreateActionType.CREATE_ASYNC, createAsync),
    ]
}