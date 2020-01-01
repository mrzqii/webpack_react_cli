import React, { Component } from 'react'
import 'animate.css'
import Animated from 'animated/lib/targets/react-dom'
import './index.less'
import st from './index.module.css'
class PhotoPreview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      anim: new Animated.Value(0)
    }
  }
  handleClick = () => {
    const { anim } = this.state
    anim.setValue(0)
    anim.stopAnimation(value => {
      Animated.spring(anim, {
        toValue: 2,
        duration: 1000
      }).start()
    })
  }
  render() {
    const { anim } = this.state
    const rotateDegree = anim.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [1, 0.5, 1]
    })
    const rotateDegree2 = anim.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [1, 1.1, 1]
    })
    return (
      <Animated.div
        onClick={this.handleClick}
        style={{
          display: 'inline-block',
          opacity: rotateDegree,
          transform: [
            {
              scale: rotateDegree2
            }
          ]
        }}
      >
        {this.props.children}
      </Animated.div>
    )
  }
}

export default class Mts extends Component {
  render() {
    return (
       <div className={st.ttttttt}>
         fsfs
       </div>
    )
  }
}
