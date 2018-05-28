import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import ActionButtons from './ActionButtons'
import PostsSort from './PostsSort'
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Row, Col } from 'reactstrap'

class PostsList extends Component {
  render() {
    const { posts, handleRefreshClick } = this.props
    return (
      <div>

        <Row>
          <PostsSort />
          <Col>
            <Link className="btn btn-primary" to="/add-post">Add Post</Link>
          </Col>
          <Col>
            {posts.lastUpdated &&
              <span>
                Last updated at {new Date(posts.lastUpdated).toLocaleTimeString()}.
                {' '}
              </span>}
            {!posts.isFetching &&
              <button className="btn btn-default" onClick={handleRefreshClick}>
                Refresh
              </button>}
          </Col>
        </Row>

        <Row>
          <Col>
            {posts.isFetching && posts.items.length === 0 && (
              <p>Loading...</p>
            )}
            {!posts.isFetching && posts.items.length === 0 && (
              <p>Empty.</p>
            )}
          </Col>
        </Row>


        <Row>
          {posts.items.map(post =>
            <Col md="6" key={post.id}>
              <Card>
                <CardBody>
                  <CardTitle>{post.title}</CardTitle>
                  <CardSubtitle>By {post.author}, {post.commentCount} comments</CardSubtitle>
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
