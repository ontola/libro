import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { useIntl } from 'react-intl';

import ontola from '../../ontology/ontola';
import { LibroTheme } from '../../themes/themes';
import { showcaseTopology } from '../../topologies';
import { personeShowcaseMessages } from '../../translations/messages';

const CONTAINER_PADDING = 5;
const ICON_LINK_GAP = 4;

const useStyles = makeStyles<LibroTheme>((theme) => ({
  container: {
    '& img': {
      backgroundColor: '#F8FBFF',
      clipPath: 'circle(50% at center center)',
      margin: 'auto',
      marginTop: '-25%',
      padding: '10px',
      position: 'relative',
      width: 'min(45%, 250px)',
    },

    '& picture': {
      alignItems: 'center',
      display: 'flex',
      width: '100%',
    },
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    justifySelf: 'center',
    marginTop: '10px',
    minHeight: '250px',
    padding: theme.spacing(CONTAINER_PADDING),
    width: 'min(100%, 70vw)',
    [theme.breakpoints.down('xs')]: {
      marginTop: '8vw',
    },
  },
  end: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
  },
  icon: {
    color: theme.palette.primary.main,
    fontSize: '1.5rem',
    textAlign: 'center',
    width: '24px',
  },
  iconLink: {
    alignItems: 'center',
    display: 'flex',
    gap: theme.spacing(ICON_LINK_GAP),
  },
  linkedIn: {
    textDecoration: 'underline',
  },
  name: {
    fontWeight: theme.typography.fontWeightBold,
  },
  start: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
}));

const PersonShowCase: FC = () => {
  const classes = useStyles();
  const intl = useIntl();

  const [name] = useProperty(schema.name);
  const [jobTitle] = useProperty(schema.text);

  const [telephone] = useProperty(schema.telephone);
  const [email] = useProperty(schema.email);
  const [linkedIn] = useProperty(ontola.href);

  return (
    <div className={classes.container}>
      <div className={classes.start}>
        <Property label={schema.image} />
        <span className={classes.name}>
          {name.value}
        </span>
        <span className={classes.jobTitle}>
          {jobTitle.value}
        </span>
      </div>
      <div className={classes.end}>
        {telephone && (
          <span className={classes.iconLink}>
            <PhoneIcon className={classes.icon} />
            <a
              href={`tel:${telephone.value}`}
              rel="noreferrer"
              target="_blank"
            >
              {telephone.value}
            </a>
          </span>
        )}
        {email && (
          <span className={classes.iconLink}>
            <EmailIcon className={classes.icon} />
            <a
              href={`mailto:${email.value}`}
              rel="noreferrer"
              target="_blank"
            >
              {email.value}
            </a>
          </span>
        )}
        {linkedIn && (
          <span className={classes.iconLink}>
            <FontAwesome
              className={classes.icon}
              name="linkedin"
            />
            <a
              aria-label={intl.formatMessage(personeShowcaseMessages.ariaLabelLinkedIn, { name: name.value })}
              className={classes.linkedIn}
              href={linkedIn.value}
              rel="noreferrer"
              target="_blank"
            >
              LinkedIn
            </a>
          </span>
        )}
      </div>
    </div>
  );
};

PersonShowCase.type = schema.Person;
PersonShowCase.topology = showcaseTopology;

export default register(PersonShowCase);
