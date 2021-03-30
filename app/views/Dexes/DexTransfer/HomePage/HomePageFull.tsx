import { makeStyles } from '@material-ui/styles';
import { Property, register } from 'link-redux';
import React from 'react';
import { useIntl } from 'react-intl';

import { Size } from '../../../../components/shared/config';
import dexes from '../../../../ontology/dexes';
import Container from '../../../../topologies/Container';
import { fullResourceTopology } from '../../../../topologies/FullResource';
import { dexesMessages } from '../../../../translations/dexes';

import DexTransferLogo from './DexTransferLogo';

const useStyles = makeStyles({
  feature: {},
  featureDesc: {},
  featureList: {},
  featureTitle: {
    fontWeight: 'bold',
  },
  formContainer: {},
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

interface FeatureProps {
  desc: string;
  title: string;
}

// TODO: extract
const Feature: React.FC<FeatureProps> = ({ desc, title }) => {
  const classes = useStyles();

  return (
    <ul className={classes.feature}>
      <p className={classes.featureTitle}>{title}</p>
      <p className={classes.featureDesc}>{desc}</p>
    </ul>
  );
};

const HomePagePage = () => {
  const classes = useStyles();
  const { formatMessage } = useIntl();

  return (
    <Container size={Size.Medium}>
      <DexTransferLogo />
      <div className={classes.root}>
        <div className={classes.formContainer}>
          <Property label={dexes.transferAction} topology={fullResourceTopology} />
        </div>
        <div className={classes.featureList}>
          <Feature
            desc={formatMessage(dexesMessages.featureSecureDesc)}
            title={formatMessage(dexesMessages.featureSecureTitle)}
          />
          <Feature
            desc={formatMessage(dexesMessages.featureSignedDesc)}
            title={formatMessage(dexesMessages.featureSignedTitle)}
          />
          <Feature
            desc={formatMessage(dexesMessages.featureMonetizeDesc)}
            title={formatMessage(dexesMessages.featureMonetizeTitle)}
          />
          <Feature
            desc={formatMessage(dexesMessages.featureDecentralizedDesc)}
            title={formatMessage(dexesMessages.featureDecentralizedTitle)}
          />
        </div>
      </div>
    </Container>
  );
};

HomePagePage.type = dexes.HomePage;

HomePagePage.topology = fullResourceTopology;

export default register(HomePagePage);
