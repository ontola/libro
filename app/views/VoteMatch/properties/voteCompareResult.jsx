import LinkedRenderStore from 'link-lib';
import { LinkedObjectContainer, linkedPropType } from 'link-redux';
import React from 'react';

import {
  Card,
  Container,
  Cover,
  LDLink,
} from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropType.isRequired,
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
  NS.argu('VoteCompare'),
  NS.argu('voteCompareResult')
);
