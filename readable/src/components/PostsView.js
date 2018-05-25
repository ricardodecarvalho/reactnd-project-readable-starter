import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sortListPosts } from '../utils/helpers'
import PostsList from './PostsList'
import { fetchPosts } from '../actions'

class PostsView extends Component {
  constructor(props) {
    super(props)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    this.props.fetchPosts()
  }

  handleRefreshClick(e) {
    e.preventDefault()
    this.props.fetchPosts()
  }

  render() {
    const { sortPosts } = this.props;
    const posts = sortListPosts(this.props.posts, sortPosts)

    return (
      <div>
        <PostsList
          posts={posts}
          handleRefreshClick={this.handleRefreshClick}
        />
      </div>
    )
  }
}

function mapStateToProps({ sortPosts, posts }) {
    return {
        sortPosts,
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
)(PostsView)
