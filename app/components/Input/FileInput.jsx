import schema from '@ontologies/schema';
import sh from '@ontologies/shacl';
import { linkType, useLRS } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { useField } from 'react-final-form';

import { FormSectionContext } from '../Form/FormSection';
import { listToArr } from '../../helpers/data';
import { calculateFormFieldName, isMarkedForRemove } from '../../helpers/forms';
import MediaObjectOmniformDropzoneLoader from '../../views/MediaObject/omniform/MediaObjectOmniformDropzoneLoader';

import './FileInput.scss';

const FileInput = ({
  propertyIndex,
  form,
  targetValue,
}) => {
  const lrs = useLRS();
  const formContext = React.useContext(FormSectionContext);
  const inputRef = React.createRef();
  const resourceId = calculateFormFieldName(formContext, propertyIndex);
  const encodingFormatShape = lrs.findSubject(
    form,
    [sh.property, sh.path],
    schema.encodingFormat
  ).pop();
  const encodingFormatTypes = encodingFormatShape
    && listToArr(lrs, [], lrs.getResourceProperty(encodingFormatShape, sh.in))
      ?.map((lit) => lit.value)
      ?.join(', ');

  const resourceField = useField(resourceId, {
    initialValue: targetValue,
  });

  const openDialog = () => {
    const { current } = inputRef;

    if (!current) {
      throw new Error('No input ref on dropzone');
    }

    current.click();
  };

  if (isMarkedForRemove(targetValue)) {
    return null;
  }

  const fieldName = schema.contentUrl;
  const fieldId = calculateFormFieldName(formContext, propertyIndex, fieldName);
  const { input: { value, ...resourceInput } } = resourceField;

  let current;
  if (targetValue?.['@id']?.termType === 'NamedNode') {
    current = targetValue['@id'];
  }
  if (value && value.termType) {
    current = value;
  }

  return (
    <MediaObjectOmniformDropzoneLoader
      current={current}
      encodingFormatTypes={encodingFormatTypes}
      inputRef={inputRef}
      name={fieldId}
      openDialog={openDialog}
      resourceInput={resourceInput}
    />
  );
};

FileInput.propTypes = {
  form: linkType,
  propertyIndex: PropTypes.number,
  targetValue: PropTypes.shape({
    '@id': linkType,
  }),
};

export default FileInput;
