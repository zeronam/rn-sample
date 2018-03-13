import * as CartActionType from './constants';

const CartStore = (state = [], action) => {

    switch (action.type) {
            case CartActionType.ADD_TO_CART:
            var {product, quantity} = action.data;
            var index = -1;
            index = findProductInCart(state, product);
            if(index !== -1){
                state[index].quantity += quantity; 
            } else {
                state.push({
                    product,
                    quantity
                });
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