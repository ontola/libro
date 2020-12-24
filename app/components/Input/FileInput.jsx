import schema from '@ontologies/schema';
import sh from '@ontologies/shacl';
import {
  linkType,
  useLRS,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { listToArr } from '../../helpers/data';
import { formFieldsPath } from '../../helpers/diggers';
import MediaObjectOmniformDropzoneLoader from '../../views/MediaObject/omniform/MediaObjectOmniformDropzoneLoader';

import './FileInput.scss';
import HiddenRequiredInput from './HiddenRequiredInput';

const FileInput = ({
  formIRI,
  inputValue,
  name,
  object,
  onChange,
  required,
}) => {
  const lrs = useLRS();
  const inputRef = React.createRef();
  const encodingFormatShape = lrs.findSubject(
    formIRI,
    [...formFieldsPath, sh.path],
    schema.encodingFormat
  ).pop();
  const encodingFormatTypes = encodingFormatShape
    && listToArr(lrs, [], lrs.getResourceProperty(encodingFormatShape, sh.in))
      ?.map((lit) => lit.value)
      ?.join(', ');

  const openDialog = () => {
    const { current } = inputRef;

    if (!current) {
      throw new Error('No input ref on dropzone');
    }

    current.click();
  };

  return (
    <React.Fragment>
      {required && <HiddenRequiredInput value={inputValue?.value} />}
      <MediaObjectOmniformDropzoneLoader
        encodingFormatTypes={encodingFormatTypes}
        formIRI={formIRI}
        inputRef={inputRef}
        name={name}
        object={object}
        openDialog={openDialog}
        resourceInput={null}
        value={inputValue?.value}
        onChange={onChange}
      />
    </React.Fragment>
  );
};

FileInput.propTypes = {
  formIRI: linkType,
  inputValue: PropTypes.string,
  name: PropTypes.string,
  object: linkType,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};

export default FileInput;
