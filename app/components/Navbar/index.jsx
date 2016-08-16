// @flow
import './Navbar.scss';
import React, { Component, PropTypes } from 'react';
import { Container, Cover } from 'components';
import { SearchBox } from 'searchkit';
import tinycolor from 'tinycolor2';

const propTypes = {
  contentLeft: PropTypes.arrayOf(PropTypes.node),
  contentRight: PropTypes.arrayOf(PropTypes.node),
  forumColor: PropTypes.string,
};

const defaultProps = {
  forumColor: '#475668',
  // forumColor: '#a81d1d',
  // forumColor: '#fff',
};

class Navbar extends Component {

  // This function changes the text to a dark variant if the forum color is too light.
  calculatedClassName(forumColor, base) {
    const borderValue = 0.5;
    const smartColor = tinycolor(forumColor);
    if (smartColor.getLuminance() < borderValue) {
      return `${base}--white-text`;
    }
    return `${base}--dark-text`;
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

    const classNames = [
      'NavbarWrapper',
      this.calculatedClassName(forumColor, 'NavbarWrapper'),
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
