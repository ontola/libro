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
  <Container>
    <LinkedObjectContainer object={location.href} >
      <Property label="schema:isPartOf" />
      <Type />
      <Columns>
        <div>
          <Heading variant="column" size="3">Voordelen</Heading>
          <Property label="argu:topArgumentsPro" />
        </div>
        <div>
          <Heading variant="column" size="3">Nadelen</Heading>
          <Property label="argu:topArgumentsCon" />
        </div>
      </Columns>
    </LinkedObjectContainer>
  </Container>
);

LinkedObject.propTypes = propTypes;

export default LinkedObject;
