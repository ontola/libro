import { makeStyles } from '@material-ui/styles';
import { NamedNode, SomeTerm } from '@ontologies/core';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  FC,
  PropertyProps,
  register,
  useDataFetching,
  useIds,
  useValues,
} from 'link-redux';
import React from 'react';

import { tryParseFloat } from '../../../../helpers/numbers';
import rivm from '../../../../ontology/rivm';
import { attributeListTopology } from '../../../../topologies';

const ICON_COUNT = 5;

export interface RatingAttributeProps extends PropertyProps {
  label: NamedNode;
  labelFrom: NamedNode;
}

const useStyles = makeStyles({
  rating: {
    '& img': {
      display: 'block',
      maxHeight: '1em',
      maxWidth: '1em',
    },
    backgroundSize: '1em',
    display: 'inline-block',
    height: '1em',
    width: '1em',
  },
  ratingImageWrapper: {
    overflow: 'hidden',
  },
});

const renderIcon = (value: SomeTerm, index: number, src: string, className: string) => {
  const float = tryParseFloat(value) || 0;

  if (float >= index) {
    return (
      <div
        className={className}
        style={{ width: `${100 * (float - index)}%` }}
      >
        <img
          alt=""
          src={`${src}.png`}
        />
      </div>
    );
  }

  return null;
};

const RatingAttribute: FC<RatingAttributeProps> = ({
  label,
  labelFrom,
  linkedProp,
}) => {
  const [labelObj] = useIds(labelFrom);
  useDataFetching(labelObj);
  const [schemaName] = useValues(labelObj, schema.name);
  const [rdfsLabel] = useValues(labelObj, rdfs.label);
  const classes = useStyles();

  const icon = label.value.includes('Costs') ? 'euro' : 'star';
  const src = `/assets/rivm/icons/${icon}`;

  /* eslint-disable react/no-array-index-key */
  return (
    <React.Fragment>
      {Array(ICON_COUNT).fill(null, 0, ICON_COUNT).map((_, index) => (
        <div
          className={classes.rating}
          key={`${src}-${index}`}
          style={{ backgroundImage: `url(${src}-bgr.png)` }}
          title={schemaName ?? rdfsLabel}
        >
          {renderIcon(linkedProp, index, src, classes.ratingImageWrapper)}
        </div>
      ))}
    </React.Fragment>
  );
  /* eslint-enable react/no-array-index-key */
};

RatingAttribute.type = schema.Thing;

RatingAttribute.topology = attributeListTopology;

RatingAttribute.property = [
  rivm.securityImprovedScore,
  rivm.oneOffCostsScore,
  rivm.recurringCostsScore,
];

export default register(RatingAttribute);
