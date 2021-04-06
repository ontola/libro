import {
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

import Image from '../../components/Image';
import Container from '../../topologies/Container';

import { SalesTheme } from './SalesThemeProvider';

const useStyles = makeStyles<SalesTheme>((theme) => ({
  button: {
    alignItems: 'center',
    display: 'flex',
    fontSize: 18,
    justifyContent: 'center',
    marginLeft: 20,
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
      margin: 50,
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

interface HeaderProps {
  backgroundImageUrl: string,
  backgroundImageUrlMobile: string,
  buttonText: string,
  title: string,
  subtitle: string,
  imageUrl: any,
}

/** Full page with a branded header */
const HeaderProductPages: React.FC<HeaderProps> = ({
  backgroundImageUrl,
  backgroundImageUrlMobile,
  buttonText,
  title,
  subtitle,
  imageUrl,
  children,
}) => {
  const classes = useStyles();
  const styles = useTheme();
  const backgroundImage = useMediaQuery(styles.breakpoints.down('xs'))
    ? backgroundImageUrlMobile : backgroundImageUrl;

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
          <Grid item direction="column" md={6} sm={12}>
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
            <div className={classes.imageWrapper}>
              <Image
                className={classes.image}
                linkedProp={imageUrl}
              />
            </div>
          </Grid>
          {children}
        </Grid>
      </Container>
    </div >
  );
};

export default HeaderProductPages;