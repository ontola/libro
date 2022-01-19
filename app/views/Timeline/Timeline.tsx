import TimelineBase from '@material-ui/lab/Timeline';
import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import {
  Property,
  Resource,
  array,
  register,
  useIds,
} from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import argu from '../../ontology/argu';
import { allTopologies } from '../../topologies';
import Card from '../../topologies/Card';

const useStyles = makeStyles(() => ({
  timelineWrapper: {
    maxHeight: '300px',
    overflow: 'scroll',
  },
}));

const Timeline = () => {
  const classes = useStyles();
  const items = useIds(array(argu.timelineItems));

  return (
    <Card>
      <CardContent>
        <Property
          label={schema.name}
          wrapper={React.Fragment}
        />
        <TimelineBase>
          <Property
            label={argu.legend}
            limit={Infinity}
          />
        </TimelineBase>
        <div className={classes.timelineWrapper}>
          <TimelineBase>
            {items.map((item, index) => (
              <Resource
                key={item.value}
                lastItem={index === items.length - 1}
                subject={item}
              />
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
