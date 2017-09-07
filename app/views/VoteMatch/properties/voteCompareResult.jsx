import { LinkedObjectContainer } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  Card,
  Container,
  Cover,
  LDLink,
} from '../../../components';
import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: PropTypes.any.isRequired,
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
