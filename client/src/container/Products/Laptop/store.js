import * as LaptopActionType from './constants';


const LaptopStore = (state = {}, action) => {
    switch (action.type) {
        case LaptopActionType.LAPTOP_SUCCESS:
            return {
                data: action.data,
                productStatus: true,
            };
        default:
            return state;
    }
};




export default LaptopStore;