import { AnyObject } from 'final-form';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-final-form';

interface LoadSaveFormProps {
  load: () => any;
  loading: React.ReactElement;
  postLoadFormat: (data: any) => AnyObject;
  preSaveFormat: (values: AnyObject, data: any) => any;
  save: (data: any) => void;
  [name: string]: any;
}

const LoadSaveForm: React.FC<LoadSaveFormProps> = ({
  load,
  loading,
  postLoadFormat,
  preSaveFormat,
  save,
  ...rest
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [originalValues, setOriginalValues] = useState(undefined);
  const [initialValues, setInitialValues] = useState<AnyObject | undefined>(undefined);

  const _save = async (values: AnyObject) => {
    let valuesToSave = preSaveFormat
      ? preSaveFormat(values, originalValues)
      : values;
    const result = await save(valuesToSave);
    setOriginalValues(valuesToSave);
    setInitialValues(postLoadFormat
      ? postLoadFormat(valuesToSave)
      : valuesToSave);
    return result;
  };

  useEffect(() => {
    const _load = async () => {
      setIsLoading(true);
      console.log('LOADING...');
      const originalValues = await load();
      const initialValues = postLoadFormat
        ? postLoadFormat(originalValues)
        : originalValues;
      setIsLoading(false);
      setOriginalValues(originalValues);
      setInitialValues(initialValues);
    };
    _load().then();
  }, [load, postLoadFormat]);

  return (isLoading || !initialValues) ? (loading) : (
    <Form {...rest} initialValues={initialValues} onSubmit={_save}/>
  );
};

export default LoadSaveForm;
