import LinkedRenderStore from 'link-lib';
import { Property } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  Button,
  CardContent,
  Cover,
} from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import Card from '../../topologies/Card';
import Container from '../../topologies/Container';

import './properties/motions';
import './properties/voteCompareResult';

const propTypes = {
  handleStart: PropTypes.func,
};

const VoteMatch = ({ handleStart }) => (
  <div className="VoteMatchShow">
    <div className="VoteMatchShow__intro">
      <Cover fullScreen>
        <Container>
          <Card>
            <CardContent>
              <Property label={NS.schema('name')} />
              <Property label={[NS.schema('text'), NS.schema('description'), NS.dbo('abstract')]} />
            </CardContent>
          </Card>
          <Button onClick={handleStart}>
            Start
          </Button>
        </Container>
      </Cover>
    </div>
    <Property label={NS.argu('motions')} />
    <Property label={NS.argu('voteCompareResult')} />
  </div>
);

VoteMatch.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  VoteMatch,
  NS.argu('VoteMatch')
);
