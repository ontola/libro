import { AnyObject } from 'final-form';
import React, { useEffect, useMemo, useState } from 'react';

import { getObjectKeys } from './helpers';
import ObjectRow from './ObjectRow';
import useStyles from './useStyles';

export interface PredicateSectionProps {
  initialValues: AnyObject;
  predicateKey: string;
}

const PredicateSection = ({ initialValues, predicateKey }: PredicateSectionProps) => {
  const classes = useStyles();
  const [ newObjectKeys, setNewObjectKeys ] = useState<string[]>([]);
  const [ removedObjects, setRemovedObjects] = useState<{ [key: string]: boolean }>({});

  const handleAddObject = () => (
    setNewObjectKeys(newObjectKeys.concat(`${predicateKey}_on${newObjectKeys.length + 1}`))
  );

  const handleRemoveObject = (objectKey: string, removed: boolean) => (
    setRemovedObjects({ ...removedObjects, [objectKey]: removed })
  );

  const objectKeys = useMemo(() => {
    const result = [
      ...getObjectKeys(initialValues, predicateKey),
      ...newObjectKeys,
    ];
    if (predicateKey.startsWith('pn') && !result.length) {
      handleAddObject();
    }

    return result;
  }, [initialValues, newObjectKeys, predicateKey]);

  const remove = useMemo(() => (
    objectKeys.every((key) => removedObjects.hasOwnProperty(key) && removedObjects[key])
  ), [objectKeys, removedObjects]);

  useEffect(() => {
    setNewObjectKeys([]);
  }, [initialValues]);

  return (
    <div className={classes.sectionWrapper}>
      {objectKeys.map((objectKey, index) => (
        <ObjectRow
          index={index}
          handleAddObject={handleAddObject}
          handleRemoveObject={handleRemoveObject}
          key={objectKey}
          objectKey={objectKey}
          predicateKey={predicateKey}
          removePredicate={remove}
        />
      ))}
    </div>
  );
};

export default PredicateSection;
