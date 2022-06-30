import {
  TimelineContent,
  TimelineDot,
  TimelineItem as TimelineItemBase,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@mui/lab';
import { makeStyles } from '@mui/styles';
import * as schema from '@ontologies/schema';
import { register, useProperty } from 'link-redux';
import React from 'react';

import { allTopologies } from '../../../../topologies';
import Heading, { HeadingSize } from '../../../Common/components/Heading';
import argu from '../../lib/argu';

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
        <TimelineDot
          className={classes.dot}
          style={styleDot}
        />
      </TimelineSeparator>
      <TimelineContent className={classes.content}>
        <Heading size={HeadingSize.XS}>
          {name.value}
        </Heading>
      </TimelineContent>
    </TimelineItemBase>
  );
};

LegendItem.type = argu.LegendItem;

LegendItem.topology = allTopologies;

export default register(LegendItem);
