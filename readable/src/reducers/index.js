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
        isFetching: true,
      })
    case types.RECEIVE_DELETE_POST:
      return Object.assign({}, state, {
        isFetching: false,
        items: state.items.filter(p => p.id !== action.post.id)        
      })
    case types.INCREMENT_COMMENT_COUNT:
      return Object.assign({}, state, {
        isFetching: false,
        items: state.items.map((p, index) => p.id === action.payload.parentId ?
        {...state.items[index], commentCount: state.items[index].commentCount + 1} : p)
      })
    case types.DEDUCT_COMMENT_COUNT:
      return Object.assign({}, state, {
        isFetching: false,
        items: state.items.map((p, index) => p.id === action.payload.parentId ?
        {...state.items[index], commentCount: state.items[index].commentCount - 1} : p)
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
        lastUpdated: action.receivedAt
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

const initialSortPostsState = {
  active: 'votes-desc',
  sorts: [
    {
      'id': 'votes-asc',
      'title': 'Votes Low-high',
      'sortBy': ['voteScore', '-timestamp']
    },
    {
      'id': 'votes-desc',
      'title': 'Votes High-low',
      'sortBy': ['-voteScore', '-timestamp']
    },
    {
      'id': 'date-asc',
      'title': 'Date Old-new',
      'sortBy': ['timestamp', '-voteScore']
    },
    {
      'id': 'date-desc',
      'title': 'Date New-old',
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
  categories, posts, postById, commentsByPost, sortPosts, form: formReducer
})
