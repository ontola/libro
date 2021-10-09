import rdf from '@ontologies/core';
import * as schema from '@ontologies/schema';
import * as sh from '@ontologies/shacl';
import { useIds } from 'link-redux';
import React from 'react';

import Dropzone from '../../containers/Dropzone';
import { isFileType } from '../../helpers/types';
import useFormField from '../../hooks/useFormField';
import useInputShape from '../../hooks/useInputShape';
import { useListToArr } from '../../hooks/useListToArr';
import dbo from '../../ontology/dbo';
import { FormContext } from '../Form/Form';
import { InputComponentProps } from '../FormField/InputComponentProps';

import HiddenRequiredInput from './HiddenRequiredInput';

const FileInput: React.FC<InputComponentProps> = ({
  inputValue,
  name,
  onChange,
  fieldShape,
}) => {
  const { required } = fieldShape;
  const {
    fileStore,
    storeFile,
  } = React.useContext(FormContext);
  const fileNameShape = useInputShape(dbo.filename);
  const encodingFormatShape = useInputShape(schema.encodingFormat);
  const [encodingFormatList] = useIds(encodingFormatShape, sh.shaclin);
  const [encodingFormatConversion, encodingFormatLoading] = useListToArr(encodingFormatList);

  const [encodingFormatTypes, setEncodingFormatTypes] = React.useState<string>('');

  React.useEffect(() => {
    if (!encodingFormatLoading) {
      setEncodingFormatTypes(encodingFormatConversion.map((lit) => lit.value).join(', '));
    }
  }, [encodingFormatConversion, encodingFormatLoading]);

  const {
    values: encodingFormatValues,
    onChange: encodingFormatOnChange,
  } = useFormField({
    path: schema.encodingFormat,
    subject: encodingFormatShape,
  });

  const {
    values: fileNameFormatValues,
    onChange: fileNameFormatOnChange,
  } = useFormField({
    path: dbo.filename,
    subject: fileNameShape,
  });

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
