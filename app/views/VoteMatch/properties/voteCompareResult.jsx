import LinkedRenderStore from 'link-lib';
import { LinkedResourceContainer, linkedPropType } from 'link-redux';
import React from 'react';

import {
  Card,
  Cover,
  LDLink,
} from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';
import Container from '../../../topologies/Container';

const propTypes = {
  linkedProp: linkedPropType.isRequired,
};

const VoteCompareResult = ({ linkedProp }) => (
  <LinkedResourceContainer subject={linkedProp}>
    <Cover fullScreen>
      <Container>
        <Card>
          <LDLink>Bereken resultaat</LDLink>
        </Card>
      </Container>
    </Cover>
  </LinkedResourceContainer>
);

VoteCompareResult.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  VoteCompareResult,
  NS.argu('VoteCompare'),
  NS.argu('voteCompareResult')
);
