import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { sortListPosts } from '../utils/helpers'
import PostsList from './PostsList'
import { fetchPosts, votePost } from '../actions'

class PostsView extends Component {
  constructor(props) {
    super(props)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
    this.handleVoteClick = this.handleVoteClick.bind(this)
  }

  componentDidMount() {
    this.props.fetchPosts()
  }

  handleRefreshClick(e) {
    e.preventDefault()
    this.props.fetchPosts()
  }

  handleVoteClick(e) {
    e.preventDefault()
    const {id, name} = e.target
    console.log()
    this.props.votePost(
      this.props.posts.items.filter(p => p.id === id),      
      name
    )
  }

  render() {
    const { sortPosts } = this.props;
    const posts = sortListPosts(this.props.posts, sortPosts)

    return (
      <div>
        <PostsList
          posts={posts}
          handleRefreshClick={this.handleRefreshClick}
          handleVoteClick={this.handleVoteClick}
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
      fetchPosts: () => dispatch(fetchPosts()),
      votePost: (id, vote) => dispatch(votePost(id, vote))
    }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsView))
