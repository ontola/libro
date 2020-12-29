import { isNode } from '@ontologies/core';
import schema from '@ontologies/schema';
import sh from '@ontologies/shacl';
import { useLRS } from 'link-redux';
import React from 'react';

import { listToArr } from '../../helpers/data';
import { formFieldsPath } from '../../helpers/diggers';
import MediaObjectOmniformDropzoneLoader from '../../views/MediaObject/omniform/MediaObjectOmniformDropzoneLoader';
import { FormContext } from '../Form/Form';

import { InputComponentProps } from '../FormField/FormInputs';
import './FileInput.scss';
import HiddenRequiredInput from './HiddenRequiredInput';

const FileInput: React.FC<InputComponentProps> = ({
  inputValue,
  name,
  onChange,
  fieldShape,
}) => {
  const { required } = fieldShape;
  const lrs = useLRS();
  const { formIRI } = React.useContext(FormContext);
  const inputRef = React.createRef();
  const encodingFormatShape = formIRI && lrs.findSubject(
    formIRI,
    [...formFieldsPath, sh.path],
    schema.encodingFormat,
  ).pop();
  const encodingFormatList = isNode(encodingFormatShape) && lrs.getResourceProperty(encodingFormatShape, sh.in);
  const encodingFormatConversion = isNode(encodingFormatList) && listToArr(lrs, [], encodingFormatList);
  const encodingFormatTypes = Array.isArray(encodingFormatConversion) && encodingFormatConversion
    .map((lit) => lit.value)
    .join(', ');

  const openDialog = () => {
    const { current } = inputRef;

    if (!current) {
      throw new Error('No input ref on dropzone');
    }

    (current as any).click();
  };

  return (
    <React.Fragment>
      {required && <HiddenRequiredInput name={name} value={inputValue?.value} />}
      <MediaObjectOmniformDropzoneLoader
        encodingFormatTypes={encodingFormatTypes}
        inputRef={inputRef}
        name={name}
        openDialog={openDialog}
        value={inputValue?.value}
        onChange={onChange}
      />
    </React.Fragment>
  );
};

export default FileInput;
