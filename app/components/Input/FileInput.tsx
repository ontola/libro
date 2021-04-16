import rdf, { SomeTerm, isNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import * as sh from '@ontologies/shacl';
import { useLRS } from 'link-redux';
import React from 'react';

import Dropzone from '../../containers/Dropzone';
import { listToArr } from '../../helpers/data';
import { isFileType } from '../../helpers/types';
import useFormField from '../../hooks/useFormField';
import useInputShape from '../../hooks/useInputShape';
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
  const lrs = useLRS();
  const {
    fileStore,
    storeFile,
  } = React.useContext(FormContext);
  const fileNameShape = useInputShape(dbo.filename);
  const encodingFormatShape = useInputShape(schema.encodingFormat);
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
  const encodingFormatList = isNode(encodingFormatShape) && lrs.getResourceProperty(encodingFormatShape, sh.shaclin);
  const encodingFormatConversion = isNode(encodingFormatList) && listToArr<SomeTerm>(lrs, [], encodingFormatList);
  const encodingFormatTypes = Array.isArray(encodingFormatConversion) && encodingFormatConversion
    .map((lit) => lit.value)
    .join(', ');

  return (
    <React.Fragment>
      {required && <HiddenRequiredInput name={name} value={inputValue?.value} />}
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
