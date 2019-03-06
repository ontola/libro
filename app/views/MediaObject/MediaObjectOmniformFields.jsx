import { LinkedResourceContainer, linkType, register } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import Dropzone from 'react-dropzone';
import { Field } from 'react-final-form';
import FontAwesome from 'react-fontawesome';
import { defineMessages, FormattedMessage } from 'react-intl';

import { FormSectionContext } from '../../components/Form/FormSection';
import OmniformRemoveButton from '../../components/Omniform/OmniformRemoveButton';
import { calculateFieldName } from '../../helpers/forms';
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
  propertyIndex,
  removeItem,
  targetValue,
}) => {
  const formContext = React.useContext(FormSectionContext);
  const inputRef = React.createRef();
  const fieldName = NS.schema('contentUrl');
  const fieldId = calculateFieldName(formContext, propertyIndex, fieldName);

  const openDialog = () => {
    const { current } = inputRef;

    if (!current) {
      throw new Error('No input ref on dropzone');
    }

    current.click();
  };

  return (
    <Field
      initialValue={targetValue}
      name={fieldId}
      render={({ input: { value, ...input } }) => {
        if (value && value.termType) {
          return (
            <div className="MediaObjectOmniformFields__button-spacer">
              <OmniformRemoveButton removeItem={removeItem} />
              <LinkedResourceContainer subject={value} />
            </div>
          );
        }

        const onChange = e => input.onChange(e[0]);

        return (
          <Dropzone onDrop={onChange}>
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
                    <div>{value?.name}</div>
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
};

MediaObjectOmniformFields.type = [
  NS.argu('MediaObject'),
  NS.schema('MediaObject'),
  NS.schema('ImageObject'),
  NS.schema('VideoObject'),
];

MediaObjectOmniformFields.topology = omniformFieldsTopology;

MediaObjectOmniformFields.propTypes = {
  propertyIndex: PropTypes.number,
  reactFinalForm: PropTypes.shape({
    change: PropTypes.func,
  }),
  removeItem: PropTypes.func,
  targetValue: linkType,
};

export default register(MediaObjectOmniformFields);
