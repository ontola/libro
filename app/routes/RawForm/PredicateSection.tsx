import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { AnyObject } from 'final-form';
import React, { useEffect, useMemo, useState } from 'react';
import { Field } from 'react-final-form';

import { getObjectKeys, LabelAdapter, ToggleButtonAdapter } from './helpers';
import ObjectRow from './ObjectRow';
import useStyles from './useStyles';

interface PredicateProps {
  initialValues: AnyObject;
  predicateKey: string;
}

const PredicateSection = ({ initialValues, predicateKey }: PredicateProps) => {
  const classes = useStyles();
  const [ newObjectKeys, setNewObjectKeys ] = useState<string[]>([]);
  const [ deletedObjects, setDeletedObjects] = useState<{ [key: string]: boolean }>({});

  const objectKeys = useMemo(() => (
    getObjectKeys(initialValues, predicateKey)
  ), [initialValues, predicateKey]);

  const remove = useMemo(() => (
    [...objectKeys, ...newObjectKeys].every((key) => deletedObjects.hasOwnProperty(key) && deletedObjects[key])
  ), [deletedObjects]);

  const handleRemoveObject = (objectKey: string, removed: boolean) => {
    setDeletedObjects({ ...deletedObjects, [objectKey]: removed })
  };

  useEffect(() => {
    setNewObjectKeys([]);
  }, [initialValues]);

  return (
    <div className={classes.sectionWrapper}>
      <div className={classes.rowWrapper}>
        <Field
          component={LabelAdapter}
          name={predicateKey}
          style={{
            textDecoration: remove ? 'line-through' : 'none'
          }}
          subscription={{ value: true }}
        />
        <Button
          onClick={() => setNewObjectKeys(
            newObjectKeys.concat(`${predicateKey}_on${newObjectKeys.length + 1}`)
          )}
          >
          +
        </Button>
        <Field
          children={<AddIcon/>}
          component={ToggleButtonAdapter}
          name={`${predicateKey}_newObject`}
          style={{ border: 0, padding: 0 }}
          subscription={{ value: true }}
        />
        {/*<RenderCount/>*/}
      </div>
      {objectKeys.map((objectKey) => (
        <ObjectRow
          handleRemove={handleRemoveObject}
          key={objectKey}
          objectKey={objectKey}
        />
      ))}
      {newObjectKeys.map((objectKey) => (
        <ObjectRow
          handleRemove={handleRemoveObject}
          key={objectKey}
          objectKey={objectKey}
        />
      ))}
    </div>
  );
};

export default PredicateSection;
