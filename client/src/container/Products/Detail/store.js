import * as IdActionType from './constants';


const DetailStore = (state = {}, action) => {
    switch (action.type) {
        case IdActionType.ID_SUCCESS:
            return {
                data: action.data,
                detailStatus: true,
            };
        default:
            return state;
    }
};




export default DetailStore;