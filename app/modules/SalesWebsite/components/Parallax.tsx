import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  Button,
  Grid,
  Typography, 
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { BreakPoints, LibroTheme } from '../../../themes/themes';
import retrievePath from '../../Common/lib/iris';
import Container from '../../Common/topologies/Container';

interface StyleProps {
  backgroundImageUrl: string;
}

const useStyles = makeStyles<LibroTheme, StyleProps>((theme) => ({
  button: {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    justifyContent: 'center',
    margin: 0,
    [theme.breakpoints.up(BreakPoints.Medium)]: {
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
    backgroundImage: ({ backgroundImageUrl }) => `url(${backgroundImageUrl})`,
    backgroundPosition: '50% 40%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '110%',
    display: 'flex',
    flexDirection: 'column',
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
  const classes = useStyles({ backgroundImageUrl });

  return (
    <div className={classes.header}>
      <div className={classes.gradient} />
      <Container>
        <Grid
          container
          alignItems="center"
          direction="row"
          justifyContent="center"
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
