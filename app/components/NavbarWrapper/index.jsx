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
          <ul className="navbar-links">
            {this.wrapInListItems(contentLeft, 'navbar-links-right')}
          </ul>
          <SearchBox
            queryBuilder={this.queryBuilder}
            queryFields={['onderwerp', 'text', 'text.shingles']}
          />
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
