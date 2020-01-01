import React, { Component } from 'react'
import Echarts from 'echarts'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'

export class index extends Component {
  setArr = (index, len, item) => {
    var arr = []
    for (var j = 0; j < index; j++) {
      arr.push(undefined)
    }
    for (var i = 0; i < len - index; i++) {
      arr.push(item)
    }
    return arr
  }
  getOption = () => {
    let data = [
      {
        NAME: '2018',
        VALUE: 120
      },
      {
        NAME: '2019',
        VALUE: 150
      },
      {
        NAME: '2020',
        VALUE: 170
      },
      {
        NAME: '2021',
        VALUE: 270
      }
    ]

    let year = []
    let series = []
    let len = data.length
    data.forEach((item, index) => {
      year.push(item.NAME)
      series.push({
        name: item.NAME,
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'insideRight'
          }
        },
        data: this.setArr(index, len, item.VALUE)
      })
    })
    var option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },

      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        axisLine: {
          //x轴
          show: false
        },
        axisTick: {
          //x轴刻度线
          show: false
        },
        axisLabel: {
          interval: 0,
          rotate: -40,
          color: ['rgba(98, 111, 134, 1)'],
          fontSize: 13,
          margin: 13
        }
      },
      yAxis: {
        type: 'category',
        axisLine: {
          //x轴
          show: false
        },
        axisTick: {
          //x轴刻度线
          show: false
        },
        data: year
      },
      series: series
    }

    return option
  }
  render() {
    return (
      <div style={{ width: '600px', height: '600px' }}>
        <ReactEchartsCore
          ref={e => {
            this.echarts_react = e
          }}
          echarts={echarts}
          option={this.getOption()}
          notMerge={true}
          lazyUpdate={true}
          style={{ height: '100%' }}
          onEvents={{
            click: this.onChartClick
          }}
        />
      </div>
    )
  }
}

export default index
