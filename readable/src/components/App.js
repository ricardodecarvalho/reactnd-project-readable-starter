import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, withRouter, Link } from 'react-router-dom'
import { fetchCategories } from '../actions'
import NavBar from './NavBar'
import PostsSort from './PostsSort'
import PostsView from './PostsView'
import PostsByCategoryView from './PostsByCategoryView'
import PostsAdd from './PostsAdd'
import '../css/App.css'

class App extends Component {
  componentDidMount() {
    this.props.fetchCategories()
  }

  render() {
    return (
      <div>
        <NavBar />
        <PostsSort />

        <Link to="/add-post">Add Post</Link>

        <Switch>
          <Route exact path="/" component={PostsView} />
          <Route exact path="/add-post" component={PostsAdd} />
          <Route exact path="/add-post/:postId" component={PostsAdd} />
          <Route exact path="/:category" component={PostsByCategoryView} />
        </Switch>
      </div>
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
