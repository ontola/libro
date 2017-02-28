import { Property } from 'link-redux';
import React, { PropTypes } from 'react';

import {
  Button,
  Card,
  CardContent,
  Cover,
  Container,
} from 'components';

import './properties/motions';
import './properties/voteCompareResult';

import LinkedRenderStore from '../../helpers/LinkedRenderStore';

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
              <Property label="schema:name" />
              <Property label={['schema:text', 'schema:description', 'dbo:abstract']} />
            </CardContent>
          </Card>
          <Button onClick={handleStart}>
            Start
          </Button>
        </Container>
      </Cover>
    </div>
    <Property label="argu:motions" />
  </div>
);

VoteMatch.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  VoteMatch,
  'argu:VoteMatch'
);
