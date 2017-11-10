import { Property } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  Button,
  Card,
  CardContent,
  Container,
  Cover,
} from '../../components';
import LinkedRenderStore, { NS } from '../../helpers/LinkedRenderStore';

import './properties/motions';
import './properties/voteCompareResult';

const propTypes = {
  handleStart: PropTypes.func
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
