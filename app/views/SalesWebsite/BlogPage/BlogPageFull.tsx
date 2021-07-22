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

import { ArticleContent, ShareBlog } from '../../../components/SalesWebsite';
import sales from '../../../ontology/sales';
import { SalesTheme } from '../../../themes/salesWebsite/SalesThemeProvider';
import Container from '../../../topologies/Container';
import { fullResourceTopology } from '../../../topologies/FullResource';
import { blogMessages } from '../../../translations/messages';

const CREATOR_IMAGE_SIZE = '4rem';

const useStyles = makeStyles<SalesTheme>((theme) => ({
  container: {
    backgroundColor: theme.palette.background.default,
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
}));

const BlogPageFull: FC = ({ subject }) => {
  const classes = useStyles();
  const [title] = useProperty(schema.name);
  const [content] = useProperty(schema.text);
  const [theme] = useProperty(sales.theme);
  const [datePublished] = useProperty(schema.datePublished);
  const [creator] = useProperty(schema.creator);
  const [image] = useProperty(schema.image);
  const creatorLink = useResourceLink(creator as Node, {
    image: term(schema.image),
    name: value(schema.name),
  });

  return (
    <React.Fragment>
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
      <Container className={classes.container}>
        <article>
          <ArticleContent image={image}>
            <Resource subject={content} />
            <ShareBlog title={title.value} url={subject.value} />
          </ArticleContent>
        </article>
      </Container>
      <Property label={sales.callToActionBlock} trackingId="blog-page-full-cta" />
    </React.Fragment>
  );
};

BlogPageFull.type = sales.BlogPage;

BlogPageFull.topology = fullResourceTopology;

export default register(BlogPageFull);
