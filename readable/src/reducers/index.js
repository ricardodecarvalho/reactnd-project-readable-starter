import { combineReducers } from 'redux'
import * as types from '../constants/ActionTypes'
import {reducer as formReducer} from 'redux-form'

const categories = (
  state = {
    isFetching: false,
    items: []
  },
  action
) => {
  switch (action.type) {
    case types.REQUEST_CATEGORIES:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case types.RECEIVE_CATEGORIES:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.categories,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

const posts = (state = {
    isFetching: false,
    items: []
  },
  action
) => {
  switch (action.type) {
    case types.REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case types.RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      })
    case types.ADD_POST:
      return Object.assign({}, state, {
        isFetching: false,
        items: [
          ...state,
          action.post
        ],
        lastUpdated: action.receivedAt
      })
    case types.EDIT_POST:
    case types.RECEIVE_VOTE_POST:
      return Object.assign({}, state, {
        isFetching: false,
        items: state.items.map(p => p.id === action.post.id ? action.post : p)
      })
    case types.REQUEST_DELETE_POST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case types.RECEIVE_DELETE_POST:
      return Object.assign({}, state, {
        isFetching: false,
        items: state.items.filter(p => p.id !== action.post.id)
      })
    default:
      return state
  }
}

const postById = (
  state = {
    isFetching: false,
    items: []
  },
  action
) => {
  switch (action.type) {
    case types.REQUEST_POST_BY_ID:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case types.RECEIVE_POST_BY_ID:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.post,
        lastUpdated: action.receivedAt,
        error: false
      })
    case types.INCREMENT_POST_VOTE:
      return Object.assign({}, state, {
        isFetching: false,
        items: {...state.items, voteScore: state.items.voteScore + 1}
      })
    case types.DEDUCT_POST_VOTE:
      return Object.assign({}, state, {
        isFetching: false,
        items: {...state.items, voteScore: state.items.voteScore - 1}
      })
    case types.INCREMENT_COMMENT_COUNT:
      return Object.assign({}, state, {
        isFetching: false,
        items: {...state.items, commentCount: state.items.commentCount + 1}
      })
    case types.DEDUCT_COMMENT_COUNT:
      return Object.assign({}, state, {
        isFetching: false,
        items: {...state.items, commentCount: state.items.commentCount - 1}
      })
    case types.ERROR_RECEIVE_POST_BY_ID:
      return Object.assign({}, state, {
        isFetching: false,
        items: {},
        error: true
      })
    default:
      return state
  }
}

const commentsByPost = (
  state = {
    isFetching: false,
    items: []
  },
  action
) => {
  switch (action.type) {
    case types.REQUEST_COMMENTS_BY_POST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case types.RECEIVE_COMMENTS_BY_POST:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.comments
      })
    case types.RECEIVE_VOTE_COMMENT:
      return Object.assign({}, state, {
        isFetching: false,
        items: state.items.map(c => c.id === action.comment.id ? action.comment : c),
      })
    case types.REQUEST_ADD_COMMENT:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case types.RECEIVE_ADD_COMMENT:
      return Object.assign({}, state, {
        isFetching: false,
        items: [
          ...state.items,
          {...action.comment}
        ]
      })
    case types.REQUEST_EDIT_COMMENT:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case types.RECEIVE_EDIT_COMMENT:
      return Object.assign({}, state, {
        isFetching: false,
        items: state.items.map(c => c.id === action.comment.id ? action.comment : c)
      })
    case types.REQUEST_DELETE_COMMENT:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case types.RECEIVE_DELETE_COMMENT:
      return Object.assign({}, state, {
        isFetching: false,
        items: state.items.filter(c => c.id !== action.comment.id)
      })
    default:
      return state
  }
}

const commentById = (
  state = {
    isFetching: false,
    items: []
  },
  action
) => {
  switch (action.type) {
    case types.REQUEST_COMMENT_BY_ID:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case types.RECEIVE_COMMENT_BY_ID:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.comment
      })
    default:
      return state
  }
}

const initialSortPostsState = {
  active: 'date-desc',
  sorts: [
    {
      'id': 'votes-asc',
      'title': 'Votes Low-High',
      'sortBy': ['voteScore', '-timestamp']
    },
    {
      'id': 'votes-desc',
      'title': 'Votes High-Low',
      'sortBy': ['-voteScore', '-timestamp']
    },
    {
      'id': 'date-asc',
      'title': 'Date Old-New',
      'sortBy': ['timestamp', '-voteScore']
    },
    {
      'id': 'date-desc',
      'title': 'Date New-Old',
      'sortBy': ['-timestamp', '-voteScore']
    },
  ]
};

function sortPosts (state = initialSortPostsState, action) {
  switch (action.type) {
    case types.LOAD_SORT:
      return {
        ...state,
        active: action.active
      };
    default :
      return state;
  }
}

export default combineReducers({
  categories,
  posts,
  postById,
  commentsByPost,
  commentById,
  sortPosts,
  form: formReducer
})
