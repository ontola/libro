import TimelineBase from '@mui/lab/Timeline';
import { makeStyles } from '@mui/styles';
import * as schema from '@ontologies/schema';
import {
  Property,
  Resource,
  array,
  register,
  useIds,
} from 'link-redux';
import React from 'react';

import { allTopologies } from '../../../../topologies';
import AllWithProperty from '../../../Common/components/AllWithProperty';
import CardContent from '../../../Common/components/Card/CardContent';
import Card from '../../../Common/topologies/Card';
import argu from '../../ontology/argu';

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
          <AllWithProperty label={argu.legend} />
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
