import {
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { SomeTerm } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { Property, Resource } from 'link-redux';
import React from 'react';

import { BreakPoints, LibroTheme } from '../../../themes/themes';
import Container from '../../../topologies/Container';
import { ArticleContent } from '../ArticleContent';
import { CallToActionButton } from '../CallToActionButton';

import type { HeaderProps } from './HeaderProps';

const useStyles = makeStyles<LibroTheme>((theme) => ({
  articleContent: {
    margin: 'unset',
    maxWidth: '100%',
    width: '100%',
    [theme.breakpoints.down(BreakPoints.Medium)]: {
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
    [theme.breakpoints.up(BreakPoints.Medium)]: {
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
    height: '26rem',
    objectFit: 'cover',
    padding: 20,
    width: '26rem',
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
    [theme.breakpoints.up(BreakPoints.Medium)]: {
      textAlign: 'left',
    },
  },
  title: {
    marginTop: 60,
    textAlign: 'center',
    [theme.breakpoints.up(BreakPoints.Medium)]: {
      textAlign: 'left',
    },
  },
}));

interface HeaderProductPagesProps extends Omit<HeaderProps, 'subtitle'> {
  subtitle: SomeTerm;
}

/** Full page with a branded header */
export const HeaderProductPages: React.FC<HeaderProductPagesProps> = ({
  backgroundImageUrl,
  backgroundImageUrlMobile,
  buttonLink,
  buttonText,
  title,
  subtitle,
  children,
}) => {
  const classes = useStyles();
  const styles = useTheme();

  const backgroundImage = useMediaQuery(styles.breakpoints.down('sm'))
    ? backgroundImageUrlMobile : backgroundImageUrl;

  const imageView = (
    <div className={classes.imageWrapper}>
      <Property
        className={classes.image}
        label={schema.image}
      />
    </div>
  );

  const image = useMediaQuery(styles.breakpoints.down('md'))
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
          justifyContent="center"
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
                text={buttonText!}
                trackingId={trackingId}
                url={buttonLink!}
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
