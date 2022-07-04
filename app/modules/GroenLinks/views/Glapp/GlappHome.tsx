import { useMediaQuery } from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useFields,
} from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji';

import { BreakPoints } from '../../../Common/theme/types';
import { allTopologies } from '../../../../topologies';
import CardContent from '../../../Common/components/Card/CardContent';
import CardError from '../../../Common/components/Error/CardError';
import Card from '../../../Common/topologies/Card';
import { cardClassIdentifier } from '../../../Common/topologies/Card/sharedCardStyles';
import app from '../../../Core/ontology/app';
import useMapAccessToken from '../../../Map/hooks/useMapAccessToken';
import GlappMap from '../../components/GlappMap';
import teamGL from '../../ontology/teamGL';

import SearchPostalForm from './SearchPostalForm';

const useStyles = makeStyles(() => ({
  wrapperFull: {
    [`& .${cardClassIdentifier}`]: {
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
    [`& > .${cardClassIdentifier}`]: {
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
  const classes = useStyles();
  const theme: any = useTheme();

  const screenIsWide = useMediaQuery(theme.breakpoints.up(BreakPoints.Medium));
  const [name] = useFields(app.c_a, schema.givenName);

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
      <Card>
        <CardContent endSpacing>
          <CardError
            caughtError={mapToken.error}
            reloadLinkedObject={requestMapToken}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <React.Fragment>
      <GlappMap
        selectedPostalCode={selectedPostalCode}
        setSelectedPostalCode={setSelectedPostalCode}
      />
      <div className={screenIsWide ? classes.wrapperFull : classes.wrapperSmall}>
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
