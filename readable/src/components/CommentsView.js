import React, {Component} from 'react'
import { connect } from 'react-redux'
import { fetchCommentsByPost } from '../actions'
import { convertEpoch } from '../utils/helpers'
import ActionButtons from './ActionButtons'
import CommentsAdd from './CommentsAdd'
import PropTypes from 'prop-types'

class CommentsView extends Component {

  static propTypes = {
    post: PropTypes.object.isRequired
  }

  componentDidMount(prevProps) {
    const {post} = this.props
      this.props.fetchCommentsByPost(post.id)
  }

  render () {
    const { commentsByPost, post } = this.props

    return (
      <div>
        <h2>Comments</h2>

          <CommentsAdd post={post} />

          {commentsByPost.isFetching && commentsByPost.items.length === 0 && (
            <li>Loading...</li>
          )}
          {!commentsByPost.isFetching && commentsByPost.items.length === 0 && (
            <li>Empty.</li>
          )}

          {commentsByPost.items.map(comment =>
            <div key={comment.id}>
              <p>timestamp: {convertEpoch(comment.timestamp)}</p>
              <p>Author: {comment.author}</p>
              <p>Body: {comment.body}</p>
              <p>voteScore: {comment.voteScore}</p>

              <ActionButtons data={comment} type="comment" />

              <hr />
            </div>
          )}
      </div>
    )
  }
}

function mapStateToProps({ commentsByPost }) {
  return {
    commentsByPost
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCommentsByPost: (postId) => dispatch(fetchCommentsByPost(postId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentsView)
