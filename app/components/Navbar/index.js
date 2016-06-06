import './navbar.scss';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const items = [{
  id: 0, url: '/', title: 'Home',
}, {
  id: 1, url: '/motions', title: 'Motions',
}, {
  id: 2, url: '/politicians', title: 'Politicians',
}];


function renderNavBarItem(item) {
  const path = location.pathname;

  return (
    <li key={item.id}>
      <Link
        className={path === item.url ? 'navbar__link navbar__link--active' : 'navbar__link'}
        to={item.url}
      >{item.title}</Link>
    </li>
  );
}

function NavBar() {
  return (
    <div className="navbar">
      <ul className="navbar__list">
        {items.map(renderNavBarItem)}
      </ul>
    </div>
  );
}

NavBar.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

NavBar.defaultProps = {
  location: {
    pathname: '/',
  },
};


export default NavBar;
