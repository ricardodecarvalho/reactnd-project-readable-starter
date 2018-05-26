import React, { Component } from 'react'
import { sendComment, fetchCommentById } from '../actions'
import CommentsForm from './CommentsForm'
import {reset} from 'redux-form'
import PropTypes from 'prop-types'
import {uid} from '../utils/helpers'

class CommentsAdd extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired
  }

  handleSubmit = (values, dispatch) => {
    const { post } = this.props
    const id = values.id
    const timestamp = values.timestamp ? values.timestamp : Date.now()
    const data = {
      id: id,
      parentId: post.id,
      timestamp: timestamp,
      body: values.body,
      author: values.author
    }
    dispatch(sendComment(data))
    dispatch(reset('CommentsForm'))
    dispatch(fetchCommentById())
  }

  render() {
    return (
      <div>
        <h3>Add Comments</h3>
        <CommentsForm
          onSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default CommentsAdd
