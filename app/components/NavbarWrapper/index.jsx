// @flow
import './navbar.scss';
import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';
import { SearchBox } from 'searchkit';

const propTypes = {
  contentLeft: PropTypes.arrayOf(PropTypes.node),
  contentRight: PropTypes.arrayOf(PropTypes.node),
};

class NavbarWrapper extends React.Component {
  wrapInListItems(content, keyBase) {
    return content && content.map((item, i) =>
      <li key={`${keyBase}.${i}`}>{item}</li>
    );
  }

  queryBuilder(queryString) {
    return ({
      bool: {
        must: {
          simple_query_string: {
            query: queryString,
            fields: ['text'],
            minimum_should_match: '80%',
          },
        },
        should: {
          simple_query_string: {
            query: queryString,
            fields: ['text.shingles'],
            minimum_should_match: '80%',
          },
        },
      },
    });
  }

  render() {
    const {
      contentLeft,
      contentRight,
    } = this.props;

    return (
      <nav id="navbar" className="navbar" role="navigation">
        <div className="nav-container">
          <SearchBox
            autofocus
            searchOnChange
            searchThrottleTime={1000}
            queryBuilder={this.queryBuilder}
            queryFields={['onderwerp', 'text', 'text.shingles']}
          />
          <div className="navbar-logo">
            <Link to="/">
              <img src="/static/logo.svg" alt="Logo Argu" />
            </Link>
          </div>
          <ul className="navbar-links">
            <li>
              <Link to="/" className="navbar-item">
                <FontAwesome name="home" />
              </Link>
            </li>
            {this.wrapInListItems(contentLeft, 'navbar-links-right')}
          </ul>
          <ul className="navbar-links navbar-links-right">
            {this.wrapInListItems(contentRight, 'navbar-links-left')}
          </ul>
        </div>
      </nav>
    );
  }
}

NavbarWrapper.propTypes = propTypes;

export default NavbarWrapper;
