import TimelineBase from '@material-ui/lab/Timeline';
import { makeStyles } from '@material-ui/styles';
import schema from '@ontologies/schema';
import {
  Property,
  Resource,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import { useSeqToArr } from '../../hooks/useSeqToArr';
import argu from '../../ontology/argu';
import { allTopologies } from '../../topologies';
import Card, { CardContent } from '../../topologies/Card';

const useStyles = makeStyles(() => ({
  timelineWrapper: {
    maxHeight: '300px',
    overflow: 'scroll',
  },
}));

const Timeline = () => {
  const classes = useStyles();
  const [itemsSeq] = useProperty(argu.timelineItems);
  const items = useSeqToArr(itemsSeq);

  return (
    <Card>
      <CardContent>
        <Property label={schema.name} wrapper={React.Fragment} />
        <TimelineBase>
          <Property label={argu.legend} limit={Infinity} />
        </TimelineBase>
        <div className={classes.timelineWrapper}>
          <TimelineBase>
            {items.map((item, index) => (
              <Resource lastItem={index === items.length - 1} subject={item} />
            ))}
          </TimelineBase>
        </div>
      </CardContent>
    </Card>
  );
};

Timeline.type = argu.Timeline;

Timeline.topology = allTopologies;

export default register(Timeline);