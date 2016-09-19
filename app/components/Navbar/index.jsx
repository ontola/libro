import './Navbar.scss';
import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';

import { Container, Cover } from 'components';
import { checkLuminance, isRGB } from 'helpers/color';
import { SearchBox } from 'searchkit';

const propTypes = {
  contentLeft: PropTypes.arrayOf(PropTypes.node),
  contentRight: PropTypes.arrayOf(PropTypes.node),
  forumColor: (props, propName, componentName) => {
    if (!isRGB(props[propName])) {
      return new Error(`Invalid prop ${propName} supplied to ${componentName}`);
    }
    return null;
  },
};

const defaultProps = {
  forumColor: 'rgb(71, 86, 104)',
  // forumColor: 'rgb(45, 134, 195)',
  // forumColor: 'rgb(0, 0, 0)',
  // forumColor: 'rgb(255, 255, 255)',
};

const wrapInListItems = (content, keyBase) => content && content.map((item, i) =>
  <li
    key={`${keyBase}.${i}`}
    className="Navbar__item-li"
    children={item}
  />
);

const Navbar = ({
  contentLeft,
  contentRight,
  forumColor,
}) => {
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
              {wrapInListItems(contentLeft, 'nbl-right')}
            </ul>
            <div
              className="Navbar__search"
              onClick={() => browserHistory.push('/search/')}
            >
              <SearchBox
                queryFields={['onderwerp', 'text', 'text.shingles']}
                placeholder="Zoek op onderwerp, persoon, organisatie..."
              />
            </div>
            <ul className="Navbar__links Navbar__links--right">
              {wrapInListItems(contentRight, 'nbl-left')}
            </ul>
          </div>
        </Container>
      </Cover>
    </nav>
  );
};

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default Navbar;
