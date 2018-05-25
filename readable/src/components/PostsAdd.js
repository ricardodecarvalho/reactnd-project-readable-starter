import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sendPost, fetchPostById } from '../actions'
import PostsForm from './PostsForm'
import {reset} from 'redux-form'

class PostsAdd extends Component {

  componentDidMount() {
    const {match: {params}} = this.props
    this.props.fetchPostById(params.postId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.path !== this.props.match.path) {
      this.props.fetchPostById();
    }
  }

  handleSubmit = (values, dispatch) => {
      const id = values.id
      const timestamp = values.timestamp ? values.timestamp : Date.now()
      const { sendPost, history } = this.props
      const data = {
        id: id,
        timestamp: timestamp,
        title: values.title,
        author: values.author,
        category: values.category,
        body: values.body
      }
      sendPost(data)
      dispatch(reset('PostsForm'))
      history.goBack();
  }

  render() {
    const { categories } = this.props

    return (
      <div>
        <h1>Add Posts</h1>
        <PostsForm
          onSubmit={this.handleSubmit}
          categories={categories}
        />
      </div>
    )
  }
}

function mapStateToProps({ categories, postById }) {
  return {
    categories,
    postById
    /*
    posts: postcomponentDidUpdates.reduce((obj, p) => {
      obj[p.id] = p
      return obj
    }, {})
    */
  }
}

function mapDispatchToProps (dispatch) {
  return {
    sendPost: (post) => dispatch(sendPost(post)),
    fetchPostById: (postId) => dispatch(fetchPostById(postId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsAdd)
