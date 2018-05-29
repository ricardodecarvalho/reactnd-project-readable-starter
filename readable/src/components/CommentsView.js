import React, {Component} from 'react'
import { connect } from 'react-redux'
import { fetchCommentsByPost } from '../actions'
import { convertEpoch } from '../utils/helpers'
import ActionButtons from './ActionButtons'
import CommentsAdd from './CommentsAdd'
import PropTypes from 'prop-types'
import {Row, Col, Alert} from 'reactstrap'
import Loading from './Loading'
import { Element } from 'react-scroll'
import {MdPerson} from 'react-icons/lib/md'
import '../css/CommentsView.css'

class CommentsView extends Component {

  static propTypes = {
    post: PropTypes.object.isRequired
  }

  componentDidMount() {
    const {post} = this.props
      this.props.fetchCommentsByPost(post.id)
  }

  render () {
    const { commentsByPost, post } = this.props

    return (
      <div>

        <Row>
          <Col md="4">
            <CommentsAdd post={post} />
          </Col>
        </Row>

        {commentsByPost.isFetching && commentsByPost.items.length === 0 && (
          <Loading />
        )}
        {!commentsByPost.isFetching && commentsByPost.items.length === 0 && (
          <Alert color="info">No comment, be the first.</Alert>
        )}

        {commentsByPost.items.map((comment, index) =>
          <Element key={comment.id} name={comment.id}>
            <p className="small text-muted firt-line">Posted by <MdPerson /> <strong>{comment.author}</strong> at {convertEpoch(comment.timestamp)}</p>
            <p className="body">{comment.body}</p>
            <ActionButtons data={comment} type="comment" />
            {commentsByPost.items.length !== index + 1 && (<hr />)}
            {commentsByPost.items.length === index + 1 && (
              <Element name="last-comment"></Element>
            )}
          </Element>
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
