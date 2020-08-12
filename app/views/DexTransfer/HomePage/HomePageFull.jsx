import { makeStyles } from '@material-ui/styles';
import { Property, register } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { defineMessages, useIntl } from 'react-intl';

import dexes from '../../../ontology/dexes';
import Container from '../../../topologies/Container';
import { fullResourceTopology } from '../../../topologies/FullResource';

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

const messages = defineMessages({
  featureDecentralizedDesc: {
    defaultMessage: 'DexTransfer is powered by the DexPod - a free, open source server that you can host yourself.',
    id: 'https://dextransfer.eu/i18n/dexTransferHome/secure/desc',
  },
  featureDecentralizedTitle: {
    defaultMessage: 'Decentralized',
    id: 'https://dextransfer.eu/i18n/dexTransferHome/secure/title',
  },
  featureMonetizeDesc: {
    defaultMessage: 'Set a price for your data. If you want, we can help people find your data by sharing it in the Dexes Marketplace',
    id: 'https://dextransfer.eu/i18n/dexTransferHome/secure/desc',
  },
  featureMonetizeTitle: {
    defaultMessage: 'Make money',
    id: 'https://dextransfer.eu/i18n/dexTransferHome/secure/title',
  },
  featureSecureDesc: {
    defaultMessage: 'Fully encrypted, requires verified e-mail addresses.',
    id: 'https://dextransfer.eu/i18n/dexTransferHome/secure/desc',
  },
  featureSecureTitle: {
    defaultMessage: 'Secure',
    id: 'https://dextransfer.eu/i18n/dexTransferHome/secure/title',
  },
  featureSignedDesc: {
    defaultMessage: 'When you share something on DexTransfer,',
    id: 'https://dextransfer.eu/i18n/dexTransferHome/secure/desc',
  },
  featureSignedTitle: {
    defaultMessage: 'Signed licenses',
    id: 'https://dextransfer.eu/i18n/dexTransferHome/secure/title',
  },
});

// TODO: extract
const Feature = ({ desc, title }) => {
  const classes = useStyles();

  return (
    <ul className={classes.feature}>
      <p className={classes.featureTitle}>{title}</p>
      <p className={classes.featureDesc}>{desc}</p>
    </ul>
  );
};
Feature.propTypes = {
  desc: PropTypes.string,
  title: PropTypes.string,
};

const HomePagePage = () => {
  const classes = useStyles();
  const { formatMessage } = useIntl();

  return (
    <Container size="medium">
      <DexTransferLogo />
      <div className={classes.root}>
        <div className={classes.formContainer}>
          <Property label={dexes.transferAction} topology={fullResourceTopology} />
        </div>
        <div className={classes.featureList}>
          <Feature
            desc={formatMessage(messages.featureSecureDesc)}
            title={formatMessage(messages.featureSecureTitle)}
          />
          <Feature
            desc={formatMessage(messages.featureSignedDesc)}
            title={formatMessage(messages.featureSignedTitle)}
          />
          <Feature
            desc={formatMessage(messages.featureMonetizeDesc)}
            title={formatMessage(messages.featureMonetizeTitle)}
          />
          <Feature
            desc={formatMessage(messages.featureDecentralizedDesc)}
            title={formatMessage(messages.featureDecentralizedTitle)}
          />
        </div>
      </div>
    </Container>
  );
};

HomePagePage.type = dexes.HomePage;

HomePagePage.topology = fullResourceTopology;

export default register(HomePagePage);
