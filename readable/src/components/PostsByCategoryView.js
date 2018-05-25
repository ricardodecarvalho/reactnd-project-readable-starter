import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { sortListPosts } from '../utils/helpers'
import { PropTypes }from 'prop-types'
import PostsList from './PostsList'
import { capitalize } from '../utils/helpers'
import { fetchPostsByCategory } from '../actions'

class PostsByCategoryView extends Component {
  constructor(props) {
    super(props)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
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
    }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsByCategoryView))
