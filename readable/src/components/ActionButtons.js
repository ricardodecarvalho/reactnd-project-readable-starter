import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import {
  deletePost,
  deleteComment,
  votePost,
  voteComment,
  fetchCommentById
} from '../actions'
import PropTypes from 'prop-types'

class ActionButtons extends Component {
  constructor(props) {
    super(props)
    this.props.dispatch(fetchCommentById())
    this.handleDeleteClick= this.handleDeleteClick.bind(this)
    this.handleVoteClick = this.handleVoteClick.bind(this)
    this.handleEditCommentClick = this.handleEditCommentClick.bind(this)
  }

  static propTypes = {
    data: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired
  }

  handleDeleteClick(e, data) {
    e.preventDefault()
    if (window.confirm("Delete?")) {
      const { dispatch, history, type } = this.props
      if (type === "post") {
        dispatch(deletePost(data))
        history.goBack();
      } else if (type === "comment") {
        dispatch(deleteComment(data))
        this.props.dispatch(fetchCommentById())
      } else {
        window.alert("Delete type undefined")
      }
    }
  }

  handleVoteClick(e, data) {
    e.preventDefault()
    const { dispatch, type } = this.props
    if (type === "post") {
      dispatch(votePost(data, e.target.name))
    } else if (type === "comment") {
      dispatch(voteComment(data, e.target.name))
    } else {
      window.alert("Vote type undefined")
    }
  }

  handleEditCommentClick(e) {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(fetchCommentById(e.target.id))
  }

  render() {
    const { data, type } = this.props
    return (
      <div>
        {type === "post" && (
          <Link to={{
            pathname: `/add-post/${data.id}`
          }}>edit</Link>
        )}

        {type === "comment" && (
          <button
            id={data.id}
            onClick={(e) => this.handleEditCommentClick(e)}>
            Edit
          </button>
        )}

        <button
          id={data.id}
          onClick={(e) => this.handleDeleteClick(e, data)}>
          Delete
        </button>
        <button
          id={data.id}
          name="upVote"
          onClick={(e) => this.handleVoteClick(e, data)}>
          upVote
        </button>
        <button
          id={data.id}
          name="downVote"
          onClick={(e) => this.handleVoteClick(e, data)}>
          downVote
        </button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    state
  }
}

export default withRouter(connect(
  mapStateToProps
)(ActionButtons))
