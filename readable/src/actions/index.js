import * as ServerAPI from '../utils/ServerAPI'
import * as types from '../constants/ActionTypes'

//categories
const requestCategories = () => ({
  type: types.REQUEST_CATEGORIES
})

const receiveCategories = categories => ({
  type: types.RECEIVE_CATEGORIES,
  categories: categories,
  receivedAt: Date.now()
})

export const fetchCategories = () => dispatch => {
  dispatch(requestCategories())
  ServerAPI.getCategories()
    .then(json => {
      dispatch(receiveCategories(json))
    })
}

//posts
const requestPosts = posts => ({
  type: types.REQUEST_POSTS,
  posts
})

const receivePosts = posts => ({
  type: types.RECEIVE_POSTS,
  posts: posts,
  receivedAt: Date.now()
})

export const fetchPosts = () => dispatch => {
  dispatch(requestPosts())
  ServerAPI.getPosts()
  .then(json => {
    dispatch(receivePosts(json))
  })
}

//posts by category
export const fetchPostsByCategory = (category) => dispatch => {
  dispatch(requestPosts())
  ServerAPI.getPostsByCategory(category)
  .then(json => {
    dispatch(receivePosts(json))
  })
}

//post by id
const requestPostById = post => ({
  type: types.REQUEST_POST_BY_ID,
  post
})

const receivePostById = post => ({
  type: types.RECEIVE_POST_BY_ID,
  post: post,
  receivedAt: Date.now()
})

export const fetchPostById = (postId) => dispatch => {
  dispatch(requestPostById())
  if(undefined !== postId) {
    ServerAPI.getPostById(postId)
    .then(json => {
      dispatch(receivePostById(json))
    })
  } else {
    dispatch(receivePostById({}))
  }
}

// add and edit post
const addPost = post => ({
  type: types.ADD_POST,
  post
})

const editPost = post => ({
  type: types.EDIT_POST,
  post
})

export const sendPost = (post) => dispatch => {
  if(post.id === undefined){
    post.id = Math.random().toString(35).substr(2, 22)
    ServerAPI.addPost(post)
    .then(post => {
      dispatch(addPost(post))
    })
  } else {
    ServerAPI.updatePost(post)
    .then(post => {
      dispatch(editPost(post))
    })
  }
}

//sort post
export const loadSort = (active) => ({
  type: types.LOAD_SORT,
  active
})

//refresh post
const shouldFetchPosts = (state) => {
  const posts = state.posts
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  }
}

export const fetchPostsIfNeeded = () => (dispatch, getState) => {
    if (shouldFetchPosts(getState())) {
      dispatch(fetchPosts())
    }
}

//vote post
const requestVotePost = post => ({
  type: types.REQUEST_VOTE_POST,
  post
})

const receiveVotePost = post => ({
  type: types.RECEIVE_VOTE_POST,
  post: post,
  receivedAt: Date.now()
})

export const votePost = (post, vote) => dispatch => {
  dispatch(requestVotePost(post[0]))
	ServerAPI.votePost(post[0].id, vote)
  .then(json =>
    dispatch(receiveVotePost(json))
  )
}
