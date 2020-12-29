import sh from '@ontologies/shacl';
import {
  linkType,
  useLRS,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { formFieldsPath } from '../../helpers/diggers';
import ontola from '../../ontology/ontola';
import { FormContext } from '../Form/Form';

import DropzoneInnerPositionY from './DropzoneInnerPositionY';
import DropzoneOverlay from './DropzoneOverlay';

const DropzoneInner = ({
  children,
  file,
  isDragActive,
}) => {
  const lrs = useLRS();
  const { formIRI } = React.useContext(FormContext);

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
          imagePositionYShape={imagePositionYShape}
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
  imagePositionYShape: linkType,
  isDragActive: PropTypes.bool,
};

export default DropzoneInner;
