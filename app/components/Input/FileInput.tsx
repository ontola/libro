import { SomeTerm, isNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import * as sh from '@ontologies/shacl';
import { useLRS } from 'link-redux';
import React from 'react';

import Dropzone from '../../containers/Dropzone';
import { listToArr } from '../../helpers/data';
import { formFieldsPath } from '../../helpers/diggers';
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
    formIRI,
    storeFile,
  } = React.useContext(FormContext);
  const inputRef = React.createRef<HTMLInputElement>();
  const handleFileChange = React.useCallback((newFile) => {
    if (storeFile) {
      const [fileReference] = storeFile(newFile);
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
  const currentFile = fileStore ? fileStore[inputValue.value] : undefined;

  const encodingFormatShape = formIRI && lrs.findSubject(
    formIRI,
    [...formFieldsPath, sh.path],
    schema.encodingFormat,
  ).pop();
  const encodingFormatList = isNode(encodingFormatShape) && lrs.getResourceProperty(encodingFormatShape, sh.shaclin);
  const encodingFormatConversion = isNode(encodingFormatList) && listToArr<SomeTerm>(lrs, [], encodingFormatList);
  const encodingFormatTypes = Array.isArray(encodingFormatConversion) && encodingFormatConversion
    .map((lit) => lit.value)
    .join(', ');

  return (
    <React.Fragment>
      {required && <HiddenRequiredInput name={name} value={inputValue?.value} />}
      <Dropzone
        encodingFormatTypes={encodingFormatTypes || ''}
        inputRef={inputRef}
        name={name}
        openDialog={openDialog}
        value={currentFile}
        onChange={handleFileChange}
      />
    </React.Fragment>
  );
};

export default FileInput;
