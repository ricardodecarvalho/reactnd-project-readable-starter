import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadSort } from '../actions'

class PostsSort extends Component {
  render() {
    const { sortPosts } = this.props;
    return (
      <div>
        <label>Sort By: </label>
        <select
          defaultValue={sortPosts.active}
          onChange={(e) => {
            this.props.loadSort(e.target.value)
          }}
        >
          {sortPosts.sorts && (
            sortPosts.sorts.map((item, key) => (
              <option
                key={key}
                value={item.id}
              >{item.title}</option>
            ))
          )}
        </select>
      </div>
    )
  }
}

function mapStateToProps ({ sortPosts }) {
  return {
    sortPosts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadSort: (active) => dispatch(loadSort(active))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsSort)
