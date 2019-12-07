import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import PermRouter from './permRouter'
import loadable from '@loadable/component'

import Login from '../login/index'
const Layout = loadable(() => import(/* webpackChunkName: "layout" */'../layout/index.js'))
const Home = loadable(() => import(/* webpackChunkName: "home" */'../home/index.js'))


const TAnimation = loadable(() => import(/* webpackChunkName: "animation" */'../tanimation/index.js'))
const TContexttest = loadable(() => import(/* webpackChunkName: "animation" */'../context/index.js'))
const Tsuiyi = loadable(() => import(/* webpackChunkName: "animation" */'../suiyi/index.js'))
 
 

const BasicRoute = () => (
    <HashRouter>
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/contexttest" exact component={TContexttest}/>
            <Route path="/login" component={Login}/>
            <Route path="/animation" component={TAnimation}/>
            <Route path="/suiyi" component={Tsuiyi}/>
            <Route 
                path="/main"
                render={()=>(
                    <Layout>
                        <Switch>
                            <PermRouter path="/main/home" component={Home}/>
                        </Switch>
                    </Layout>
                )} />
        </Switch>
    </HashRouter>
);
export default BasicRoute;