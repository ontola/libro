import {
  LinkedResourceContainer,
  Property,
  linkType, lrsType,
  register,
} from 'link-redux';
import * as PropTypes from 'prop-types';
import React from 'react';
import { ReactHeight } from 'react-height';
import { Spring, animated } from 'react-spring';
import { connect } from 'react-redux';

import AppMenuGroup from '../../components/AppMenuGroup';
import { NS } from '../../helpers/LinkedRenderStore';
import { frontendIRI, menuStates } from '../../middleware/app';
import { getCurrentUserType } from '../../state/app/selectors';
import { allTopologiesExcept } from '../../topologies';
import AppMenu from '../../topologies/AppMenu';
import { navbarTopology } from '../../topologies/Navbar';

import './Menu.scss';

const mapDataToProps = state => ({
  showUserMenu: ['ConfirmedUser', 'UnconfirmedUser'].includes(getCurrentUserType(state)),
});

const Menu = ({
  fullScreen,
  lrs,
  openState,
  showUserMenu,
  updateOpenState,
}) => {
  const isOpen = openState && openState === menuStates.open;

  const [height, setHeight] = React.useState(undefined);
  React.useEffect(() => {
    updateOpenState(isOpen);
  }, [isOpen]);

  if (openState === menuStates.closed) {
    return null;
  }

  const closing = openState === menuStates.closing;
  let hiddenTop = '-100vh';
  if (!fullScreen) {
    hiddenTop = height > 0 ? `-${height}px` : '-100%';
  }

  return (
    <Spring
      native
      from={{ top: closing ? 'calc(0 - 0em)' : `calc(${hiddenTop} - 3.5em)` }}
      immediate={false}
      to={{ top: closing ? `calc(${hiddenTop} - 3.5em)` : 'calc(0 - 0em)' }}
      onRest={() => closing && lrs.exec(NS.app('actions/menu/closed'))}
    >
      {props => (
        <animated.div
          className={`Menu ${fullScreen ? 'Menu--full-screen' : 'Menu--floating'}`}
          style={props}
        >
          <div className={`Menu--positioner ${fullScreen ? 'Menu--positioner--full-screen' : 'Menu--positioner--floating'}`}>
            <ReactHeight onHeightReady={setHeight}>
              <AppMenu fullScreen={fullScreen}>
                <AppMenuGroup>
                  <LinkedResourceContainer subject={frontendIRI}>
                    <Property darken label={NS.ontola('navigationsMenu')} />
                  </LinkedResourceContainer>
                </AppMenuGroup>
                {showUserMenu && (
                  <AppMenuGroup>
                    <LinkedResourceContainer darken subject={NS.app('apex/menus/user')} />
                  </AppMenuGroup>
                )}
                <AppMenuGroup footer>
                  <LinkedResourceContainer subject={NS.app('apex/menus/info')} />
                </AppMenuGroup>
              </AppMenu>
            </ReactHeight>
          </div>
        </animated.div>
      )}
    </Spring>
  );
};

Menu.type = NS.app('Menu');

Menu.topology = allTopologiesExcept(navbarTopology);

Menu.mapDataToProps = [NS.app('openState')];

Menu.hocs = [connect(mapDataToProps)];

Menu.propTypes = {
  fullScreen: PropTypes.bool,
  lrs: lrsType,
  openState: linkType,
  showUserMenu: PropTypes.bool,
  updateOpenState: PropTypes.func,
};

export default register(Menu);
