import { searchProduct } from '../../api/searchApi';
import { put, call, takeEvery } from 'redux-saga/effects';

import * as SearchActionType from './constants';

export function* createSearchAsync(action) {
    const result = yield call(searchProduct, action.params);
    const statusCode = result.statusCode;
    if (statusCode === 200) {
        yield [
            put({ type: SearchActionType.SEARCH_SUCCESS, status: 'Search success', data: result.item  }),
        ];
    } else {
        yield [
            put({ type: SearchActionType.SEARCH_FAILD, status: 'Search faild' }),
        ];
    }
};

export default function* WatchSearch() { 
    yield[
        takeEvery(SearchActionType.SEARCH_ASYNC, createSearchAsync),
    ]
}