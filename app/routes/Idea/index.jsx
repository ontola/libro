import React, { PropTypes } from 'react';
import { LinkedObjectContainer, Property, Type } from 'link-redux';

import {
  Container,
  Columns,
  Heading,
} from 'components';

const propTypes = {
  linkedObject: PropTypes.object,
  params: PropTypes.object.isRequired,
};

const LinkedObject = () => (
  <LinkedObjectContainer object={location.href} >
    <Container>
      <Property label="schema:isPartOf" />
      <Type />
      <Property forceRender label="argu:voteEvents" />
    </Container>
    <Container size="large">
      <Columns column-size="medium" total-size="large">
        <div>
          <Heading variant="column" size="3">Voordelen</Heading>
          <Property forceRender label="argu:topArgumentsPro" />
        </div>
        <div>
          <Heading variant="column" size="3">Nadelen</Heading>
          <Property forceRender label="argu:topArgumentsCon" />
        </div>
      </Columns>
    </Container>
  </LinkedObjectContainer>
);

LinkedObject.propTypes = propTypes;

export default LinkedObject;
