import { getId } from '../../../api/detailApi';
import { put, call, takeLatest } from 'redux-saga/effects';

import * as IdActionType from './constants';

export function* createIdAsync(action) {
    const result = yield call(getId, action.params);
    const statusCode = result.status;
    
    if (statusCode === 200) {
        yield [
            put({ type: IdActionType.ID_SUCCESS, data: result.item }),
        ];
    } else {
        console.warn("createAsync eror", result.data);
    }
};

export default function* WatchDetail() {
    yield[
        takeLatest(IdActionType.ID_ASYNC, createIdAsync),
    ]
}