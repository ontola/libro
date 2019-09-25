import {
  linkType,
  lrsType,
  register,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { useField } from 'react-final-form';

import { FormSectionContext } from '../../components/Form/FormSection';
import { listToArr } from '../../helpers/data';
import { calculateFormFieldName, isMarkedForRemove } from '../../helpers/forms';
import { NS } from '../../helpers/LinkedRenderStore';
import { omniformFieldsTopology } from '../../topologies/OmniformFields/OmniformFields';

import './MediaObjectOmniformFields.scss';
import MediaObjectOmniformDropzone from './omniform/MediaObjectOmniformDropzone';

const MediaObjectOmniformFields = ({
  lrs,
  propertyIndex,
  removeItem,
  subject,
  targetValue,
}) => {
  const formContext = React.useContext(FormSectionContext);
  const inputRef = React.createRef();
  const resourceId = calculateFormFieldName(formContext, propertyIndex);
  const encodingFormatShape = lrs.findSubject(
    subject,
    [NS.sh('property'), NS.sh('path')],
    NS.schema('encodingFormat')
  ).pop();
  const encodingFormatTypes = encodingFormatShape
    && listToArr(lrs, [], lrs.getResourceProperty(encodingFormatShape, NS.sh('in')))
      ?.map(lit => lit.value)
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

  const fieldName = NS.schema('contentUrl');
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
    <MediaObjectOmniformDropzone
      current={current}
      encodingFormatTypes={encodingFormatTypes}
      inputRef={inputRef}
      name={fieldId}
      openDialog={openDialog}
      removeItem={removeItem}
      resourceInput={resourceInput}
    />
  );
};

MediaObjectOmniformFields.type = [
  NS.argu('MediaObject'),
  NS.schema('MediaObject'),
  NS.schema('ImageObject'),
  NS.schema('VideoObject'),
];

MediaObjectOmniformFields.topology = omniformFieldsTopology;

MediaObjectOmniformFields.propTypes = {
  lrs: lrsType,
  propertyIndex: PropTypes.number,
  reactFinalForm: PropTypes.shape({ change: PropTypes.func }),
  removeItem: PropTypes.func,
  subject: subjectType,
  targetValue: PropTypes.shape({
    '@id': linkType,
  }),
};

export default register(MediaObjectOmniformFields);
