import React from 'react';

import { FormTheme, formContext } from '../../components/Form/FormContext';

interface FormGroupContext {
  addFieldName?: (fieldName: string) => void;
  buttonContainerRef?: React.MutableRefObject<HTMLDivElement>
  fieldNames: string[];
  groupIndex: number;
  hasContent: boolean;
  setHasContent: (hasContent: boolean) => void;
}

const FormGroupContext = React.createContext<FormGroupContext>({} as FormGroupContext);

export const useFormGroup = (): FormGroupContext => React.useContext(FormGroupContext);

interface PropTypes {
  sequenceIndex: number;
}

const FormGroupProvider: React.FC<PropTypes> = ({
  children,
  sequenceIndex,
}) => {
  const {
    theme,
  } = React.useContext(formContext);
  const buttonContainerRef = React.useRef(document.createElement('div'));
  const [fieldNames, setFieldNames] = React.useState<string[]>([]);
  const [hasContent, setHasContent] = React.useState(false);
  const addFieldName = React.useCallback((fieldName: string) => {
    if (!fieldNames.includes(fieldName)) {
      setHasContent(true);
      fieldNames.push(fieldName);
      setFieldNames(fieldNames);
    }
  }, [fieldNames]);
  const formGroup = React.useMemo(() => ({
    addFieldName,
    buttonContainerRef: theme === FormTheme.Preview ? buttonContainerRef : undefined,
    fieldNames,
    groupIndex: sequenceIndex,
    hasContent,
    setHasContent,
  }), [
    addFieldName,
    buttonContainerRef,
    fieldNames,
    hasContent,
    sequenceIndex,
    setHasContent,
  ]);

  return (
    <FormGroupContext.Provider value={formGroup}>
      {children}
    </FormGroupContext.Provider>
  );
};

export default FormGroupProvider;
