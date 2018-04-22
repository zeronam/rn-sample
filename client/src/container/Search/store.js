import * as SearchActionType from './constants';

const SearchStore = (state={}, action) => {
    switch (action.type) {
        case SearchActionType.SEARCH_SUCCESS:
            return {
                status: action.status,
                data: action.data,
                search: true,
                keyword: action.keyword
            };
        case SearchActionType.SEARCH_FAILD:
        return {
            status: action.status,
            search: false,
        };
        default:
            return state;
    }
};




export default SearchStore;