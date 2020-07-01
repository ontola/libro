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

const FileInput = ({
  formIRI,
  value,
  name,
  object,
  onChange,
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
    <MediaObjectOmniformDropzoneLoader
      encodingFormatTypes={encodingFormatTypes}
      formIRI={formIRI}
      inputRef={inputRef}
      name={name}
      object={object}
      openDialog={openDialog}
      resourceInput={null}
      value={value}
      onChange={onChange}
    />
  );
};

FileInput.propTypes = {
  formIRI: linkType,
  name: PropTypes.string,
  object: linkType,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default FileInput;
