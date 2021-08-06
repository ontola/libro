import {
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { SomeTerm } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { Property, Resource } from 'link-redux';
import React from 'react';

import { SalesTheme } from '../../themes/salesWebsite/SalesThemeProvider';
import Container from '../../topologies/Container';

import { ArticleContent } from './ArticleContent';
import { CallToActionButton } from './CallToActionButton';

const useStyles = makeStyles<SalesTheme>((theme) => ({
  articleContent: {
    margin: 'unset',
    maxWidth: '100%',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      '& p': {
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
  },
  button: {
    alignItems: 'center',
    display: 'flex',
    fontSize: 18,
    justifyContent: 'center',
    marginLeft: 8,
  },
  buttonWrapper: {
    alignItems: 'left',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      alignItems: 'left',
      justifyContent: 'left',
    },
  },
  container: {
    marginTop: '55px',
  },
  header: {
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    backgroundPosition: '50% 2%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '1375 px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  image: {
    borderRadius: '50%',
    padding: 20,
  },
  imageContainer: {
    filter: 'drop-shadow(0px 8px 13px rgba(0, 0, 0, .4))',
    flex: 1,
  },
  imageWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  subtitle: {
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      textAlign: 'left',
    },
  },
  title: {
    marginTop: 60,
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      textAlign: 'left',
    },
  },
}));

export interface HeaderProductPagesProps {
  backgroundImageUrl: string,
  backgroundImageUrlMobile: string,
  buttonLink: string,
  buttonText: string,
  children: React.ReactChild;
  title: string,
  subtitle: SomeTerm,
}

/** Full page with a branded header */
export const HeaderProductPages = ({
  backgroundImageUrl,
  backgroundImageUrlMobile,
  buttonLink,
  buttonText,
  title,
  subtitle,
  children,
}: HeaderProductPagesProps): JSX.Element => {
  const classes = useStyles();
  const styles = useTheme();

  const backgroundImage = useMediaQuery(styles.breakpoints.down('xs'))
    ? backgroundImageUrlMobile : backgroundImageUrl;

  const imageView = (
    <div className={classes.imageWrapper}>
      <Property
        className={classes.image}
        label={schema.image}
      />
    </div>
  );

  const image = useMediaQuery(styles.breakpoints.down('sm'))
    ? null : imageView;

  const trackingId = `${title?.replace(/[^a-zA-Z]+/g, '-')}-header-button`;

  return (
    <div
      className={classes.header}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Container className={classes.container}>
        <Grid
          container
          alignItems="center"
          direction="row"
          justify="center"
        >
          <Grid
            item
            md={1}
          />
          <Grid
            item
            md={6}
            sm={12}
          >
            <Typography
              className={classes.title}
              variant="h2"
            >
              {title}
            </Typography>
            <Typography
              className={classes.subtitle}
              variant="subtitle1"
            >
              <ArticleContent classes={{ content: classes.articleContent }}>
                <Resource subject={subtitle} />
              </ArticleContent>
            </Typography>
            <div className={classes.buttonWrapper}>
              <CallToActionButton
                text={buttonText}
                trackingId={trackingId}
                url={buttonLink}
              />
            </div>
          </Grid>
          <Grid
            item
            className={classes.imageContainer}
            md={5}
            sm={12}
          >
            {image}
          </Grid>
          {children}
        </Grid>
      </Container>
    </div>
  );
};
