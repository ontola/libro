// @flow
import './Navbar.scss';
import React, { Component, PropTypes } from 'react';
import { Container, Cover } from 'components';
import { checkLuminance } from 'helpers/color';
import { SearchBox } from 'searchkit';

const propTypes = {
  contentLeft: PropTypes.arrayOf(PropTypes.node),
  contentRight: PropTypes.arrayOf(PropTypes.node),
  forumColor: PropTypes.string,
};

const defaultProps = {
  forumColor: 'rgb(71, 86, 104)',
  // forumColor: 'rgb(240, 248, 255)',
};

class Navbar extends Component {
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

    const classNames = [
      'NavbarWrapper',
      checkLuminance(forumColor) ? 'Navbar--white-text' : 'Navbar--dark-text',
    ].join(' ');

    return (
      <nav
        className={classNames}
        role="navigation"
        style={style}
      >
        <Cover backgroundColor={forumColor} fixed>
          <Container size="large">
            <div className="Navbar__container">
              <ul className="Navbar__links">
                {this.wrapInListItems(contentLeft, 'Navbar__links--right')}
              </ul>
              <SearchBox
                queryBuilder={this.queryBuilder}
                queryFields={['onderwerp', 'text', 'text.shingles']}
                placeholder="Zoek op onderwerp, persoon, organisatie..."
              />
              <ul className="Navbar__links Navbar__links--right">
                {this.wrapInListItems(contentRight, 'Navbar__links--left')}
              </ul>
            </div>
          </Container>
        </Cover>
      </nav>
    );
  }
}

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default Navbar;
