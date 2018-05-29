import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import ActionButtons from './ActionButtons'
import PostsSort from './PostsSort'
import { capitalize, convertEpoch } from '../utils/helpers'
import { Card, CardBody,
  CardTitle, CardSubtitle, Row, Col, Alert } from 'reactstrap'
import '../css/PostsList.css'
import {MdPerson, MdAdd, MdRefresh} from 'react-icons/lib/md'
import Loading from './Loading'

class PostsList extends Component {
  render() {
    const { posts, handleRefreshClick } = this.props
    return (
      <div>

        <Row className="header-actions">
          <Col>
            <Link className="btn btn-primary btn-sm" to="/add-post">
            <MdAdd /> Add Post</Link>{' '}
            {!posts.isFetching &&
              <button className="btn btn-default btn-sm" onClick={handleRefreshClick}>
                <MdRefresh /> Refresh
              </button>}{' '}
            {posts.lastUpdated &&
              <span className="small">
                Last updated at {new Date(posts.lastUpdated).toLocaleTimeString()}.
              </span>}
          </Col>
          <PostsSort />
        </Row>

        <Row>
          <Col>
            {posts.isFetching && posts.items.length === 0 && (
              <Loading />
            )}
            {!posts.isFetching && posts.items.length === 0 && (
              <Alert color="info">
                No posts for this category.
              </Alert>
            )}
          </Col>
        </Row>


        <Row>
          {posts.items.map(post =>
            <Col key={post.id} md="6">
              <Card>
                <CardBody>
                  <CardSubtitle className="small">
                    <Link to={`/${post.category}`}>{capitalize(post.category)}</Link>
                    - Posted by <MdPerson /> <strong>{post.author}</strong> at {convertEpoch(post.timestamp)}</CardSubtitle>
                  <CardTitle>
                    <Link to={{
                      pathname: `${post.category}/${post.id}`
                    }}>{post.title}</Link>
                  </CardTitle>
                    <ActionButtons data={post} type="post" />
                </CardBody>
              </Card>
              </Col>
            )}
        </Row>
      </div>
    )
  }
}

PostsList.propTypes = {
    posts: PropTypes.object.isRequired,
    handleRefreshClick: PropTypes.func.isRequired
}

export default PostsList
