import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { deletePost } from '../actions'
import Vote from './Vote'

class PostsList extends Component {
  constructor(props) {
    super(props)
    this.handleDeleteClick= this.handleDeleteClick.bind(this)
  }

  handleDeleteClick(e, post) {
    e.preventDefault()
    if (window.confirm("Delete?")) {
      const { dispatch } = this.props
      dispatch(deletePost(post))
    }
  }

  render() {
    const { posts, handleRefreshClick } = this.props
    return (
      <div>
        <p>
          {posts.lastUpdated &&
            <span>
              Last updated at {new Date(posts.lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>}
          {!posts.isFetching &&
            <button onClick={handleRefreshClick}>
              Refresh
            </button>}
        </p>
        <ul>

          {posts.isFetching && posts.items.length === 0 && (
            <li>Loading...</li>
          )}
          {!posts.isFetching && posts.items.length === 0 && (
            <li>Empty.</li>
          )}

          {posts.items.map(post =>
            <li key={post.id}>
              <Link to={{
                pathname: `${post.category}/${post.id}`
              }}>
                {post.title}
              </Link>
              |
              <Link to={{
                pathname: `${post.category}/${post.id}`
              }}>
                Details
              </Link>
              |
              <Link to={{
                pathname: `/add-post/${post.id}`
              }}>

              |
                edit
              </Link> |
              <button
                id={post.id}
                onClick={(e) => this.handleDeleteClick(e, post)}>
                Delete
              </button>

              <Vote data={post} type="post" />

              <p>Author: {post.author}, voteScore: {post.voteScore}, commentCount: {post.commentCount}</p>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

PostsList.propTypes = {
    posts: PropTypes.object.isRequired,
    handleRefreshClick: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    state
  }
}

export default connect(
  mapStateToProps
)(PostsList)
