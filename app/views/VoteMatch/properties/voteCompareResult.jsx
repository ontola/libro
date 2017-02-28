import LinkedRenderStore from 'link-lib';
import { LinkedObjectContainer, linkedPropVal } from 'link-redux';
import React from 'react';

import {
  Card,
  Container,
  Cover,
  LDLink,
} from 'components';

const propTypes = {
  linkedProp: linkedPropVal,
};

const VoteCompareResult = ({ linkedProp }) => (
  <LinkedObjectContainer object={linkedProp}>
    <Cover fullScreen>
      <Container>
        <Card>
          <LDLink>Bereken resultaat</LDLink>
        </Card>
      </Container>
    </Cover>
  </LinkedObjectContainer>
);

VoteCompareResult.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  VoteCompareResult,
  'argu:VoteCompare',
  'argu:voteCompareResult'
);
