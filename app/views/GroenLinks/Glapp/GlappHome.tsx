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
import { connect } from 'react-redux';

import { getAccessToken } from '../../../state/MapView/selectors';
import CardContent from '../../../components/Card/CardContent';
import LinkLoader from '../../../components/Loading/LinkLoader';
import GlappMap from '../../../containers/GroenLinks/GlappMap';
import withReducer from '../../../containers/withReducer';
import app from '../../../ontology/app';
import teamGL from '../../../ontology/teamGL';
import { getMapAccessToken } from '../../../state/MapView/actions';
import reducer, { MapReducerKey } from '../../../state/MapView/reducer';
import { allTopologies } from '../../../topologies';
import Card from '../../../topologies/Card';

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
    'zIndex': 1000,
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
    'zIndex': 1000,
  },
}));

interface GlappHomeProps {
  accessToken: string;
  requestAccessToken: () => void;
}

const GlappHome: FC<GlappHomeProps> = ({
  accessToken,
  requestAccessToken,
}) => {
  const [name] = useResourceProperty(app.c_a, schema.givenName);
  const classes = useStyles();
  const theme: any = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const [selectedPostalCode, setSelectedPostalCodeRaw] = React.useState<number | undefined>(undefined);
  const setSelectedPostalCode = (postalCode?: number) => {
    setSelectedPostalCodeRaw(postalCode);
  };
  React.useEffect(() => {
    if (!accessToken) {
      requestAccessToken();
    }
  }, [accessToken]);

  if (!accessToken) {
    return <LinkLoader />;
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
            <h2>{emoji(`Hoi ${name?.value || 'daar'}! 👋`)}</h2>
          </CardContent>
          <CardContent endSpacing>
            <div>Welkom bij onze campagne! Vul hier de postcode in waar jij aan de slag gaat.</div>
            <SearchPostalForm
              setSelectedPostalCode={setSelectedPostalCode}
            />
          </CardContent>
        </Card>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  accessToken: getAccessToken(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  requestAccessToken: () => dispatch(getMapAccessToken()),
});

GlappHome.type = teamGL.GlappHome;

GlappHome.topology = allTopologies;

GlappHome.hocs = [
  connect(mapStateToProps, mapDispatchToProps),
  // @ts-ignore
  withReducer(MapReducerKey, reducer),
];

export default register(GlappHome);
