import React, { Component } from 'react'
import { connect } from 'react-redux'
import { votePost, voteComment } from '../actions'
import PropTypes from 'prop-types'

class Vote extends Component {
  constructor(props) {
    super(props)
    this.handleVoteClick = this.handleVoteClick.bind(this)
  }

  static propTypes = {
    data: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired
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

  render() {
    const { data } = this.props
    return (
      <div>
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

export default connect(
  mapStateToProps
)(Vote)
