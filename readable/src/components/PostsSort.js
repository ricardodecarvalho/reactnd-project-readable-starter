import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadSort } from '../actions'
import { InputGroup, InputGroupAddon, InputGroupText, Input, Col } from 'reactstrap'

class PostsSort extends Component {
  render() {
    const { sortPosts } = this.props;
    return (
      <Col md="3">
        <InputGroup>
          <InputGroupAddon addonType="prepend">Sort By</InputGroupAddon>
          <Input
            type="select"
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
          </Input>
        </InputGroup>
      </Col>
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
