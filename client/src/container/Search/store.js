import * as SearchActionType from './constants';

const SearchStore = (state={}, action) => {
    switch (action.type) {
        case SearchActionType.SEARCH_SUCCESS:
            return {
                status: action.status,
                create: true,
            };
        case SearchActionType.SEARCH_FAILD:
        return {
            status: action.status,
            create: false,
        };
        default:
            return state;
    }
};




export default SearchStore;