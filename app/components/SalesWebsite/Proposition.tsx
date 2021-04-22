import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import { Property } from 'link-redux';
import React from 'react';

interface PropositionProps {
  color: string;
  name: string;
  text: string;
  textColor: string;
}

const useStyles = makeStyles({
  container: {
    marginBottom: 20,
    marginTop: 20,
  },
  icon: {
    color: (props: PropositionProps) => props.color,
    fontSize: 70,
    margin: 30,
    textAlign: 'center',
  },
  image: {
    color: 'yellow',
    height: 44,
  },
  subtitle: {
    color: (props: PropositionProps) => props.textColor,
    fontSize: '1.125rem',
    lineHeight: '1.7rem',
    margin: 10,
    marginBottom: 24,
    textAlign: 'center',
  },
  title: {
    color: (props: PropositionProps) => props.textColor,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const Proposition = (props: PropositionProps): JSX.Element => {
  const classes = useStyles(props);

  return (
    <Grid
      item
      className={classes.container}
      md={3}
      sm={6}
      xs={12}
    >
      <div className={classes.icon}>
        <Property label={schema.image} />
      </div>
      <Typography
        className={classes.title}
        variant="h3"
      >
        {props.name}
      </Typography>
      <div
        className={classes.subtitle}
        dangerouslySetInnerHTML={{ __html: props.text }}
      />
    </Grid>
  );
};

export default Proposition;
