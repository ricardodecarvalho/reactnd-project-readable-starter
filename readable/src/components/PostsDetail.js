import React, {Component} from 'react'
import { connect } from 'react-redux'
import { fetchPostById } from '../actions'
import CommentsView from './CommentsView'
import { convertEpoch } from '../utils/helpers'
import ActionButtons from './ActionButtons'
import Room404 from './Room404'

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
        <li>Loading...</li>
      )}

      {!postById.isFetching && Object.keys(postById.items).length !== 0 && (
        <div>
          <h1>{postById.items.title}</h1>

          <ActionButtons data={postById.items} type="post" />

          <p>by: {postById.items.author} - {convertEpoch(postById.items.timestamp)}</p>
          <p>{postById.items.category}</p>
          <p>voteScore {postById.items.voteScore}</p>
          <p>commentCount: {postById.items.commentCount}</p>
          <p>{postById.items.body}</p>

          <CommentsView post={postById.items} />
        </div>
      )}

      {!postById.isFetching && Object.keys(postById.items).length === 0 && (
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
