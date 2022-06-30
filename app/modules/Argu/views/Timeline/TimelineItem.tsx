import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem as TimelineItemBase,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@mui/lab';
import { makeStyles } from '@mui/styles';
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

import { allTopologies } from '../../../../topologies';
import Link from '../../../Common/components/Link';
import argu from '../../lib/argu';

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
    ? ({ children }: { children: ReactChildren }) => (
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
