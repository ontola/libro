import React from 'react';
import PropTypes from 'prop-types';
import { LinkedResourceContainer, subjectType, topologyType } from 'link-redux';

import {
  CardContent,
  Heading,
} from '../../components';
import Card, { cardTopology } from '../../topologies/Card';
import CardFixed, { cardFixedTopology } from '../../topologies/Card/CardFixed';
import CardMain, { cardMainTopology } from '../../topologies/Card/CardMain';
import CardRow, { cardRowTopology } from '../../topologies/Card/CardRow';
import Container, { containerTopology } from '../../topologies/Container';
import DetailsBar, { detailsBarTopology } from '../../topologies/DetailsBar';
import Grid, { gridTopology } from '../../topologies/Grid';
import { inlineTopology } from '../../topologies/Inline';
import { parentTopology } from '../../topologies/Parent';
import { sidebarTopology } from '../../topologies/Sidebar';

const propTypes = {
  pure: PropTypes.boolean,
  subject: subjectType,
  topology: topologyType,
};

/* Wraps a LRC in a suitable container */
const TopologyWrapper = ({ pure, topology, subject }) => {
  if (subject === 'null') return null;

  const LRC = () => (
    <LinkedResourceContainer
      subject={subject}
      topology={topology}
    />
  );

  if ((typeof topology === 'undefined') || pure) {
    return <LRC />;
  } else if (topology === containerTopology) {
    return (
      <Container>
        <Heading>
          Some Container
        </Heading>
        <LRC />
      </Container>
    );
  } else if (topology === detailsBarTopology) {
    return (
      <Container>
        <Card>
          <CardContent>
            <Heading size={1}>Detail</Heading>
            <DetailsBar>
              <LRC />
            </DetailsBar>
          </CardContent>
        </Card>
      </Container>
    );
  } else if (topology === cardTopology) {
    return (
      <Container>
        <Card>
          <CardContent>
            <Heading>Card</Heading>
          </CardContent>
          <LRC />
        </Card>
      </Container>
    );
  } else if (topology === cardMainTopology) {
    return (
      <Container>
        <CardMain>
          <CardContent>
            <Heading size={1}>CardMain</Heading>
          </CardContent>
          <LRC />
        </CardMain>
      </Container>
    );
  } else if (topology === cardFixedTopology) {
    return (
      <Container>
        <CardFixed>
          <CardContent>
            <Heading size={3}>CardFixed</Heading>
          </CardContent>
          <LRC />
        </CardFixed>
      </Container>
    );
  } else if (topology === cardRowTopology) {
    return (
      <Container>
        <CardMain>
          <CardContent>
            <Heading size={1}>Card with Row</Heading>
          </CardContent>
          <CardRow>
            <CardContent>
              <Heading size={3}>CardRow</Heading>
            </CardContent>
            <LRC />
          </CardRow>
        </CardMain>
      </Container>
    );
  } else if (topology === gridTopology) {
    return (
      <Container>
        <Grid>
          <LRC />
        </Grid>
      </Container>
    );
  } else if (topology === inlineTopology) {
    return (
      <Container>
        <Card>
          <CardContent>
            <div className="Markdown">
              <p>
                This is the item: <LRC />, and here is some text behind it.
              </p>
            </div>
          </CardContent>
        </Card>
      </Container>
    );
  } else if (topology === parentTopology) {
    return (
      <Container>
        <Card>
          <LRC />
        </Card>
      </Container>
    );
  } else if (topology === sidebarTopology) {
    return (
      <div
        className="NavBarContent NavBarContent--white-text"
        style={{
          backgroundColor: 'rgb(71, 86, 104)',
          margin: 'auto',
          width: '17rem',
        }}
      >
        <LRC />
      </div>
    );
  }
  return <LRC />;
};

TopologyWrapper.propTypes = propTypes;

export default TopologyWrapper;
