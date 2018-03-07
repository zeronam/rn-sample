import { listMobile } from '../../../api/mobileApi';
import { put, call, takeEvery } from 'redux-saga/effects';

import * as MobileActionType from './constants';

export function* MobileAsync(action) {
    const result = yield call(listMobile, action.params);
    const statusCode = result.statusCode;
    if (statusCode === 200) {
        yield [
            put({ type: MobileActionType.MOBILE_SUCCESS, data: result.items }),
        ];
    } else {
        console.warn("createAsync eror", result.data);
    }
};

export default function* WatchMobile() {
    yield[
        takeEvery(MobileActionType.MOBILE_ASYNC, MobileAsync),
    ]
}