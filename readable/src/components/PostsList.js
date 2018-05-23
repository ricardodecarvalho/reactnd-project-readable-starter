import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const PostsList = (props) => (
  <div>
    <p>
      {props.posts.lastUpdated &&
        <span>
          Last updated at {new Date(props.posts.lastUpdated).toLocaleTimeString()}.
          {' '}
        </span>}
      {!props.posts.isFetching &&
        <button onClick={props.handleRefreshClick}>
          Refresh
        </button>}
    </p>
    <ul>

      {props.posts.isFetching && props.posts.items.length === 0 && <li>Loading...</li>}
      {!props.posts.isFetching && props.posts.items.length === 0 && <li>Empty.</li>}

      {props.posts.items.map(post =>
        <li key={post.id}>
          <Link to={{
            pathname: `${post.category}/${post.id}`
          }}>
            {post.title}
          </Link> | <Link to={{
            pathname: `/add-post/${post.id}`
          }}>
            edit
          </Link> | 
          <button id={post.id} name="upVote" onClick={props.handleVoteClick}>upVote</button>
          <button id={post.id} name="downVote" onClick={props.handleVoteClick}>downVote</button>
          <p>Author: {post.author}, voteScore: {post.voteScore}, commentCount: {post.commentCount}</p>
        </li>
      )}
    </ul>
  </div>
)

PostsList.propTypes = {
    posts: PropTypes.object.isRequired,
    handleRefreshClick: PropTypes.func.isRequired
}

export default PostsList
