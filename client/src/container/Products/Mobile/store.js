import * as MobileActionType from './constants';


const ProductStore = (state = {}, action) => {
    switch (action.type) {
        case MobileActionType.MOBILE_SUCCESS:
            return {
                data: action.data,
                productStatus: true,
            };
        default:
            return state;
    }
};




export default ProductStore;