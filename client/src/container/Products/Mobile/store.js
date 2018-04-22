import * as MobileActionType from './constants';


const ProductStore = (state = {}, action) => {
    switch (action.type) {
        case MobileActionType.MOBILE_SUCCESS:
            return {
                data: action.data,
                productStatus: true,
            };
        case MobileActionType.REMOVE_MOBILE_ITEM:
            var index = -1;
            var productRemove = action.data.product;         
            index = findProductInStore(state, productRemove);
            if(index !== -1){
                state.splice(index,1);
            }
            return [...state];
        default:
            return state;
    }
};

var findProductInStore = (cart, product) => {
    var index = -1;
    if(cart.length > 0) {
        for(var i=0; i<cart.length;i++) {
            if(cart[i].product._id === product._id) {
                index = i;
                break;
            }
        }
    }
    return index;
}


export default ProductStore;