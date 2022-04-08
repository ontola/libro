import rdf from '@ontologies/core';
import * as schema from '@ontologies/schema';
import React from 'react';

import Dropzone from '../../containers/Dropzone';
import { isFileType } from '../../helpers/types';
import { useFormFieldForPath } from '../../hooks/useFormFieldForPath';
import { useListToArr } from '../../hooks/useListToArr';
import dbo from '../../ontology/dbo';
import { formContext } from '../Form/FormContext';
import { formFieldContext } from '../FormField/FormFieldContext';
import { InputComponentProps } from '../FormField/InputComponentProps';

import HiddenRequiredInput from './HiddenRequiredInput';

const FileInput: React.FC<InputComponentProps> = ({
  inputValue,
  onChange,
}) => {
  const {
    fileStore,
    storeFile,
  } = React.useContext(formContext);
  const {
    name,
    fieldShape,
  } = React.useContext(formFieldContext);
  const { required } = fieldShape;
  const {
    fieldShape: encodingFormatShape,
    values: encodingFormatValues,
    onChange: encodingFormatOnChange,
  } = useFormFieldForPath(schema.encodingFormat);
  const [encodingFormatConversion, encodingFormatLoading] = useListToArr(encodingFormatShape.shIn);
  const [encodingFormatTypes, setEncodingFormatTypes] = React.useState<string>('');

  React.useEffect(() => {
    if (!encodingFormatLoading) {
      setEncodingFormatTypes(encodingFormatConversion.map((lit) => lit.value).join(', '));
    }
  }, [encodingFormatConversion, encodingFormatLoading]);

  const {
    values: fileNameFormatValues,
    onChange: fileNameFormatOnChange,
  } = useFormFieldForPath(dbo.filename);

  const inputRef = React.createRef<HTMLInputElement>();
  const handleFileChange = React.useCallback((newFile: File) => {
    if (storeFile) {
      const [fileReference] = storeFile(newFile);
      encodingFormatOnChange([rdf.literal(newFile.type)]);
      fileNameFormatOnChange([rdf.literal(newFile.name)]);
      onChange(fileReference);
    }
  }, [storeFile, onChange]);

  const openDialog = React.useCallback(() => {
    const { current } = inputRef;

    if (!current) {
      throw new Error('No input ref on dropzone');
    }

    current.click();
  }, [inputRef]);

  const preview = isFileType(inputValue)
    ? fileStore?.[inputValue.value]?.preview
    : inputValue.value;

  return (
    <React.Fragment>
      {required && (
        <HiddenRequiredInput
          name={name}
          value={inputValue?.value}
        />
      )}
      <Dropzone
        encodingFormat={encodingFormatValues?.[0]?.value}
        encodingFormatTypes={encodingFormatTypes || ''}
        fileName={fileNameFormatValues?.[0]?.value}
        inputRef={inputRef}
        name={name}
        openDialog={openDialog}
        preview={preview}
        onChange={handleFileChange}
      />
    </React.Fragment>
  );
};

export default FileInput;
