import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, withRouter, Link } from 'react-router-dom'
import { fetchCategories } from '../actions'
import NavBar from './NavBar'
import PostsView from './PostsView'
import PostsByCategoryView from './PostsByCategoryView'
import PostsAdd from './PostsAdd'
import PostsDetail from './PostsDetail'
import Room404 from './Room404'
import { Container } from 'reactstrap'

class App extends Component {
  componentDidMount() {
    this.props.fetchCategories()
  }

  render() {
    return (
      <Container>
        <NavBar />

        <Switch>
          <Route exact path="/" component={PostsView} />
          <Route exact path="/add-post" component={PostsAdd} />
          <Route exact path="/add-post/:postId" component={PostsAdd} />
          <Route exact path="/:category" component={PostsByCategoryView} />
          <Route exact path="/:category/:postId" component={PostsDetail} />
          <Route exact path='*' component={Room404} />
        </Switch>
      </Container>
    );
  }
}

function mapStateToProps({categories}) {
    return {
        categories
    }
}

function mapDispatchToProps(dispatch) {
    return {
      fetchCategories: () => dispatch(fetchCategories()),
    }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))
