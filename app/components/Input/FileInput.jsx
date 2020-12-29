import schema from '@ontologies/schema';
import sh from '@ontologies/shacl';
import { useLRS } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { listToArr } from '../../helpers/data';
import { formFieldsPath } from '../../helpers/diggers';
import MediaObjectOmniformDropzoneLoader from '../../views/MediaObject/omniform/MediaObjectOmniformDropzoneLoader';
import { FormContext } from '../Form/Form';

import HiddenRequiredInput from './HiddenRequiredInput';
import './FileInput.scss';

const FileInput = ({
  inputValue,
  name,
  onChange,
  required,
}) => {
  const lrs = useLRS();
  const { formIRI } = React.useContext(FormContext);
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
        inputRef={inputRef}
        name={name}
        openDialog={openDialog}
        resourceInput={null}
        value={inputValue?.value}
        onChange={onChange}
      />
    </React.Fragment>
  );
};

FileInput.propTypes = {
  inputValue: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};

export default FileInput;
