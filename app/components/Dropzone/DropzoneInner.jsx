import { isNamedNode } from '@ontologies/core';
import schema from '@ontologies/schema';
import sh from '@ontologies/shacl';
import {
  Resource,
  linkType,
  useLRS,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

import { formFieldsPath } from '../../helpers/diggers';
import ontola from '../../ontology/ontola';

import DropzoneInnerPositionY from './DropzoneInnerPositionY';

const DropzoneInner = ({
  children,
  file,
  formIRI,
  isDragActive,
  object,
}) => {
  const lrs = useLRS();
  const currentContent = object && lrs.getResourceProperty(object, schema.contentUrl);

  if (currentContent || file) {
    const imagePositionYShape = lrs.findSubject(
      formIRI,
      [...formFieldsPath, sh.path],
      ontola.imagePositionY
    ).pop();

    if (imagePositionYShape) {
      return (
        <DropzoneInnerPositionY
          currentContent={currentContent}
          file={file}
          formIRI={formIRI}
          imagePositionYShape={imagePositionYShape}
          object={object}
        >
          {children}
        </DropzoneInnerPositionY>
      );
    }
  }

  if (file) {
    return children(
      <div>
        <img src={file} />
      </div>
    );
  }
  if (isNamedNode(object)) {
    return children(<Resource subject={object} />);
  }

  return children(
    <div className="MediaObjectOmniformFields__messages">
      <FontAwesome
        className="MediaObjectOmniformFields__icon"
        name="cloud-upload"
      />
      {
        isDragActive
          ? (
            <FormattedMessage
              defaultMessage="Release to select this file"
              id="https://app.argu.co/i18n/forms/dropzone/hoverText"
            />
          ) : (
            <FormattedMessage
              defaultMessage="Drag & Drop your file here or click to select a file"
              id="https://app.argu.co/i18n/forms/dropzone/passiveText"
            />
          )
      }
    </div>
  );
};

DropzoneInner.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]),
  file: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  }),
  formIRI: linkType,
  imagePositionYShape: linkType,
  isDragActive: PropTypes.bool,
  object: linkType,
};

export default DropzoneInner;
