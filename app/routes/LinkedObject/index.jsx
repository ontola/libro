import { LinkedResourceContainer, Property, Type } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  Container,
} from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { currentLocation } from '../../helpers/paths';

const propTypes = {
  location: PropTypes.shape({
    href: PropTypes.string,
  }),
};

const LinkedObject = ({ location }) => (
  <LinkedResourceContainer subject={currentLocation(location)}>
    <Container>
      <Property label={NS.schema('isPartOf')} />
      <Type />
      <Property label={NS.argu('attachments')} />
      <Property label={NS.argu('voteEvents')} />
    </Container>
    <Container size="large">
      <Property
        forceRender
        label={[
          NS.argu('motions'),
          NS.argu('questions'),
          NS.argu('arguments'),
          NS.argu('collectionAssociation'),
          NS.schema('comments')
        ]}
      />
    </Container>
  </LinkedResourceContainer>
);

LinkedObject.propTypes = propTypes;

export default LinkedObject;

export { default as LinkedObjectByID } from './LinkedObjectByID';
export { default as LinkPage } from './LinkPage';
