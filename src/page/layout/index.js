// 主体布局
import React from "react";
import './index.less'
import Header from '../../component/header'
class Main extends React.Component {
  render() {
    return (
      <div className="layout_container">
        <div className="main">
          <Header/>
          <div className="content">{this.props.children}</div>
        </div>
      </div>
    );
  }
}
export default Main