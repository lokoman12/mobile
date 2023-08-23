// actions.ts

export interface IncrementAction {
    type: 'INCREMENT';
  }
  
  export interface DecrementAction {
    type: 'DECREMENT';
  }
  
  export type ActionTypes = IncrementAction | DecrementAction;
  
  export const increment = (): IncrementAction => {
    return {
      type: 'INCREMENT',
    };
  };
  
  export const decrement = (): DecrementAction => {
    return {
      type: 'DECREMENT',
    };
  };
  