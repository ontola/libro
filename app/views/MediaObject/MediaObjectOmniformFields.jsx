import {
  LinkedResourceContainer,
  linkType,
  lrsType,
  register,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import Dropzone from 'react-dropzone';
import { Field } from 'react-final-form';
import FontAwesome from 'react-fontawesome';
import { defineMessages, FormattedMessage } from 'react-intl';

import { FormSectionContext } from '../../components/Form/FormSection';
import OmniformRemoveButton from '../../components/Omniform/OmniformRemoveButton';
import { listToArr } from '../../helpers/data';
import { calculateFormFieldName, isMarkedForRemove } from '../../helpers/forms';
import { NS } from '../../helpers/LinkedRenderStore';
import { omniformFieldsTopology } from '../../topologies/OmniformFields/OmniformFields';

import './MediaObjectOmniformFields.scss';

defineMessages({
  hoverText: {
    defaultMessage: 'Release to select this file',
    description: '',
    id: 'https://app.argu.co/i18n/forms/dropzone/hoverText',
  },
  passiveText: {
    defaultMessage: 'Drag & Drop your file here or click to select a file',
    description: '',
    id: 'https://app.argu.co/i18n/forms/dropzone/passiveText',
  },
});

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

  return (
    <Field
      initialValue={targetValue}
      name={resourceId}
      render={({ input: { value, ...input } }) => {
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
          <Field
            name={fieldId}
            render={({ input: { onChange: onContentUrlChange, value: contentUrl } }) => {
              const onChange = e => onContentUrlChange(e[0]);

              return (
                <Dropzone
                  accept={encodingFormatTypes}
                  multiple={false}
                  onDrop={onChange}
                >
                  {({ getInputProps, getRootProps, isDragActive }) => (
                    <div className="MediaObjectOmniformFields__button-spacer">
                      <OmniformRemoveButton removeItem={removeItem} />
                      <button
                        {...getRootProps({
                          className: `MediaObjectOmniformFields ${isDragActive ? 'MediaObjectOmniformFields__active' : ''}`,
                          onClick: openDialog,
                          type: 'button',
                        })}
                      >
                        <div className="MediaObjectOmniformFields__messages">
                          <FontAwesome className="MediaObjectOmniformFields__icon" name="cloud-upload" />
                          {isDragActive
                            ? <FormattedMessage id="https://app.argu.co/i18n/forms/dropzone/hoverText" />
                            : <FormattedMessage id="https://app.argu.co/i18n/forms/dropzone/passiveText" />
                          }
                          <div>{contentUrl?.name}</div>
                        </div>
                        <input
                          {...input}
                          {...getInputProps()}
                          className="MediaObjectOmniformFields__input"
                          ref={inputRef}
                          type="file"
                        />
                      </button>
                    </div>
                  )}
                </Dropzone>
              );
            }}
          />
        );
      }}
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
  reactFinalForm: PropTypes.shape({
    change: PropTypes.func,
  }),
  removeItem: PropTypes.func,
  subject: subjectType,
  targetValue: PropTypes.shape({
    '@id': linkType,
  }),
};

export default register(MediaObjectOmniformFields);
