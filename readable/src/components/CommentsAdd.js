import React, { Component } from 'react'
import { sendComment, fetchCommentById } from '../actions'
import CommentsForm from './CommentsForm'
import {reset} from 'redux-form'
import PropTypes from 'prop-types'
import { Element, Events, scroller, scrollSpy } from 'react-scroll'
import '../css/CommentsAdd.css'

class CommentsAdd extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired
  }

  componentDidMount() {
    Events.scrollEvent.register('end', function (e) {
      if (arguments && e !== 'add-comments' && arguments[0] === e) {
        arguments[1].classList.add("success-comments")
      }
    });
    scrollSpy.update();
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

    //scroll
    const element = values.id !== undefined ? values.id : "last-comment"
    this.scrollTo(element)
  }

  scrollTo(element) {
    scroller.scrollTo(element, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
      activeClass: 'success-comments'
    })
  }

  render() {
    return (
      <Element name="add-comments" className="add-comments">
        <CommentsForm
          onSubmit={this.handleSubmit}
        />
      </Element>
    )
  }
}

export default CommentsAdd
