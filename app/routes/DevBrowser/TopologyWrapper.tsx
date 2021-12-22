import { makeStyles } from '@material-ui/styles';
import rdf, { NamedNode } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import React from 'react';
import { Resource } from 'link-redux';

import CardContent from '../../components/Card/CardContent';
import Heading, { HeadingSize } from '../../components/Heading';
import { LibroTheme, Margin } from '../../themes/themes';
import Card, { cardTopology } from '../../topologies/Card';
import CardFixed, { cardFixedTopology } from '../../topologies/Card/CardFixed';
import CardMain, { cardMainTopology } from '../../topologies/Card/CardMain';
import CardRow, { cardRowTopology } from '../../topologies/Card/CardRow';
import Container, { containerTopology } from '../../topologies/Container';
import DetailsBar, { detailsBarTopology } from '../../topologies/DetailsBar';
import Grid, { gridTopology } from '../../topologies/Grid';
import { inlineTopology } from '../../topologies/Inline';
import { navbarTopology } from '../../topologies/Navbar';
import { parentTopology } from '../../topologies/Parent';

export interface TopologyWrapperProps {
  pure: boolean;
  subject?: SomeNode;
  topology: NamedNode;
}

const useStyles = makeStyles<LibroTheme>((theme) => ({
  navBarContentWithStyle: {
    [theme.breakpoints.up('lg')]: {
      padding: `0 ${theme.spacing(Margin.Small)}`,
    },

    WebkitOverflowScrolling: 'touch',
    WebkitTapHighlightColor: theme.palette.transparent.main,
    alignItems: 'center',
    backgroundColor: 'rgb(71, 86, 104)',
    boxSizing: 'border-box',
    display: 'flex',
    flexFlow: 'row nowrap',
    height: '100%',
    justifyContent: 'space-between',
    margin: 'auto',
    maxWidth: theme.containerWidth.large,
    position: 'relative',
    transition: '.3s background-color',
    width: '17rem',
  },
}));

/* Wraps a LRC in a suitable container */
const TopologyWrapper = ({
  pure,
  topology,
  subject,
}: TopologyWrapperProps): JSX.Element | null => {
  if (!subject) {
    return null;
  }

  const classes = useStyles();

  const LRC = () => (
    <Resource
      subject={subject}
      topology={topology}
    />
  );

  if ((typeof topology === 'undefined') || pure) {
    return <LRC />;
  } else if (rdf.equals(topology, containerTopology)) {
    return (
      <Container>
        <Heading>
          Some Container
        </Heading>
        <LRC />
      </Container>
    );
  } else if (rdf.equals(topology, detailsBarTopology)) {
    return (
      <Container>
        <Card>
          <CardContent>
            <Heading size={HeadingSize.XL}>
              Detail
            </Heading>
            <DetailsBar>
              <LRC />
            </DetailsBar>
          </CardContent>
        </Card>
      </Container>
    );
  } else if (rdf.equals(topology, cardTopology)) {
    return (
      <Container>
        <Card>
          <CardContent>
            <Heading>
              Card
            </Heading>
          </CardContent>
          <LRC />
        </Card>
      </Container>
    );
  } else if (rdf.equals(topology, cardMainTopology)) {
    return (
      <Container>
        <CardMain>
          <CardContent>
            <Heading size={HeadingSize.XL}>
              CardMain
            </Heading>
          </CardContent>
          <LRC />
        </CardMain>
      </Container>
    );
  } else if (rdf.equals(topology, cardFixedTopology)) {
    return (
      <Container>
        <CardFixed>
          <CardContent>
            <Heading size={HeadingSize.MD}>
              CardFixed
            </Heading>
          </CardContent>
          <LRC />
        </CardFixed>
      </Container>
    );
  } else if (rdf.equals(topology, cardRowTopology)) {
    return (
      <Container>
        <CardMain>
          <CardContent>
            <Heading size={HeadingSize.XL}>
              Card with Row
            </Heading>
          </CardContent>
          <CardRow>
            <CardContent>
              <Heading size={HeadingSize.MD}>
                CardRow
              </Heading>
            </CardContent>
            <LRC />
          </CardRow>
        </CardMain>
      </Container>
    );
  } else if (rdf.equals(topology, gridTopology)) {
    return (
      <Container>
        <Grid>
          <LRC />
        </Grid>
      </Container>
    );
  } else if (rdf.equals(topology, inlineTopology)) {
    return (
      <Container>
        <Card>
          <CardContent>
            <p>
              {'This is the item: '}
              <LRC />
              , and here is some text behind it.
            </p>
          </CardContent>
        </Card>
      </Container>
    );
  } else if (rdf.equals(topology, parentTopology)) {
    return (
      <Container>
        <Card>
          <LRC />
        </Card>
      </Container>
    );
  } else if (rdf.equals(topology, navbarTopology)) {
    return (
      <div className={classes.navBarContentWithStyle}>
        <LRC />
      </div>
    );
  }

  return <LRC />;
};

export default TopologyWrapper;
