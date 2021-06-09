import { Action, Routine } from './types';

// USERS
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const fetchUsersRequest: Action = (payload) => ({
  type: FETCH_USERS_REQUEST,
  payload
});
fetchUsersRequest.toString = () => FETCH_USERS_REQUEST;

const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR';
const fetchUsersError: Action = (payload) => ({
  type: FETCH_USERS_ERROR,
  payload
});
fetchUsersError.toString = () => FETCH_USERS_ERROR;

const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const fetchUsersSuccess: Action = (payload) => ({
  type: FETCH_USERS_SUCCESS,
  payload
});
fetchUsersSuccess.toString = () => FETCH_USERS_SUCCESS;
const requestUsers = () => (dispatch) => {
  dispatch(fetchUsersRequest());
  return fetch('https://jsonplaceholder.typicode.com/users')
    .then(
      response => response.json(),
      error => {
        console.error(error);
        dispatch(fetchUsersError(error))
      }
    )
    .then(json => dispatch(fetchUsersSuccess(json)));
}

// POSTS
const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
const fetchPostsRequest: Action = (payload) => ({
  type: FETCH_POSTS_REQUEST,
  payload
});
fetchPostsRequest.toString = () => FETCH_POSTS_REQUEST;

const FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR';
const fetchPostsError: Action = (payload) => ({
  type: FETCH_POSTS_ERROR,
  payload
});
fetchPostsError.toString = () => FETCH_POSTS_ERROR;

const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
const fetchPostsSuccess: Action = (payload) => ({
  type: FETCH_POSTS_SUCCESS,
  payload
});
fetchPostsSuccess.toString = () => FETCH_POSTS_SUCCESS;

const requestPosts = () => (dispatch) => {
  dispatch(fetchPostsRequest());
  return fetch('https://jsonplaceholder.typicode.com/posts')
    .then(
      response => response.json(),
      error => {
        console.error(error);
        dispatch(fetchPostsError(error))
      }
    )
    .then(json => dispatch(fetchPostsSuccess(json)));
}

export default {
  users: {
    fetchUsers: {
      trigger: requestUsers,
      request: fetchUsersRequest,
      error: fetchUsersError,
      success: fetchUsersSuccess
    },
  },
  posts: {
    fetchPosts: {
      trigger: requestPosts,
      request: fetchPostsRequest,
      error: fetchPostsError,
      success: fetchPostsSuccess
    }
  }
};
