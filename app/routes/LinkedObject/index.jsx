import { LinkedObjectContainer, Property, Type } from 'link-redux';
import React, { PropTypes } from 'react';

import {
  Container,
} from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';

const propTypes = {
  linkedObject: PropTypes.object,
  params: PropTypes.object.isRequired,
};

const LinkedObject = () => (
  <LinkedObjectContainer object={location.href} >
    <Container>
      <Property label={NS.schema('isPartOf')} />
      <Type />
      <Property label={NS.argu('attachments')} />
      <Property label={NS.argu('VoteEventCollection')} />
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
  </LinkedObjectContainer>
);

LinkedObject.propTypes = propTypes;

export default LinkedObject;

export { default as LinkedObjectByID } from './LinkedObjectByID';
export { default as LinkPage } from './LinkPage';
