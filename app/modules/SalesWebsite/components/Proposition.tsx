import { Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import * as schema from '@ontologies/schema';
import {
  Property,
  Resource,
  useIds, 
} from 'link-redux';
import React from 'react';

interface PropositionProps {
  color: string;
  name: string;
  text: string;
  textColor: string;
}

const useStyles = makeStyles({
  container: {
    backgroundColor: 'white',
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
  const [text] = useIds(schema.text);

  return (
    <Grid
      item
      md={3}
      sm={6}
      xs={12}
    >
      <div className={classes.icon}>
        <Property label={schema.image} />
      </div>
      <Typography
        className={classes.title}
        component="h2"
        variant="h3"
      >
        {props.name}
      </Typography>
      <div className={classes.subtitle}>
        <Resource subject={text} />
      </div>
    </Grid>
  );
};

export default Proposition;
