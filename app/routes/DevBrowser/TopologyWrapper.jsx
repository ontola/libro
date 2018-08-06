import React from 'react';
import PropTypes from 'prop-types';
import { LinkedResourceContainer, subjectType, topologyType } from 'link-redux';

import {
  Card,
  CardContent,
  CardFixed,
  CardMain,
  CardRow,
  Container,
  DetailsBar,
  Grid,
  Heading,
} from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';

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
  } else if (topology === NS.argu('container')) {
    return (
      <Container>
        <Heading>
          Some Container
        </Heading>
        <LRC />
      </Container>
    );
  } else if (topology === NS.argu('detail')) {
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
  } else if (topology === NS.argu('card')) {
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
  } else if (topology === NS.argu('cardMain')) {
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
  } else if (topology === NS.argu('cardFixed')) {
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
  } else if (topology === NS.argu('cardRow')) {
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
  } else if (topology === NS.argu('grid')) {
    return (
      <Container>
        <Grid>
          <LRC />
        </Grid>
      </Container>
    );
  } else if (topology === NS.argu('inline')) {
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
  } else if (topology === NS.argu('parent')) {
    return (
      <Container>
        <Card>
          <LRC />
        </Card>
      </Container>
    );
  } else if (topology === NS.argu('sidebar')) {
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
