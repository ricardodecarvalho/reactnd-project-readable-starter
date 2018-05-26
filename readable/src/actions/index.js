import * as ServerAPI from '../utils/ServerAPI'
import * as types from '../constants/ActionTypes'
import {uid} from '../utils/helpers'

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
    post.id = uid()
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
  post: post
})

export const votePost = (post, vote) => dispatch => {
  dispatch(requestVotePost(post))
	ServerAPI.votePost(post.id, vote)
  .then(json =>
    dispatch(receiveVotePost(json))
  )
}

//delete post
const requestDeletePost = () => ({
  type: types.REQUEST_DELETE_POST
})

const receiveDeletePost = post => ({
  type: types.RECEIVE_DELETE_POST,
  post: post
})

export const deletePost = (post) => dispatch => {
  dispatch(requestDeletePost())
  ServerAPI.deletePost(post.id)
  .then(json =>
    dispatch(receiveDeletePost(json))
  )
}

//delete comment
const requestDeleteComment = () => ({
  type: types.REQUEST_DELETE_COMMENT
})

const receiveDeleteComment = comment => ({
  type: types.RECEIVE_DELETE_COMMENT,
  comment: comment
})

export const deductCommentCount = payload => ({
  type: types.DEDUCT_COMMENT_COUNT,
  payload
});

export const deleteComment = (comment) => dispatch => {
  dispatch(requestDeleteComment())
  ServerAPI.deleteComment(comment.id)
  .then(json => {
    dispatch(receiveDeleteComment(json))
    dispatch(deductCommentCount(json))
  })
}

// comments by post
const requestCommentsByPost = () => ({
  type: types.REQUEST_COMMENTS_BY_POST
})

const receiveCommentsByPost = comments => ({
  type: types.RECEIVE_COMMENTS_BY_POST,
  comments: comments
})
export const fetchCommentsByPost = (postId) => dispatch => {
  dispatch(requestCommentsByPost())
  ServerAPI.getCommentsByPost(postId)
  .then(json => {
    dispatch(receiveCommentsByPost(json))
  })
}

//vote comment
const requestVoteComment = comment => ({
  type: types.REQUEST_VOTE_COMMENT,
  comment
})

const receiveVoteComment = comment => ({
  type: types.RECEIVE_VOTE_COMMENT,
  comment: comment,
})

export const voteComment = (comment, vote) => dispatch => {
  dispatch(requestVoteComment(comment))
	ServerAPI.voteComment(comment.id, vote)
  .then(json =>
    dispatch(receiveVoteComment(json))
  )
}

// add comments
const requestAddComment = () => ({
  type: types.REQUEST_ADD_COMMENT,
})

const receiveAddComment = comment => ({
  type: types.RECEIVE_ADD_COMMENT,
  comment
})

export const incrementCommentCount = payload => ({
  type: types.INCREMENT_COMMENT_COUNT,
  payload
});

export const sendComment = (comment) => dispatch => {
  dispatch(requestAddComment())
  ServerAPI.addComment(comment)
  .then(json => {
    dispatch(receiveAddComment(json))
    dispatch(incrementCommentCount(json))
  })
}
