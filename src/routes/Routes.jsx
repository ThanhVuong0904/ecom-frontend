import React from 'react'
import { Switch, Route } from 'react-router'
import Home from '../pages/Home'
import Product from '../pages/Product'
import ProductDetail from '../components/ProductDetail'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Auth from '../components/auth/Auth'
import Cart from '../pages/Cart'
import Payment from '../pages/Payment'
export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" render={props => <Auth {...props} authRoute='login' />}/>
            <Route exact path="/register" render={props => <Auth {...props} authRoute='register' />}/>
            <Route exact path="/product" component={Product}/>
            <Route exact path="/detail/:id" component={ProductDetail}/>
            <Route exact path="/about" component={About}/>
            <Route exact path="/contact" component={Contact}/>
            <Route exact path="/cart" component={Cart}/>
            <Route exact path="/checkout" component={Payment}/>
        </Switch>
    )
}
