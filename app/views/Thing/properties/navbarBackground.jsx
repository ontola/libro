import schema from '@ontologies/schema';
import LinkedRenderStore from 'link-lib';
import { linkedPropType } from 'link-redux';
import React from 'react';

import argu from '../../../ontology/argu';
import { allTopologies } from '../../../topologies';

const propTypes = {
  linkedProp: linkedPropType,
};

const NavbarBackground = ({ linkedProp }) => (
  <style dangerouslySetInnerHTML={{
    __html: `
      .navbar-background {
        background: ${linkedProp};
      }`,
  }}
  />
);

NavbarBackground.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  NavbarBackground,
  schema.Thing,
  argu.ns('navbarBackground'),
  allTopologies
);
