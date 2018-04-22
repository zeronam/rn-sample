import * as LaptopActionType from './constants';


const LaptopStore = (state = {}, action) => {
    switch (action.type) {
        case LaptopActionType.LAPTOP_SUCCESS:
            return {
                data: action.data,
                productStatus: true,
            };
            case LaptopActionType.REMOVE_LAPTOP_ITEM:
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


export default LaptopStore;