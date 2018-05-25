import React, {Component} from 'react'
import { connect } from 'react-redux'
import { fetchPosts } from '../actions'
import CommentsView from './CommentsView'
import { convertEpoch } from '../utils/helpers'
import Vote from './Vote'
import PostsButtons from './PostsButtons'

class PostsDetail extends Component {

  componentDidMount() {
    this.props.fetchPosts()
  }

  render () {
    const { posts, match: {params} } = this.props

    return posts && posts.items.length > 0 ?
      this.renderData(posts.items.filter(p => p.id === params.postId)[0]) :
      this.renderLoading()
  }

  renderData(data) {
    return (
      <div>
        <h1>{data.title}</h1>
        <Vote data={data} type="post" />

        <PostsButtons data={data} />

        <p>by: {data.author} - {convertEpoch(data.timestamp)}</p>
        <p>{data.category}</p>
        <p>voteScore {data.voteScore}</p>
        <p>commentCount: {data.commentCount}</p>
        <p>{data.body}</p>

        <CommentsView post={data} />

      </div>
    )
  }

  renderLoading() {
      return <div>Loading...</div>
    }

}

function mapStateToProps({posts}) {
  return {
    posts
  }
}

function mapDispatchToProps(dispatch) {
    return {
      fetchPosts: () => dispatch(fetchPosts())
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsDetail)
