import './navbar.scss';
import React from 'react';
import { Link } from 'react-router';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  renderNavBarItem(item) {
    let path = this.props.location.pathname;
    return (
      <li key={item.id}>
        <Link
          className={path === item.url ? 'navbar__link navbar__link--active' : 'navbar__link'}
          to={item.url}
        >{item.title}</Link>
      </li>
    );
  }

  render() {
    const items = [{
      id: 0, url: '/', title: 'Home'
    }, {
      id: 1, url: '/motions', title: 'Motions'
    }, {
      id: 2, url: '/politicians', title: 'Politicians'
    }];

    return (
      <div className="navbar">
        <ul className="navbar__list">
          { items.map(this.renderNavBarItem.bind(this)) }
        </ul>
      </div>
    );
  }
}

Navbar.propTypes = {
  location: React.PropTypes.shape({
    pathname: React.PropTypes.string
  })
};
