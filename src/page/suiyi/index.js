import React, { Component, useState, useReducer, useMemo } from 'react'
import { useStore, useDispatch } from '../../store/index.js'
export default function ReducerDemo() {
  const agents = useStore('agents')
  const dispatch = useDispatch() // 获取 dispatch 方法
  const notice = useStore('notice')

  return (
    <>
      <button
        onClick={() => dispatch({ type: 'AGENTS_INIT', payload: [1, 2, 3, 4] })}
      >
        Reset
      </button>
      <button onClick={() => dispatch({ type: 'NOTICE_START' })}>-</button>
      <button onClick={() => dispatch({ type: 'NOTICE_STOP' })}>+</button>
      <button onClick={() => dispatch({ type: 'AGENTS_FETCH' },2)}>FETCH</button>
      <div>{JSON.stringify(agents)}</div>
      {notice.loading? <div>loading</div> : <div>not ~loading</div>}
    </>
  )
}
