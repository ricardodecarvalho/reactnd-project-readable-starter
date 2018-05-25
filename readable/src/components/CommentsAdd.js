import React, { Component } from 'react'
import { sendComment } from '../actions'
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

    //const { sendPost, history } = this.props
    const data = {
      id: uid(),
      parentId: post.id,
      timestamp: Date.now(),
      body: values.body,
      author: values.author
    }
    dispatch(sendComment(data))
    dispatch(reset('CommentsForm'))
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
