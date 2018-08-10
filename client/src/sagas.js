import { all, call } from 'redux-saga/effects';

import WatchCreate from './container/Home/sagas';
import WatchLaptop from './container/Products/Laptop/sagas';
import WatchMobile from './container/Products/Mobile/sagas';
import WatchDetail from './container/Products/Detail/sagas';
import WatchAdmin from './container/Admin/sagas';
import WatchSignIn from './container/Login/Signin/sagas';
import WatchSignUp from './container/Login/Signup/sagas';
import WatchSearch from './container/Search/sagas';
import WatchUser from './container/Admin/listProducts/listUser/sagas';

export default function* rootSaga() {
    yield all([
       call(WatchCreate),
       call(WatchLaptop),
       call(WatchMobile),
       call(WatchAdmin),
       call(WatchDetail),
       call(WatchSignIn),
       call(WatchSignUp),
       call(WatchSearch),
       call(WatchUser)
    ]);
}