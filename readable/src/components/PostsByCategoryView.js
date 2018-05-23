import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { sortListPosts } from '../utils/helpers'
import PostsList from './PostsList'
import PropTypes from 'prop-types'
import { capitalize } from '../utils/helpers'
import { fetchPostsByCategory, votePost } from '../actions'

class PostsByCategoryView extends Component {
  constructor(props) {
    super(props)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
    this.handleVoteClick = this.handleVoteClick.bind(this)
  }

  static propTypes = {
    match: PropTypes.object.isRequired
  }

  componentDidMount() {
    const { match: { params: { category } } } = this.props;
    this.props.fetchPostsByCategory(category)
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { category } } } = this.props;
    if (category !== prevProps.match.params.category) {
      this.props.fetchPostsByCategory(category)
    }
  }

  handleRefreshClick(e) {
    e.preventDefault()
    const { match: { params: { category } } } = this.props;
    this.props.fetchPostsByCategory(category)
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
    const { sortPosts, match: { params: { category } } } = this.props;
    const posts = sortListPosts(this.props.posts, sortPosts)

    return (
      <div>
        {category && (
          <h1>{capitalize(category)}</h1>
        )}
        <PostsList
          posts={posts}
          category={category}
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
      fetchPostsByCategory: (category) => dispatch(fetchPostsByCategory(category)),
      votePost: (id, vote) => dispatch(votePost(id, vote))
    }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsByCategoryView))
