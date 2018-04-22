import * as CartActionType from './constants';


const CartStore = (state = [], action) => {
    switch (action.type) {
        case CartActionType.ADD_TO_CART:
            var {product} = action.data;
            var {quanlity} = action.data.product;
            var index = -1;
            index = findProductInCart(state, product);
            if(index !== -1){
                state[index].product.quanlity += quanlity;
            } else {
                state.push({
                    product
                });
            }
            return [...state];
        case CartActionType.REMOVE_ITEM_CART:
            var productRemove = action.data.product;         
            index = findProductInCart(state, productRemove);
            if(index !== -1){
                state.splice(index,1);
            }
            return [...state];
        default:
            return [...state];
    }
};

var findProductInCart = (cart, product) => {
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


export default CartStore;