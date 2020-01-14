import { Property, Resource } from 'link-redux';
import React from 'react';
import MediaQuery from 'react-responsive';

import { values } from '../../helpers/ssr';
import { frontendIRI } from '../../middleware/app';
import app from '../../ontology/app';
import ontola from '../../ontology/ontola';
import { mediaQueries } from '../shared/config';

import './NavBarContent.scss';

const NavBarContent = () => (
  <React.Fragment>
    <Resource
      forceRender
      subject={frontendIRI}
    >
      <MediaQuery query={mediaQueries.smallAndAbove} values={values}>
        {(matches) => (
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
    </Resource>
    <div style={{ flexGrow: 1 }} />
    <div className="NavBarContent__menus">
      <Resource
        showImage
        subject={app.c_a}
      />
      <Resource subject={app.search} onError={() => null} />
      <Resource subject={app.menu} />
    </div>
  </React.Fragment>
);

export default NavBarContent;
