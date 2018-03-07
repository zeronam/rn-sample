import * as CreateActionType from './constants';


const CreateStore = (state = {}, action) => {
    switch (action.type) {
        case CreateActionType.CREATE_SUCCESS:
            return {
                data: action.data,
                createStatus: true,
            };
        default:
            return state;
    }
};




export default CreateStore;