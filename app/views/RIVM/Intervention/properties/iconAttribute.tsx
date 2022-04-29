import { makeStyles } from '@mui/styles';
import { isNamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  PropertyProps,
  register,
  useDataFetching,
  useDataInvalidation,
  useValues,
} from 'link-redux';
import React from 'react';

import rivm from '../../../../ontology/rivm';
import { allTopologies } from '../../../../topologies';

const useStyles = makeStyles({
  iconAttribute: {
    display: 'inline-block',
    lineHeight: '2.5em',

  },
  imgWrapper: {
    '& img': {
      maxHeight: '100%',
      maxWidth: '100%',
    },
    display: 'inline-block',
    height: '2em',
    marginRight: '.5em',
    position: 'relative',
    textAlign: 'center',
    verticalAlign: 'middle',
    width: '2em',
  },
});

const IconAttribute: FC<PropertyProps> = ({
  linkedProp,
  subject,
}) => {
  useDataInvalidation(subject);
  useDataFetching(isNamedNode(linkedProp) ? linkedProp : []);
  const classes = useStyles();

  const [name] = useValues(isNamedNode(linkedProp) ? linkedProp : undefined, schema.name);

  if (!name) {
    return null;
  }

  return (
    <div className={classes.iconAttribute}>
      <span className={classes.imgWrapper}>
        <img
          alt=""
          src={`/assets/rivm/icons/${linkedProp.value.split('#')[1]}.png`}
          title={name}
        />
      </span>
    </div>
  );
};

IconAttribute.type = schema.Thing;

IconAttribute.topology = allTopologies;

IconAttribute.property = [
  schema.industry,
  rivm.interventionEffects,
  rivm.targetAudience,
];

export default register(IconAttribute);
