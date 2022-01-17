import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import Image from '../../../components/Image';
import sales from '../../../ontology/sales';
import { allTopologies } from '../../../topologies';

const useStyles = makeStyles({
  flexBox: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  image: {
    maxWidth: '30% !important',
  },
  text: {
    maxWidth: '70%',
  },
});

const FeatureBlock: FC = () => {
  const [image] = useProperty(schema.image);
  const [direction] = useProperty(sales.direction);
  const classes = useStyles();
  const [name] = useProperty(schema.name);

  const imageWrap = (
    <Image
      className={classes.image}
      linkedProp={image}
    />
  );
  const reverse = (direction.value === 'reverse');

  return (
    <div className={classes.flexBox}>
      {reverse ? null : imageWrap}
      <div className={classes.text}>
        <h2>
          {name.value}
        </h2>
        <Property label={schema.text} />
      </div>
      {reverse ? imageWrap : null}
    </div>
  );
};

FeatureBlock.type = sales.FeatureBlock;

FeatureBlock.topology = allTopologies;

export default register(FeatureBlock);
