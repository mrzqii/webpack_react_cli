import React from "react";
import { hot } from "react-hot-loader/root";
import Router from './page/router'
import "./style/global.less";
import Provider from './store/index.js'
// polyfill only stable `core-js` features - ES and web standards:
import 'core-js/stable';
import 'regenerator-runtime/runtime'; //生成器函数、async、await函数
function App() {
  return (
    <Provider>
      <Router/>
    </Provider>
  );
}
export default hot(App);
