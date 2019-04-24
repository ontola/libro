import { defaultNS } from 'link-lib';
import {
  link,
  LinkedResourceContainer,
  linkType,
  Property,
  subjectType,
  Type,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { frontendIRI } from '../../middleware/app';
import LDLink from '../LDLink/index';

const propTypes = {
  contains: linkType,
  lastOrganization: linkType,
  onOrganizationChange: PropTypes.func,
  primaryContainerNode: subjectType,
  reloadLinkedObject: PropTypes.func,
};

const Contains = ({
  contains,
  lastOrganization,
  onOrganizationChange,
  primaryContainerNode,
  reloadLinkedObject,
}) => {
  if (contains && contains !== lastOrganization) {
    onOrganizationChange(contains);
  }

  return (
    <LinkedResourceContainer
      forceRender
      subject={frontendIRI}
    >
      <LDLink to={primaryContainerNode}>
        <Property label={NS.schema('name')} />
      </LDLink>
      <Type reloadLinkedObject={reloadLinkedObject} />
    </LinkedResourceContainer>
  );
};

Contains.propTypes = propTypes;

export default link(
  [defaultNS.argu('contains'), defaultNS.foaf('homepage')],
  {
    forceRender: true,
    helpers: {},
  }
)(Contains);
