import Actions from './actions';
import { ActionObject as Action, PostState } from './types';

const initialState: PostState = {
  list: [],
  error: null
};

const posts = (state: PostState = initialState, action: Action) => {
  switch (action.type) {
    case Actions.posts.fetchPosts.success.toString():
      return {
        ...state,
        list: action.payload,
        error: null
      };
    case Actions.posts.fetchPosts.error.toString():
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default posts;
