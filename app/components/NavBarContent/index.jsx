import { LinkedResourceContainer } from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { frontendIRI } from '../../middleware/app';

import ContainsContainer from './contains';
import './NavBarContent.scss';

const NavBarContent = () => (
  <div className="NavBarContent">
    <LinkedResourceContainer
      forceRender
      subject={frontendIRI}
    >
      <ContainsContainer />
    </LinkedResourceContainer>
    <div className="NavBarContent__menus">
      <LinkedResourceContainer
        showImage
        subject={NS.app('c_a')}
      />
      <LinkedResourceContainer subject={NS.app('search')} onError={() => null} />
      <LinkedResourceContainer subject={NS.app('menu')} />
    </div>
  </div>
);

export default NavBarContent;
