import TimelineItemBase from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useFields,
  useIds,
  useProperty,
} from 'link-redux';
import React, { ReactChildren } from 'react';

import Link from '../../components/Link';
import argu from '../../ontology/argu';
import { allTopologies } from '../../topologies';

const useStyles = makeStyles(() => ({
  content: {
    '& h2': {
      marginBottom: '0',
    },
  },
  dot: {
    padding: '5px',
  },
  oppositeContent: {
    display: 'none',
  },
}));

interface TimelineItemProps {
  lastItem: boolean;
}

const TimelineItem: FC<TimelineItemProps> = ({ lastItem }) => {
  const classes = useStyles();
  const [legendType] = useIds(argu.legendType);
  const [url] = useProperty(schema.url);
  const [color] = useFields(legendType, schema.color);
  const styleDot = color ? { backgroundColor: color.value } : {};
  const nameWrapper = url
    ? ({ children }: {children: ReactChildren}) => (
      <Link
        allowExternal={false}
        to={url.value}
      >
        {children}
      </Link>
    )
    : React.Fragment;

  return (
    <TimelineItemBase>
      <TimelineOppositeContent className={classes.oppositeContent} />
      <TimelineSeparator>
        <TimelineDot
          className={classes.dot}
          style={styleDot}
        />
        {lastItem || <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent className={classes.content}>
        <Property
          label={schema.name}
          wrapper={nameWrapper}
        />
        <div>
          <Property
            label={schema.startDate}
            relative={false}
          />
        </div>
        <Property label={schema.text} />
      </TimelineContent>
    </TimelineItemBase>
  );
};

TimelineItem.type = argu.TimelineItem;

TimelineItem.topology = allTopologies;

export default register(TimelineItem);
