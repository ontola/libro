import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

interface StepProps {
  name: string;
  text: string;
}

const useStyles = makeStyles({
  circleSmall: {
    border: '3px solid #2D7080',
    borderRadius: '50%',
    borderStyle: 'solid',
    height: 69,
    width: 67,
    zIndex: 5,
  },
  circleTransparent: {
    backgroundColor: 'white',
    borderBottomRightRadius: 70,
    borderTopRightRadius: 70,
    height: 70,
    marginLeft: 70,
    marginTop: '-3px',
    width: 35,
  },
  icon: {
    fontSize: 70,
    margin: 30,
    textAlign: 'center',
  },
  image: {
    color: 'yellow',
    height: 44,
  },
  line: {
    backgroundColor: '#2D7080',
    flex: 1,
    width: '3px',
    zIndex: 2,
  },
  stepContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    zIndex: 1,
  },
  subtitle: {
    fontSize: '1.125rem',
    lineHeight: '1.7rem',
    margin: 10,
    marginBottom: 24,
  },
  textContainer: {
    backgroundColor: '#F8FBFF',
    flex: 1,
    marginBottom: 40,
    marginTop: 40,
    maxWidth: 570,
    paddingLeft: 40,
  },
  textWrapper: {
    backgroundColor: 'white',
    flex: 1,
    marginBottom: 80,
    marginLeft: 15,
    marginTop: -80,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: -7,
    marginTop: 12,
  },
});

const Step = (props: StepProps): JSX.Element => {
  const classes = useStyles(props);

  return (
    <Grid
      container
      direction="row"
    >
      <div className={classes.stepContainer}>
        <div className={classes.circleSmall}>
          <div className={classes.circleTransparent} />
        </div>
        <div className={classes.line} />
      </div>
      <Grid
        container
        className={classes.textWrapper}
        direction="column"
      >
        <Grid
          item
          className={classes.textContainer}
          direction="column"
        >
          <Typography
            className={classes.title}
            variant="body1"
          >
            {props.name}
          </Typography>
          <Typography
            className={classes.subtitle}
            variant="body1"
          >
            {props.text}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Step;
