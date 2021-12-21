import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import { Node } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  Resource,
  register,
  term,
  useProperty,
  useResourceLink,
  value,
} from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

import { ArticleContent } from '../../../components/SalesWebsite';
import ontola from '../../../ontology/ontola';
import sales from '../../../ontology/sales';
import { LibroTheme } from '../../../themes/themes';
import { fullResourceTopology } from '../../../topologies/FullResource';
import { blogMessages, caseMessages } from '../../../translations/messages';

const ARTICLE_PADDING = 4;
const CONTACT_PERSON_GAP = 6;
const ICON_GAP = 4;

const useStyles = makeStyles<LibroTheme>((theme) => ({
  article: {
    padding: theme.spacing(ARTICLE_PADDING),
  },
  contactDetails: {
    '& > span': {
      alignItems: 'center',
      display: 'flex',
      gap: theme.spacing(ICON_GAP),
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  contactPerson: {
    '& img': {
      maxHeight: '100%',
      maxWidth: '100%',
    },
    '& picture': {
      width: 'min(100%, 7rem)',
    },
    display: 'flex',
    gap: theme.spacing(CONTACT_PERSON_GAP),
    height: '7rem',
    justifyContent: 'flex-start',
  },
  h2: {
    fontSize: '1.7rem',
  },
  icon: {
    color: theme.palette.primary.main,
    fontSize: '2rem',
  },
  noLine: {
    textDecoration: 'none !important',
  },
}));

const CasePageFull: FC = () => {
  const classes = useStyles();
  const [content] = useProperty(schema.text);
  const [theme] = useProperty(sales.theme);
  const [image] = useProperty(schema.image);
  const [member] = useProperty(schema.member);
  const contactPerson = useResourceLink(member as Node, {
    email: value(schema.email),
    image: term(schema.image),
    linkedIn: value(ontola.href),
    name: value(schema.name),
    telephone: value(schema.telephone),
  });

  return (
    <main role="main">
      <Property
        label={sales.header}
        subComponent={(
          <div>
            <FormattedMessage {...blogMessages.category} />
            {' '}
            {theme.value}
          </div>
        )}
      />
      <article className={classes.article}>
        <ArticleContent image={image}>
          <Resource subject={content} />
          <div>
            <Typography
              classes={{ h2: classes.h2 }}
              variant="h2"
            >
              <FormattedMessage {...caseMessages.learnMore} />
            </Typography>
            <div className={classes.contactPerson}>
              <Resource subject={contactPerson.image} />
              <div className={classes.contactDetails}>
                <span>
                  {contactPerson.name}
                </span>
                <span>
                  <FontAwesome
                    className={classes.icon}
                    name="phone"
                  />
                  <a
                    className={classes.noLine}
                    href={`tel:${contactPerson.telephone}`}
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    {contactPerson.telephone}
                  </a>
                </span>
                <span>
                  <FontAwesome
                    className={classes.icon}
                    name="envelope"
                  />
                  <a
                    className={classes.noLine}
                    href={`mailto:${contactPerson.email}`}
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    {contactPerson.email}
                  </a>
                </span>
                <span>
                  <FontAwesome
                    className={classes.icon}
                    name="linkedin"
                  />
                  <a
                    href={`${contactPerson.linkedIn}`}
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    LinkedIn
                  </a>
                </span>
              </div>
            </div>
          </div>
        </ArticleContent>
      </article>
      <Property
        label={sales.callToActionBlock}
        trackingId="case-page-full-cta"
      />
    </main>
  );
};

CasePageFull.type = sales.CasePage;

CasePageFull.topology = fullResourceTopology;

export default register(CasePageFull);
