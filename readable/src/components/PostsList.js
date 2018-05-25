import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Vote from './Vote'
import PostsButtons from './PostsButtons'

class PostsList extends Component {
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

              <PostsButtons data={post} />

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

export default PostsList
