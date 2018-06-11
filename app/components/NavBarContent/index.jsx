import { LinkedResourceContainer } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import SideBarLink from '../../components/SideBarLink';
import { checkLuminance } from '../../helpers/color';
import path from '../../helpers/paths';
import { currentURL } from '../../helpers/iris';
import { NS } from '../../helpers/LinkedRenderStore';

import './NavBarContent.scss';
import ContainsContainer from './contains';

const propTypes = {
  orgColor: PropTypes.string,
};

const defaultProps = {
  orgColor: 'rgb(71, 86, 104)',
};

const NavBarContent = ({ orgColor }) => {
  const style = {
    backgroundColor: orgColor,
    color: 'white',
  };

  const classNames = [
    'NavBarContent',
    checkLuminance(orgColor) ? 'NavBarContent--white-text' : 'NavBarContent--dark-text',
  ].join(' ');

  return (
    <div
      className={classNames}
      style={style}
    >
      <div className="NavBarContent__top">
        <LinkedResourceContainer
          forceRender
          subject={NS.app(`o/find?iri=${encodeURIComponent(currentURL())}`)}
          topology={NS.argu('sidebar')}
        >
          <ContainsContainer />
        </LinkedResourceContainer>
      </div>
      <div className="NavBarContent__footer">
        <LinkedResourceContainer subject={NS.app('c_a')} topology={NS.argu('sidebar')} />
        <LinkedResourceContainer subject={NS.app('n')} topology={NS.argu('sidebar')} />
        <LinkedResourceContainer subject={NS.app('menus/info')} topology={NS.argu('sidebar')} />
        {__DEVELOPMENT__ && <SideBarLink
          icon="gears"
          label="DevBrowser"
          to={`/d/browser?iri=${encodeURI(currentURL())}`}
        />}
        <div className="NavBarContent__center-footer">
          <button
            style={{
              bottom: '0em',
              color: 'white',
              cursor: 'pointer',
              left: '0em',
              padding: '1em',
              position: 'absolute',
            }}
            title="Back to classic Argu"
            onClick={() => { document.cookie = 'beta=false;path=/'; window.location.reload(); }}
          >
            <span className="fa fa-close" />
          </button>
          <Link className="NavBarContent__logo" to={path.index()}>
            {/* eslint-disable max-len */}
            <svg height="28" viewBox="0 0 211 108" width="37" xmlns="http://www.w3.org/2000/svg">
              <rect height="8.3" width="51.2" x="159.8" y="86.4" />
              <rect height="8.4" width="86.9" y="86.2" />
              <rect height="8.4" width="211" y="14.3" />
              <path d="M20.3 81c-2.5 0-4.8-0.4-6.9-1.2 -2.1-0.8-4-1.9-5.5-3.4 -1.5-1.4-2.7-3.1-3.6-5.1 -0.9-2-1.3-4.1-1.3-6.4 0-2.4 0.5-4.6 1.6-6.6s2.5-3.7 4.5-5.1c1.9-1.4 4.2-2.5 6.9-3.3 2.6-0.8 5.6-1.2 8.8-1.2 2.4 0 4.8 0.2 7.2 0.6 2.4 0.4 4.5 1 6.4 1.7v-3.5c0-3.8-1.1-6.7-3.2-8.9 -2.2-2.1-5.3-3.2-9.3-3.2 -2.7 0-5.4 0.5-8.1 1.5 -2.6 1-5.4 2.5-8.2 4.4l-3.3-6.9c6.6-4.4 13.5-6.7 20.6-6.7 7.1 0 12.5 1.8 16.5 5.4 3.9 3.6 5.9 8.8 5.9 15.5v18.5c0 1.2 0.2 2.1 0.7 2.6 0.5 0.5 1.2 0.8 2.4 0.9v9.2c-1 0.2-2 0.3-2.9 0.4 -0.9 0.1-1.7 0.1-2.4 0.1 -2.1-0.1-3.7-0.7-4.8-1.7s-1.7-2.3-2-3.9l-0.3-3.2c-2.3 3-5.1 5.3-8.5 6.9C27.7 80.2 24.1 81 20.3 81zM23.2 73.1c2.6 0 5.1-0.5 7.4-1.4 2.3-0.9 4.1-2.3 5.4-4 1.4-1.2 2.1-2.4 2.1-3.7v-6.8c-1.8-0.7-3.8-1.3-5.8-1.7 -2.1-0.4-4.1-0.6-6-0.6 -3.9 0-7 0.8-9.5 2.5 -2.4 1.7-3.7 3.9-3.7 6.6 0 2.5 0.9 4.7 2.8 6.4C17.9 72.2 20.3 73.1 23.2 73.1z" />
              <path d="M90.8 38.1c-4.2 0.1-7.9 1.1-11.1 2.9 -3.2 1.8-5.5 4.4-7 7.7v31.4H62V28.8h10v11.5c1.8-3.5 4.2-6.4 7-8.6 2.8-2.2 5.9-3.3 9.1-3.3 0.7 0 1.2 0 1.6 0 0.4 0 0.8 0 1.1 0.1V38.1z" />
              <path d="M119.1 80.5c-3.5 0-6.6-0.7-9.5-2.1 -2.8-1.4-5.3-3.3-7.4-5.7 -2.1-2.4-3.7-5.2-4.8-8.3 -1.1-3.1-1.7-6.4-1.7-9.9 0-3.7 0.6-7.1 1.7-10.3 1.1-3.2 2.8-6 4.9-8.4 2.1-2.4 4.6-4.3 7.5-5.7 2.9-1.4 6.1-2.1 9.7-2.1 4.2 0 7.8 1 10.9 2.9 3.1 2 5.6 4.5 7.6 7.6v-9.7h9.5v49.8c0 3.7-0.7 7-2.1 9.9 -1.4 2.9-3.3 5.3-5.7 7.3 -2.4 2-5.3 3.5-8.7 4.6 -3.3 1-6.9 1.6-10.8 1.6 -5.7 0-10.4-1-14.1-2.9 -3.7-1.9-6.9-4.6-9.5-8.1l6.1-5.7c2 2.7 4.5 4.8 7.6 6.3 3.1 1.4 6.4 2.2 9.9 2.2 2.2 0 4.3-0.3 6.3-0.9 2-0.6 3.7-1.5 5.2-2.7 1.5-1.2 2.7-2.8 3.6-4.7 0.9-1.9 1.3-4.1 1.3-6.8v-7.8c-1.8 3.1-4.3 5.6-7.5 7.3C125.9 79.7 122.6 80.5 119.1 80.5zM122.6 71.8c1.6 0 3.2-0.3 4.7-0.8 1.5-0.6 2.9-1.3 4.2-2.3 1.3-0.9 2.4-2 3.3-3.2 0.9-1.2 1.6-2.5 2-3.9V48.2c-1.3-3.3-3.3-5.9-6.1-8 -2.7-2.1-5.7-3.1-8.8-3.1 -2.4 0-4.5 0.5-6.3 1.5 -1.9 1-3.4 2.4-4.8 4 -1.3 1.7-2.3 3.5-3 5.6 -0.7 2.1-1.1 4.2-1.1 6.5 0 2.4 0.4 4.6 1.2 6.6 0.8 2.1 1.9 3.9 3.4 5.4 1.4 1.5 3.1 2.8 5 3.7C118.2 71.4 120.3 71.8 122.6 71.8z" />
              <path d="M175.9 81c-5.3 0-9.3-1.7-12.1-5.2 -2.7-3.5-4.1-8.7-4.1-15.6v-31.4h10.8V58c0 9.2 3.2 13.8 9.7 13.8 3.1 0 6.1-0.9 8.8-2.8 2.7-1.9 4.9-4.6 6.4-8.2V28.8h10.8v38.5c0 1.2 0.2 2.1 0.7 2.6 0.5 0.5 1.3 0.8 2.5 0.9v9.2c-1.2 0.2-2.2 0.3-3 0.4 -0.8 0.1-1.6 0.1-2.3 0.1 -4.1-0.3-6.3-2.2-6.9-5.6l-0.2-5.3c-2.3 3.7-5.3 6.6-8.9 8.5C184.4 80.1 180.3 81 175.9 81z" />
            </svg>
            {/* eslint-enable max-len */}
          </Link>
        </div>
      </div>
    </div>
  );
};

NavBarContent.propTypes = propTypes;
NavBarContent.defaultProps = defaultProps;

export default NavBarContent;
