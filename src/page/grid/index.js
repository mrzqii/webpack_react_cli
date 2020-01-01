import React, { Component } from "react";
import "./index.css";
export class GridLayout extends Component {
  render() {
    return (
      <div className="container">
        <div className="item item-1">1</div>
        <div className="item item-2">2</div>
        <div className="item item-3">3</div>
        <div className="item item-4">4</div>
        <div className="item item-5">5</div>
        <div className="item item-6">
          <iframe src="/video/video.html" />
        </div>
      </div>
    );
  }
}

export default GridLayout;
