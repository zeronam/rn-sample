import { listLaptop } from '../../../api/laptopApi';
import { put, call, takeEvery } from 'redux-saga/effects';

import * as laptopActionType from './constants';

export function* LaptopAsync(action) {
    const result = yield call(listLaptop, action.params);
    const statusCode = result.statusCode;
    if (statusCode === 200) {
        yield [
            put({ type: laptopActionType.LAPTOP_SUCCESS, data: result.items }),
        ];
    } else {
        console.warn("createAsync eror", result.data);
    }
};

export default function* WatchLaptop() { 
    yield[
        takeEvery(laptopActionType.LAPTOP_ASYNC, LaptopAsync),
    ]
}