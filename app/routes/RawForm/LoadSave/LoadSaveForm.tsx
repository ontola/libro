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

  const handleSave = async (values: AnyObject) => {
    const valuesToSave = preSaveFormat
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
    const handleLoad = async () => {
      setIsLoading(true);
      const newOriginalValues = await load();
      const newInitialValues = postLoadFormat
        ? postLoadFormat(newOriginalValues)
        : newOriginalValues;
      setIsLoading(false);
      setOriginalValues(newOriginalValues);
      setInitialValues(newInitialValues);
    };
    handleLoad().then();
  }, [load, postLoadFormat]);

  return (isLoading || !initialValues) ? (loading) : (
    <Form {...rest} initialValues={initialValues} onSubmit={handleSave}/>
  );
};

export default LoadSaveForm;
