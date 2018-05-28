import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import {
  deletePost,
  deleteComment,
  votePost,
  voteComment,
  fetchCommentById,
  changePostVote
} from '../actions'
import PropTypes from 'prop-types'
import { ButtonGroup, Button } from 'reactstrap'
import {MdArrowDownward, MdArrowUpward} from 'react-icons/lib/md'

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

  handleVoteClick(e, vote, data) {
    e.preventDefault()
    const { dispatch, type, match: {params} } = this.props
    if (type === "post") {
      dispatch(votePost(data, vote))
      if (params && params.postId) {
        dispatch(changePostVote(params.postId, vote))
      }

    } else if (type === "comment") {
      dispatch(voteComment(data, vote))
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
    const { data, type, match: {params} } = this.props
    return (
      <div>

        {type === "post" && !params.postId && (
          <Button size="sm" color="link" tag={Link} to={{
            pathname: `${data.category}/${data.id}`
          }}>Details</Button>
        )}

        {type === "post" && (
          <Button size="sm" tag={Link} color="link" to={{
            pathname: `/add-post/${data.id}`
          }}>Edit</Button>
        )}

        {type === "comment" && (
          <Button
            size="sm"
            color="link"
            id={data.id}
            onClick={(e) => this.handleEditCommentClick(e)}>
            Edit
          </Button>
        )}

        <Button
          size="sm"
          color="link"
          id={data.id}
          onClick={(e) => this.handleDeleteClick(e, data)}>
          Delete
        </Button>

        <Button
          color="link"
          size="sm"
          id={data.id}
          name="upVote"
          onClick={(e) => this.handleVoteClick(e, "upVote", data)}>
          <MdArrowUpward />
        </Button>
        {data.voteScore}
        <Button
          color="link"
          size="sm"
          id={data.id}
          name="downVote"
          onClick={(e) => this.handleVoteClick(e, "downVote",  data)}>
          <MdArrowDownward />
        </Button>

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
