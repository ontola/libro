import { AnyObject } from 'final-form';
import React from 'react';
import PredicateSection from './PredicateSection';
import useStyles from './useStyles';

export interface PredicateLocationProps {
  initialValues: AnyObject;
  location: string;
  predicateKeys: string[];
}

export const PredicatesGroup = ({ initialValues, location, predicateKeys }: PredicateLocationProps) => {
  const classes = useStyles();

  return (
    <div className={classes.predicatesGroup}>
      <div className={classes.rowWrapper}>
        <h2>{location}</h2>
      </div>
      {predicateKeys.map((predicateKey) => (
          <PredicateSection initialValues={initialValues} key={predicateKey} predicateKey={predicateKey}/>
        ))}
    </div>
  );
};

export default PredicatesGroup;
