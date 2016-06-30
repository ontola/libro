// @flow
import './navbar.scss';
import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';
import { SearchBox } from 'searchkit';
import tinycolor from 'tinycolor2';

const propTypes = {
  contentLeft: PropTypes.arrayOf(PropTypes.node),
  contentRight: PropTypes.arrayOf(PropTypes.node),
  forumColor: PropTypes.string,
};

const defaultProps = {
  forumColor: '#475668',
};

class NavbarWrapper extends React.Component {

  // This function changes the text to a dark variant if the forum color is too light.
  calculatedClassName(forumColor: string) : string {
    const borderValue = 0.5;
    const smartColor = tinycolor(forumColor);
    if (smartColor.getLuminance() < borderValue) {
      return 'navbar--white-text';
    }
    return 'navbar--dark-text';
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

  wrapInListItems(content, keyBase) {
    return content && content.map((item, i) =>
      <li key={`${keyBase}.${i}`}>{item}</li>
    );
  }

  render() {
    const {
      contentLeft,
      contentRight,
      forumColor,
    } = this.props;

    const style = {
      backgroundColor: forumColor,
    };

    return (
      <nav
        id="navbar"
        className={`navbar piemels ${this.calculatedClassName(forumColor)}`}
        role="navigation"
        style={style}
      >
        <div className="nav-container">
          <ul className="navbar-links">
            {this.wrapInListItems(contentLeft, 'navbar-links-right')}
          </ul>
          <SearchBox
            queryBuilder={this.queryBuilder}
            queryFields={['onderwerp', 'text', 'text.shingles']}
            placeholder="Zoek op onderwerp, persoon, organisatie..."
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
NavbarWrapper.defaultProps = defaultProps;

export default NavbarWrapper;
