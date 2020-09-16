import { useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import schema from '@ontologies/schema';
import {
  register,
  useResourceProperty,
} from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji/index';

import app from '../../ontology/app';
import teamGL from '../../ontology/teamGL';
import { allTopologies } from '../../topologies';
import Card, { CardContent } from '../../topologies/Card';

import SearchPostalForm from './SearchPostalForm';

const useStyles = makeStyles(() => ({
  wrapperFull: {
    '& .Card': {
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
    },
    '& p': {
      marginBottom: 0,
    },
    left: '5vw',
    paddingRight: '5vw',
    position: 'absolute',
    top: '5vw',
    zIndex: 1000,
  },
  wrapperSmall: {
    '& > .Card': {
      '& p': {
        marginBottom: 0,
      },
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
      margin: 0,
    },
    left: '1em',
    maxWidth: '100%',
    position: 'absolute',
    right: '1em',
    top: '1em',
    zIndex: 1000,
  },
}));

const GlappHome = () => {
  const [name] = useResourceProperty(app.c_a, schema.givenName);
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <React.Fragment>
      <div className={matches ? classes.wrapperFull : classes.wrapperSmall}>
        <Card>
          <CardContent>
            <h2>{emoji(`Hoi ${name?.value || 'daar'}! 👋`)}</h2>
          </CardContent>
          <CardContent endSpacing>
            <div>Welkom bij onze campagne! Vul hier de postcode in waar jij aan de slag gaat.</div>
            <SearchPostalForm />
          </CardContent>
        </Card>
      </div>
    </React.Fragment>
  );
};

GlappHome.type = teamGL.GlappHome;

GlappHome.topology = allTopologies;

export default register(GlappHome);
