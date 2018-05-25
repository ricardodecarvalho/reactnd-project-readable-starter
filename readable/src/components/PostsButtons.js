import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { deletePost } from '../actions'
import PropTypes from 'prop-types'

class PostsButtons extends Component {
  constructor(props) {
    super(props)
    this.handleDeleteClick= this.handleDeleteClick.bind(this)
  }

  handleDeleteClick(e, data) {
    e.preventDefault()
    if (window.confirm("Delete?")) {
      const { dispatch, history } = this.props
      dispatch(deletePost(data))
      history.goBack();
    }
  }

  render() {
    const { data } = this.props
    return (
      <div>
        <Link to={{
          pathname: `/add-post/${data.id}`
        }}>edit</Link>
        <button
          id={data.id}
          onClick={(e) => this.handleDeleteClick(e, data)}>
          Delete
        </button>
      </div>
    )
  }
}

PostsButtons.propTypes = {
    data: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    state
  }
}

export default withRouter(connect(
  mapStateToProps
)(PostsButtons))
