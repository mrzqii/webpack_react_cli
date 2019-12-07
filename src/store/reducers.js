import { setIn } from 'immutable';

export const initialState = {
  agents:[],
  notice: {
    loading:undefined,
    newResourceAgentId:undefined
  }
}

const reducer = (state, action)=>{
  state = state || []
  switch (action.type) {
    case 'AGENTS_INIT':
      return setIn(state, ['agents'], [...action.payload]);
    case 'NOTICE_START':
      return setIn(state, ['notice', 'loading'], true);
    case 'NOTICE_STOP':
      return setIn(state, ['notice', 'loading'], false);
    default:
      return state;
  }
}

export default reducer;