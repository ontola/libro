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

const STACKED_GRID_GAP = 5;

const useStyles = makeStyles<LibroTheme>((theme) => ({
  gridItem: {
    [theme.breakpoints.down('xs')]: {
      margin: 'auto',
    },
  },
  logo: {
    gridArea: 'logo',
  },
  lowerSection: {
    borderTop: `3px solid ${theme.palette.primary.main}`,
    display: 'grid',
    flexGrow: 1,
    fontSize: '1rem',
    gridTemplateAreas: '"logo policy privacy socials"',
    minWidth: '100%',
    paddingTop: '2rem',
    [theme.breakpoints.down('xs')]: {
      gap: theme.spacing(STACKED_GRID_GAP),
      gridTemplateAreas: '"policy" "privacy" "logo" "socials"',
    },
  },
  lowerSectionMiddleLink: {
    color: theme.palette.text.secondary,
    flexGrow: 1,
    fontWeight: 600,
    maxWidth: '400px',
  },
  policy: {
    gridArea: 'policy',
  },
  privacy: {
    gridArea: 'privacy',
  },
  socials: {
    color: theme.palette.primary.main,
    display: 'flex',
    fontSize: '2rem',
    gap: '1rem',
    gridArea: 'socials',
    justifyContent: 'flex-end',
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
      <img
        alt={intl.formatMessage(imageAltMessages.arguLogo)}
        className={`${classNames.logo} ${classNames.gridItem}`}
        src={logo.value}
      />
      <a className={`${classNames.lowerSectionMiddleLink} ${classNames.policy} ${classNames.gridItem}`} href={policy.value}>
        <FormattedMessage {...footerMessages.policy} />
      </a>
      <a className={`${classNames.lowerSectionMiddleLink} ${classNames.privacy} ${classNames.gridItem}`} href={privacy.value}>
        <FormattedMessage {...footerMessages.privacy} />
      </a>
      <span className={`${classNames.socials} ${classNames.gridItem}`}>
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
