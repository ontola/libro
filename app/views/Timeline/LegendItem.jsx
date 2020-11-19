import TimelineItemBase from '@material-ui/lab/TimelineItem';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import { makeStyles } from '@material-ui/styles';
import schema from '@ontologies/schema';
import { register, useProperty } from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import { allTopologies } from '../../topologies';
import Heading from '../../components/Heading';

const useStyles = makeStyles(() => ({
  content: {
    '& h5': {
      marginBottom: '0',
    },
    padding: '0 16px',
  },
  dot: {
    marginTop: '1px',
    padding: '3px',
  },
  item: {
    minHeight: '0',
  },
  oppositeContent: {
    display: 'none',
  },
}));

const LegendItem = () => {
  const classes = useStyles();
  const [name] = useProperty(schema.name);
  const [color] = useProperty(schema.color);
  const styleDot = color ? { backgroundColor: color.value } : {};

  return (
    <TimelineItemBase className={classes.item}>
      <TimelineOppositeContent className={classes.oppositeContent} />
      <TimelineSeparator>
        <TimelineDot className={classes.dot} style={styleDot} />
      </TimelineSeparator>
      <TimelineContent className={classes.content}>
        <Heading size="5">{name.value}</Heading>
      </TimelineContent>
    </TimelineItemBase>
  );
};

LegendItem.type = argu.LegendItem;

LegendItem.topology = allTopologies;

export default register(LegendItem);