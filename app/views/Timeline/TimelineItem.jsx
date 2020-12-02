import TimelineItemBase from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import { makeStyles } from '@material-ui/styles';
import schema from '@ontologies/schema';
import {
  Property,
  register,
  useProperty,
  useResourceProperty,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

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

const TimelineItem = ({ lastItem }) => {
  const classes = useStyles();
  const [legendType] = useProperty(argu.legendType);
  const [url] = useProperty(schema.url);
  const [color] = useResourceProperty(legendType, schema.color);
  const styleDot = color ? { backgroundColor: color.value } : {};
  const nameWrapper = url
    ? ({ children }) => <Link allowExternal={false} to={url.value}>{children}</Link>
    : React.Fragment;

  return (
    <TimelineItemBase>
      <TimelineOppositeContent className={classes.oppositeContent} />
      <TimelineSeparator>
        <TimelineDot className={classes.dot} style={styleDot} />
        {lastItem || <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent className={classes.content}>
        <Property label={schema.name} wrapper={nameWrapper} />
        <div>
          <Property label={schema.startDate} relative={false} />
        </div>
        <Property label={schema.text} />
      </TimelineContent>
    </TimelineItemBase>
  );
};

TimelineItem.type = argu.TimelineItem;

TimelineItem.topology = allTopologies;

TimelineItem.propTypes = {
  lastItem: PropTypes.bool,
};

export default register(TimelineItem);
