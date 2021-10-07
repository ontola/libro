import { useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useResourceProperty,
} from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji/index';

import CardError from '../../../../components/Error/CardError';
import useMapAccessToken from '../../../../hooks/useMapAccessToken';
import CardContent from '../../../../components/Card/CardContent';
import GlappMap from '../../components/GlappMap';
import app from '../../../../ontology/app';
import teamGL from '../../../../ontology/teamGL';
import { allTopologies } from '../../../../topologies';
import Card from '../../../../topologies/Card';

import SearchPostalForm from './SearchPostalForm';

const useStyles = makeStyles(() => ({
  wrapperFull: {
    '& .Card': {
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
    },
    '& p': {
      marginBottom: 0,
    },
    'left': '5vw',
    'paddingRight': '5vw',
    'position': 'absolute',
    'top': '5vw',
    'zIndex': 900,
  },
  wrapperSmall: {
    '& > .Card': {
      '& p': {
        marginBottom: 0,
      },
      'boxShadow': '0 2px 5px rgba(0, 0, 0, 0.5)',
      'margin': 0,
    },
    'left': '1em',
    'maxWidth': '100%',
    'position': 'absolute',
    'right': '1em',
    'top': '1em',
    'zIndex': 900,
  },
}));

const GlappHome: FC = () => {
  const [name] = useResourceProperty(app.c_a, schema.givenName);
  const classes = useStyles();
  const theme: any = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const [selectedPostalCode, setSelectedPostalCodeRaw] = React.useState<number | undefined>(undefined);
  const setSelectedPostalCode = React.useCallback((postalCode?: number) => {
    setSelectedPostalCodeRaw(postalCode);
  }, [setSelectedPostalCodeRaw]);
  const [mapToken, requestMapToken] = useMapAccessToken();

  if (mapToken.loading) {
    return null;
  }

  if (mapToken.error) {
    return (
      <CardError
        caughtError={mapToken.error}
        reloadLinkedObject={requestMapToken}
      />
    );
  }

  return (
    <React.Fragment>
      <GlappMap
        selectedPostalCode={selectedPostalCode}
        setSelectedPostalCode={setSelectedPostalCode}
      />
      <div className={matches ? classes.wrapperFull : classes.wrapperSmall}>
        <Card>
          <CardContent>
            <h2>
              {emoji(`Hoi ${name?.value || 'daar'}! 👋`)}
            </h2>
          </CardContent>
          <CardContent endSpacing>
            <div>
              Welkom bij onze campagne! Vul hier de postcode in waar jij aan de slag gaat.
            </div>
            <SearchPostalForm
              setSelectedPostalCode={setSelectedPostalCode}
            />
          </CardContent>
        </Card>
      </div>
    </React.Fragment>
  );
};

GlappHome.type = teamGL.GlappHome;

GlappHome.topology = allTopologies;

export default register(GlappHome);
