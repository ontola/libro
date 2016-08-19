// @flow
import './Navbar.scss';
import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

import { Container, Cover } from 'components';
import { checkLuminance } from 'helpers/color';
import { SearchBox } from 'searchkit';

const propTypes = {
  contentLeft: PropTypes.arrayOf(PropTypes.node).isRequired,
  contentRight: PropTypes.arrayOf(PropTypes.node).isRequired,
  forumColor: (props, propName, componentName) => {
    if (!/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/.test(props[propName])) {
      return new Error(`Invalid prop ${propName} supplied to ${componentName}`);
    }
    return null;
  },
};

const defaultProps = {
  forumColor: 'rgb(71, 86, 104)',
  // forumColor: 'rgb(0, 0, 0)',
};

class Navbar extends Component {
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
              <div
                className="Navbar__search"
                onClick={() => browserHistory.push('/search/')}
              >
                <SearchBox
                  mod="SearchBox"
                  queryFields={['onderwerp', 'text', 'text.shingles']}
                  placeholder="Zoek op onderwerp, persoon, organisatie..."
                />
              </div>
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
