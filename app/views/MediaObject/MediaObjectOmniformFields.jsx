import {
  LinkedResourceContainer,
  linkType,
  lrsType,
  register,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { useField } from 'react-final-form';

import { FormSectionContext } from '../../components/Form/FormSection';
import OmniformRemoveButton from '../../components/Omniform/OmniformRemoveButton';
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

  if (targetValue?.['@id']?.termType === 'NamedNode') {
    return (
      <div className="MediaObjectOmniformFields__button-spacer">
        <OmniformRemoveButton removeItem={removeItem} />
        <LinkedResourceContainer subject={targetValue['@id']} />
      </div>
    );
  }

  const { input: { value, ...resourceInput } } = resourceField;

  if (value && value.termType) {
    return (
      <div className="MediaObjectOmniformFields__button-spacer">
        <OmniformRemoveButton removeItem={removeItem} />
        <LinkedResourceContainer subject={value} />
      </div>
    );
  }

  const fieldName = NS.schema('contentUrl');
  const fieldId = calculateFormFieldName(formContext, propertyIndex, fieldName);

  return (
    <MediaObjectOmniformDropzone
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
