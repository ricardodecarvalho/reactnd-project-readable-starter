import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { capitalize } from '../utils/helpers'
import {
  Nav,
  NavItem,
  NavLink} from 'reactstrap'
  import Loading from './Loading'
  import '../css/Loading.css'

class CategoriesList extends Component {
  render() {
    const { categories } = this.props;
    return (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink tag={Link} to="/">All</NavLink>
        </NavItem>

        {categories.isFetching && categories.items.length === 0 && (
          <li className="margin-top-loading"><Loading type="line" /></li>
        )}

        {categories.items.length > 0 &&
          categories.items.map(categorie =>

            <NavItem key={categorie.path}>
              <NavLink tag={Link} to={`/${categorie.path}`}>
                {capitalize(categorie.name)}
              </NavLink>
            </NavItem>

        )}

      </Nav>
    )
  }
}

function mapStateToProps ({ categories }) {
  return {
  categories
  }
}

export default connect(mapStateToProps)(CategoriesList)
