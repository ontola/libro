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
import { FormattedDate, FormattedMessage } from 'react-intl';

import { ShareBlog } from '../../../components/SalesWebsite';
import sales from '../../../ontology/sales';
import { SalesTheme } from '../../../themes/salesWebsite/SalesThemeProvider';
import Container from '../../../topologies/Container';
import { fullResourceTopology } from '../../../topologies/FullResource';
import { blogMessages } from '../../../translations/messages';

const CREATOR_IMAGE_SIZE = '4rem';

const useStyles = makeStyles<SalesTheme>((theme) => ({
  content: {
    '& a': {
      '&:hover': {
        color: theme.palette.primary.dark,
      },
      textDecoration: 'underline',
    },
    '& li::marker': {
      color: theme.palette.primary.main,
    },
    margin: 'auto',
    marginBottom: '5rem',
    maxWidth: 'min(100%, 90ch)',
  },
  creator: {
    '& img': {
      height: '100%',
      objectFit: 'contain',
      objectPosition: 'center',
      width: CREATOR_IMAGE_SIZE,
    },
    '& picture': {
      height: CREATOR_IMAGE_SIZE,
    },
    alignItems: 'center',
    display: 'flex',
    gap: '1rem',
  },
  headerSubComponent: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 'min(70rem, 100%)',
  },
  image: {
    clipPath: 'circle(50%)',
    float: 'right',
    height: 'min(400px, 30vw)',
    margin: '1rem',
    objectFit: 'cover',
    width: 'min(400px, 30vw)',
  },
}));

const BlogPageFull: FC = ({ subject }) => {
  const classes = useStyles();
  const [title] = useProperty(schema.name);
  const [content] = useProperty(schema.text);
  const [theme] = useProperty(sales.theme);
  const [datePublished] = useProperty(schema.datePublished);
  const [creator] = useProperty(schema.creator);
  const creatorLink = useResourceLink(creator as Node, {
    image: term(schema.image),
    name: value(schema.name),
  });

  return (
    <React.Fragment>
      <article>
        <Property
          label={sales.header}
          subComponent={(
            <div className={classes.headerSubComponent}>
              <span className={classes.creator}>
                <Resource subject={creatorLink.image} />
                <span>
                  {creatorLink.name}
                </span>
              </span>
              <span>
                <FormattedMessage {...blogMessages.category} />
                {' '}
                {theme.value}
              </span>
              <time dateTime={datePublished.value}>
                <FormattedDate
                  month="long"
                  value={datePublished.value}
                  year="numeric"
                />
              </time>
            </div>
          )}
        />
        <Container>
          <Property className={classes.image} label={schema.image} />
          <div className={classes.content}>
            <Resource subject={content} />
            <ShareBlog title={title.value} url={subject.value} />
          </div>
        </Container>
      </article>
      <Property label={sales.callToActionBlock} />
    </React.Fragment>
  );
};

BlogPageFull.type = sales.BlogPage;
BlogPageFull.topology = fullResourceTopology;

export default register(BlogPageFull);
