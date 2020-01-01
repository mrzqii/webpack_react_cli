import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import PermRouter from './permRouter'
import loadable from '@loadable/component'

import Login from '../login/index'
const Layout = loadable(() => import(/* webpackChunkName: "layout" */'../layout/index.js'))
const Home = loadable(() => import(/* webpackChunkName: "home" */'../home/index.js'))


const TAnimation = loadable(() => import(/* webpackChunkName: "animation" */'../tanimation/index.js'))
const TContexttest = loadable(() => import(/* webpackChunkName: "animation" */'../context/index.js'))
const Tredux = loadable(() => import(/* webpackChunkName: "animation" */'../redux/index.js'))
const TDragCom = loadable(() => import(/* webpackChunkName: "animation" */'../drag/index.js'))
const TGrid = loadable(() => import(/* webpackChunkName: "animation" */'../grid/index.js'))



const BasicRoute = () => (
    <HashRouter>
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/contexttest" exact component={TContexttest}/>
            <Route path="/login" component={Login}/>
            <Route path="/animation" component={TAnimation}/>
            <Route path="/redux" component={Tredux}/>
            <Route path="/drag" component={TDragCom}/>
            <Route path="/grid" component={TGrid}/>
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