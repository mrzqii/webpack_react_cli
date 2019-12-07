import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'
import './index.less'
export class Home extends Component {
    render() {
        return (
            <div className="home_wrapper">
               <NavLink className="btn" to="/animation">
                   动画测试
               </NavLink>
               <NavLink className="btn" to="/contexttest">
                   context上下文
               </NavLink>
               <NavLink className="btn" to="/suiyi">
                   随便写
               </NavLink>
            </div>
        );
    }
}
export default Home;
