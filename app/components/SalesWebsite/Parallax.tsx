import {
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { NavLink } from 'react-router-dom';

import retrievePath from '../../helpers/iris';
import { LibroTheme } from '../../themes/themes';
import Container from '../../topologies/Container';

const useStyles = makeStyles<LibroTheme>((theme) => ({
  button: {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    justifyContent: 'center',
    margin: 0,
    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-end',
    },
  },
  buttonEndIcon: {
    '& > *:first-child': {
      fontSize: '3.5rem',
    },
    marginLeft: 0,
  },
  buttonWrapper: {
    alignSelf: 'flex-end',
    display: 'flex',
  },
  gradient: {
    background: `linear-gradient(180deg, ${theme.palette.background.default}, 10%, ${theme.palette.background.default}, rgba(255, 255, 255, 0));`,
    height: '50px',
    position: 'relative',
    width: '100%',
  },
  header: {
    alignItems: 'center',
    backgroundAttachment: 'fixed',
    backgroundPosition: '50% 40%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '110%',
    display: 'flex',
    flexDirection: 'column',
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

export interface ParallaxProps {
  backgroundImageUrl: string,
  backgroundImageUrlMobile: string,
  buttonLink: string,
  buttonText: string,
  children: React.ReactChild;
  title: string,
  subtitle: string,
}

/** Full page with a branded header */
export const Parallax = ({
  backgroundImageUrl,
  buttonLink,
  buttonText,
  children,
  title,
  subtitle,
}: ParallaxProps): JSX.Element => {
  const classes = useStyles();
  const styles = useTheme();
  const parallax = useMediaQuery(styles.breakpoints.down('sm'))
    ? backgroundImageUrl : backgroundImageUrl;

  return (
    <div
      className={classes.header}
      style={{ backgroundImage: `url(${parallax})` }}
    >
      <div className={classes.gradient} />
      <Container>
        <Grid
          container
          alignItems="center"
          direction="row"
          justify="center"
        >
          <Grid
            item
            direction="column"
            md={7}
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
              {subtitle}
            </Typography>
          </Grid>
          <Grid
            item
            className={classes.buttonWrapper}
            direction="column"
            md={5}
            sm={12}
          >
            <Button
              classes={{
                endIcon: classes.buttonEndIcon,
                root: classes.button,
              }}
              component={NavLink as React.ElementType}
              endIcon={(
                <ChevronRightIcon
                  color="primary"
                />
              )}
              to={retrievePath(buttonLink)}
            >
              {buttonText}
            </Button>
          </Grid>
          {children}
        </Grid>
      </Container>
    </div>
  );
};
