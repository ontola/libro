import { LinkedResourceContainer, Property } from 'link-redux';
import React from 'react';
import MediaQuery from 'react-responsive';

import { NS } from '../../helpers/LinkedRenderStore';
import { values } from '../../helpers/ssr';
import { frontendIRI } from '../../middleware/app';
import ontola from '../../ontology/ontola';
import { mediaQueries } from '../shared/config';

import './NavBarContent.scss';

const NavBarContent = () => (
  <div className="NavBarContent">
    <LinkedResourceContainer
      forceRender
      subject={frontendIRI}
    >
      <MediaQuery query={mediaQueries.smallAndAbove} values={values}>
        {matches => (
          <Property label={ontola.navigationsMenu}>
            <div className="NavBarContent__items">
              <Property
                childProps={{
                  imageOnly: !matches,
                  showImage: true,
                }}
                label={ontola.menuItems}
              />
            </div>
          </Property>
        )}
      </MediaQuery>
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
