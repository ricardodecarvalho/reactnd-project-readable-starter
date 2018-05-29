import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchPostById } from '../actions'
import CommentsView from './CommentsView'
import ActionButtons from './ActionButtons'
import Room404 from './Room404'
import { capitalize, convertEpoch } from '../utils/helpers'
import {MdPerson} from 'react-icons/lib/md'
import '../css/PostsDetail.css'
import Loading from './Loading'

class PostsDetail extends Component {

  componentDidMount() {
    const {match: {params}} = this.props
    this.props.fetchPostById(params.postId)
  }

  render () {
    const { postById } = this.props
    return (
      <div>
      {postById.isFetching && postById.items.length === 0 && (
        <Loading />
      )}

      {!postById.isFetching && Object.keys(postById.items).length > 0 && (
        <div className="posts-detail">
          <span className="small text-muted">
            <Link to={`/${postById.items.category}`}>{capitalize(postById.items.category)}</Link>
            - Posted by <MdPerson /> <strong>{postById.items.author}</strong> at {convertEpoch(postById.items.timestamp)}
          </span>
          <h1>{postById.items.title}</h1>
          <p className="body lead">{postById.items.body}</p>
          <ActionButtons data={postById.items} type="post" />

          <CommentsView post={postById.items} />
        </div>
      )}

      {!postById.isFetching && (postById.error || Object.keys(postById.items).length === 0) && (
        <Room404 />
      )}

    </div>
    )

  }

}

function mapStateToProps({postById}) {
  return {
    postById
  }
}

function mapDispatchToProps(dispatch) {
    return {
      fetchPostById: (postId) => dispatch(fetchPostById(postId))
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsDetail)
