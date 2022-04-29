import { makeStyles } from '@mui/styles';
import rdf from '@ontologies/core';
import * as schema from '@ontologies/schema';
import clsx from 'clsx';
import { register, useFields } from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import { LibroTheme } from '../../themes/themes';
import { cardRowTopology, cardTopology } from '../../topologies';

const useStyles = makeStyles((theme: LibroTheme) => ({
  expired: {
    opacity: '.4',
  },
  icon: {
    borderRadius: '100%',
    color: 'white',
    height: '2em',
    left: '-.6em',
    padding: '.5em',
    position: 'absolute',
    top: '-.6em',
    width: '2em',
    zIndex: 1,
  },
  iconCon: {
    backgroundColor: (theme.palette as any).brown.main,
  },
  iconNeutral: {
    backgroundColor: theme.palette.grey.main,
  },
  iconPro: {
    backgroundColor: (theme.palette as any).green.main,
  },
}));

const Opinion = () => {
  const classes = useStyles();

  const [option] = useFields(schema.option);
  const [primaryVote] = useFields(argu.primaryVote);

  let icon;

  switch (rdf.id(option)) {
  case rdf.id(argu.yes):
    icon = 'fa-thumbs-up';
    break;
  case rdf.id(argu.no):
    icon = 'fa-thumbs-down';
    break;
  default:
    icon = 'fa-pause';
    break;
  }

  const className = clsx({
    'fa': true,
    [icon]: true,
    [classes.icon]: true,
    [classes.expired]: primaryVote.value === 'false',
    [classes.iconCon]: rdf.equals(option, argu.yes),
    [classes.iconNeutral]: !rdf.equals(option, argu.yes) && !rdf.equals(option, argu.no),
    [classes.iconPro]: rdf.equals(option, argu.no),
  });

  return (
    <span className={className} />
  );
};

Opinion.type = argu.Vote;

Opinion.topology = [
  cardTopology,
  cardRowTopology,
];

export default register(Opinion);
