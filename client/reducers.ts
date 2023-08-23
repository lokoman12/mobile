// reducers.ts

import { ActionTypes } from './actions';

interface State {
  count: number;
}

const initialState: State = {
  count: 0,
};

const reducer = (state: State = initialState, action: ActionTypes): State => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1,
      };
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
};

export default reducer;
