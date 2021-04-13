import {
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

import Container from '../../../topologies/Container';
import { SalesTheme } from '../SalesThemeProvider';

const useStyles = makeStyles<SalesTheme>((theme) => ({
  button: {
    fontSize: 24,
    fontWeight: 'bold',
    justifyContent: 'center',
    margin: 30,
    textTransform: 'none',
    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-end',
    },
  },
  buttonWrapper: {
    display: 'flex',
  },
  header: {
    alignItems: 'center',
    backgroundAttachment: 'fixed',
    backgroundColor: theme.palette.background.default,
    backgroundPosition: '50% 40%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '1375 px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      backgroundAttachment: 'scroll',
      backgroundPosition: '50% 0%',
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

interface ParallaxProps {
  backgroundImageUrl: string,
  backgroundImageUrlMobile: string,
  buttonText: string,
  title: string,
  subtitle: string,
}

/** Full page with a branded header */
const Parallax: React.FC<ParallaxProps> = ({
  backgroundImageUrl,
  backgroundImageUrlMobile,
  buttonText,
  title,
  subtitle,
  children,
}) => {
  const classes = useStyles();
  const styles = useTheme();
  const parallax = useMediaQuery(styles.breakpoints.down('sm'))
    ? backgroundImageUrlMobile : backgroundImageUrl;

  return (
    <div
      className={classes.header}
      style={{ backgroundImage: `url(${parallax})` }}
    >
      <Container>
        <Grid
          container
          alignItems="center"
          direction="row"
          justify="center"
        >
          <Grid item direction="column" md={7} sm={12}>
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
              className={classes.button}
              endIcon={(
                <ArrowRightAltIcon
                  color="primary"
                  style={{ fontSize: 35 }}
                />
              )}
            >
              {buttonText}
            </Button>
          </Grid>
          {children}
        </Grid>
      </Container>
    </div >
  );
};

export default Parallax;
