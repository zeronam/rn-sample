import * as React from 'react';
import { Route } from 'react-router-dom';
import Layout from './layout';
import Home from './container/Home';
import ProductList from './container/Products';
import Mobile from './container/Products/Mobile';
import Laptop from './container/Products/Laptop';
import Detail from './container/Products/Detail';
import Admin from './container/Admin';
import Signin from './container/Login/Signin';
import Signup from './container/Login/Signup';

export const routes = <Layout>
    <Route exact path='/' component={Home} />
    <Route exact path='/home' component={Home} />
    <Route exact path='/products' component={ProductList} />
    <Route exact path='/products/mobile' component={Mobile} />
    <Route exact path='/products/laptop' component={Laptop} />
    <Route exact path='/admin' component={Admin} />
    <Route path="/detail/:id" component={Detail}/>
    <Route path="/account" component={Signin}/>
    <Route path="/register" component={Signup}/>
</Layout>;