import {
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import { Property } from 'link-redux';
import React from 'react';

import Container from '../../topologies/Container';
import { SalesTheme } from '../../themes/salesWebsite/SalesThemeProvider';

const useStyles = makeStyles<SalesTheme>((theme) => ({
  button: {
    alignItems: 'center',
    display: 'flex',
    fontSize: 18,
    justifyContent: 'center',
    marginLeft: 8,
    textTransform: 'none',
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
    flex: 1,
  },
  imageWrapper: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      margin: -25,
    },
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
  buttonText: string,
  children: React.ReactChild;
  title: string,
  subtitle: string,
}

/** Full page with a branded header */
export const HeaderProductPages = ({
  backgroundImageUrl,
  backgroundImageUrlMobile,
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

  return (
    <div
      className={classes.header}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Container>
        <Grid
          container
          alignItems="center"
          direction="row"
          justify="center"
        >
          <Grid item md={1} />
          <Grid item md={6} sm={12}>
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
              {subtitle}
            </Typography>
            <div className={classes.buttonWrapper}>
              <Button
                className={classes.button}
                color="secondary"
                endIcon={<ArrowRightAltIcon style={{ fontSize: 40 }} />}
                variant="contained"
              >
                {buttonText}
              </Button>
            </div>
          </Grid>
          <Grid item className={classes.imageContainer} md={5} sm={12}>
            {image}
          </Grid>
          {children}
        </Grid>
      </Container>
    </div>
  );
};
