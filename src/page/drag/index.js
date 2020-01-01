import React, { Component } from 'react'
import './index.css'
import st from './index.module.css'
import { Carousel } from 'antd'
import ReactDOM from 'react-dom'
export class SliderMy extends Component {
  componentDidMount() {
    this.node = ReactDOM.findDOMNode(this.slider)
    this.node.ondragover = this.handleDragEnter
    this.node.ondragleave = this.handleDragLeave
    this.node.ondrop = this.handleDrop
    this.node.ondragenter = this.handleDragEnter
  }

  onChange = (a, b, c) => {
    // console.log(a, b, c)
  }
  handlePrev = () => {
    this.slider.prev()
  }
  handleNext = () => {
    this.slider.next()
  }
  handleDragEnter = e => {
    e.preventDefault()
    if (this.props.canDragIn) {
      this.setState({
        in: true
      })
    }
  }
  handleDragLeave = e => {
    e.preventDefault()
    if (this.props.canDragIn) {
      this.setState({
        in: false
      })
    }
  }
  handleDrop=(e)=>{
    e.preventDefault()
    this.props.dragTo(this.props.status)
    this.setState({
      in: false
    })
  }
  render() {
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1
    }
    return (
      <div style={{ position: 'relative' }}>
        <Carousel
          {...settings}
          afterChange={this.onChange}
          ref={instance => (this.slider = instance)}
        >
          {this.props.children}
        </Carousel>
        <div
          style={{ position: 'absolute', left: '0px', top: '50%' }}
          onClick={this.handlePrev}
        >
          {' '}
          {'<'}{' '}
        </div>
        <div
          style={{ position: 'absolute', right: '0px', top: '50%' }}
          onClick={this.handleNext}
        >
          {'>'}{' '}
        </div>
      </div>
    )
  }
}
/**
 * slider的一个item
 */
class SliderItem extends Component {
  handleDragStart = e => {
    this.props.onDragStart(this.props.id)
  }
  /**
   * 为了知道放在哪儿了
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
  getPosition=(e)=>{
    var id = e.target.getAttribute('flagid');
    console.log("id--->:", id)
    this.props.setPostion(id)

  }
  render() {
    return (
      <div
        id={this.props.id}
        draggable="true"
        onDragStart={this.handleDragStart}
        onDragEnd={this.props.onDragEnd}
        onDragOver = {this.getPosition}
      >
        {this.props.children}
      </div>
    )
  }
}

/**
 * 右边的整个盒子
 */
class DragTargetBox extends Component {
  state={
    in:false
  }
  handleDragEnter = e => {
    e.preventDefault()
    if (this.props.canDragIn) {
      this.setState({
        in: true
      })
    }
  }
  handleDragLeave = e => {
    e.preventDefault()
    if (this.props.canDragIn) {
      this.setState({
        in: false
      })
    }
  }
  handleDrop = e => {
    e.preventDefault()
    this.props.dragTo(this.props.status)
    this.setState({
      in: false
    })
  }
  onDragOver = e => {
    e.preventDefault()
  }

  render() {
    let classname = st.unChooseUserBox
    if(this.state.in){
      classname = st.unChooseUserBox+ " " + st.active
    }
    return (
      <div
        className={classname}
        onDragEnter={e => {
          this.handleDragEnter(e)
        }}
        onDragLeave={e => {
          this.handleDragLeave(e)
        }}
        onDragOver={e => {
          this.handleDragEnter(e)
        }}
        onDrop={e => {
          this.handleDrop(e)
        }}
      >
        {this.props.children}
      </div>
    )
  }
}
/**
 * 右边的一个盒子
 */
class DragItem extends Component {
  handleDragStart = e => {
    this.props.onDragStart(this.props.id)
  }
  /**
   * 为了知道放在哪儿了
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
  getPosition=(e)=>{
    var id = e.target.getAttribute('flagid');
    this.props.setPostion(id)
  }

  render() {
    return (
      <div
        draggable="true"
        className={st.unChooseUser}
        onDragStart={this.handleDragStart}
        onDragEnd={this.props.onDragEnd}
        onDragOver = {this.getPosition}
      >
        {this.props.children}
      </div>
    )
  }
}
/**
 * 整个组件
 */
let data = [
  { id: 1, name: 'a', status: 1 },
  { id: 2, name: 'b', status: 0 },
  { id: 3, name: 'c', status: 1 },
  { id: 4, name: 'd', status: 0 },
  { id: 5, name: 'e', status: 1 },
  { id: 6, name: 'f', status: 0 },
  { id: 7, name: 'g', status: 1 },
  { id: 8, name: 'h', status: 0 }
]
class DragCom extends Component {
  dragPosition = 0 // 拖拽到的具体位置 其实是一个id值
  state = {
    sourceData: data,
    activeId: null
  }
  /**
   * 传入被拖拽任务项的 id
   */
  onDragStart = id => {
    this.setState({
      activeId: id
    })
  }
  cancelSelect = () => {
    this.setState({
      activeId: null
    })
  }
  getStatus = id => {
    return this.state.sourceData.filter(item => item.id === id)[0]
  }
  id2index = (id)=>{
    let index = null
    this.state.sourceData.forEach((item,i)=>{
      if(item.id == id){
        index = i
      }
    })
    return index
  }
  changeSourceData = (id, sourceData, status) => {
    let index=null
    sourceData.forEach((item,i) => {

      if (item.id == id) {
        item.status = status;
        index = i
      }
    })
    return index
  }
  dragTo = status => {
    let { sourceData, activeId } = this.state
    let activeData = this.getStatus(activeId)
    if (activeData.status !== status) {
      let activeIndex = this.changeSourceData(activeId, sourceData, status) // 把对应id的状态进行改变,并获取到index值
      let positionIndex = this.id2index(this.dragPosition) // 找到拖拽目的地id的index
      //sourceData.splice(2,0,data.splice(3,1)[0]) //意思是把第4位(index=3)的数据移到第3位(index=2)
      sourceData.splice(positionIndex,0,sourceData.splice( activeIndex,1)[0])
      this.setState({
        sourceData: sourceData
      })
    }
    this.cancelSelect()
  }
  /**
   * 保存一个id 这个id就是拖拽结束那一瞬间的那个位置所对应的item的id值，通过这个id我们可以操作数组，来完成对数据的按位置插入
   * @param  {[type]} id [description]
   * @return {[type]}    [description]
   */
  setPostion=(id)=>{
    this.dragPosition = id
  }
  render() {
    let data = this.state.sourceData
    const activeId = this.state.activeId
    return (
      <div>
        <div style={{ width: '600px' }}>
          <SliderMy
              status={1}
              dragTo={this.dragTo}
              canDragIn={
                activeId != null &&
                this.getStatus(activeId)['status'] !== 1
              }
          >
            {data
              .filter(item => item.status)
              .map((item, index) => {
                return (
                  <SliderItem key={item.id}
                      id={item.id}
                      onDragStart={this.onDragStart}
                      onDragEnd={this.cancelSelect}
                      setPostion={this.setPostion}
                  >
                    <h3 flagid={item.id}>{item.name}</h3>
                  </SliderItem>

                )
              })}
          </SliderMy>
          <div
            style={{ width: '300px', position: 'absolute', right: 0, top: 100 }}
          >
            <DragTargetBox
              status={0}
              dragTo={this.dragTo}
              canDragIn={
                activeId != null &&
                this.getStatus(activeId)['status'] !== 0
              }
            >
              {data
                .filter(item => !item.status)
                .map((item, index) => {
                  return (
                    <DragItem
                      key={item.id}
                      id={item.id}
                      onDragStart={this.onDragStart}
                      onDragEnd={this.cancelSelect}
                      setPostion={this.setPostion}
                    >
                      <h3 flagid={item.id}>{item.name}</h3>
                    </DragItem>
                  )
                })}
            </DragTargetBox>
          </div>
        </div>
      </div>
    )
  }
}

export default DragCom
