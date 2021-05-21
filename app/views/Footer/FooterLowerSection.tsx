import {
  FC,
  Resource,
  register,
  useProperty,
  useResourceProperty,
} from 'link-redux';
import { Node } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import * as rdfs from '@ontologies/rdfs';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import argu from '../../ontology/argu';
import { footerTopology } from '../../topologies/Footer';
import { LibroTheme } from '../../themes/themes';
import { footerMessages, imageAltMessages } from '../../translations/messages';

const useStyles = makeStyles<LibroTheme>((theme) => ({
  lowerSection: {
    borderTop: `3px solid ${theme.palette.primary.main}`,
    display: 'flex',
    flexGrow: 1,
    fontSize: '1rem',
    justifyContent: 'space-between',
    minWidth: '100%',
    paddingTop: '2rem',
  },
  lowerSectionMiddle: {
    alignItems: 'center',
    color: theme.palette.text.secondary,
    display: 'flex',
    flexGrow: 1,
    fontWeight: 600,
    justifyContent: 'space-between',
    maxWidth: '400px',
  },
  socials: {
    color: theme.palette.primary.main,
    display: 'flex',
    fontSize: '2rem',
    gap: '1rem',
  },
}));

const FooterLowerSection: FC = () => {
  const classNames = useStyles();
  const intl = useIntl();
  const [logo] = useProperty(schema.image);
  const [policy] = useProperty(argu.policy);
  const [privacy] = useProperty(argu.privacy);
  const [socialMembers] = useProperty(argu.socials) as Node[];
  const socials = useResourceProperty(socialMembers, rdfs.member);

  return (
    <div className={classNames.lowerSection}>
      <img alt={intl.formatMessage(imageAltMessages.arguLogo)} src={logo.value} />
      <span className={classNames.lowerSectionMiddle}>
        <a href={policy.value}><FormattedMessage {...footerMessages.policy} /></a>
        <a href={privacy.value}><FormattedMessage {...footerMessages.privacy} /></a>
      </span>
      <span className={classNames.socials}>
        {socials?.map((social) => (
          <Resource key={social.id} subject={social} />
        ))}
      </span>
    </div>
  );
};

FooterLowerSection.type = argu.LowerSecion;

FooterLowerSection.topology = footerTopology;

export default register(FooterLowerSection);
