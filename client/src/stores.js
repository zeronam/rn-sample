import { combineReducers } from 'redux';
import CreateStore from './container/Home/store';
import LaptopStore from './container/Products/Laptop/store';
import MobileStore from './container/Products/Mobile/store';
import DetailStore from './container/Products/Detail/store';
import AdminStore from './container/Admin/store';
import SignInStore from './container/Login/Signin/store';
import SignUpStore from './container/Login/Signup/store';
import NotificationStore from './components/Notification/store';

const rootReducer = combineReducers({
    CreateStore,
    LaptopStore,
    MobileStore,
    AdminStore,
    DetailStore,
    NotificationStore,
    SignInStore,
    SignUpStore
})

export default rootReducer;
