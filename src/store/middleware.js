import axios from 'axios'
function getData(args){
 return axios({
    type:"get",
    url:`https://randomuser.me/api/?results=${args}`
  })
}

/**
 * 可以执行异步操作的中间件，每次执行dispatch之前都会先执行这个函数
 * @param  {[type]} state     [description]
 * @param  {[type]} dispatch) [description]
 * @return {[type]}           [description]
 */
const applyMiddleware = (state, dispatch) => async (action,args)=>{
  switch(action.type) { // 异步的操作
    case 'AGENTS_FETCH': {
      try {
        const serverResponse = await getData(args);
        dispatch({
          type: 'AGENTS_INIT',
          payload: serverResponse.data.results
        });
      } catch (e) {
        console.log(e);
      }
      return;
    }
  }
  // 继续默认的 dispatch 逻辑
  dispatch(action);
}
export default applyMiddleware;