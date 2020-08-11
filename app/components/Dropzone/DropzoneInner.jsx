import sh from '@ontologies/shacl';
import {
  linkType,
  useLRS,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { formFieldsPath } from '../../helpers/diggers';
import ontola from '../../ontology/ontola';

import DropzoneInnerPositionY from './DropzoneInnerPositionY';
import DropzoneOverlay from './DropzoneOverlay';

const DropzoneInner = ({
  children,
  file,
  formIRI,
  isDragActive,
  object,
}) => {
  const lrs = useLRS();

  if (file) {
    const imagePositionYShape = lrs.findSubject(
      formIRI,
      [...formFieldsPath, sh.path],
      ontola.imagePositionY
    ).pop();

    if (imagePositionYShape) {
      return (
        <DropzoneInnerPositionY
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

  return children(
    <DropzoneOverlay isDragActive={isDragActive} />
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
