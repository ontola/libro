import { isNode } from '@ontologies/core';
import * as sh from '@ontologies/shacl';
import { useLRS } from 'link-redux';
import React from 'react';

import { formFieldsPath } from '../../helpers/diggers';
import { PreviewedFile } from '../../hooks/useFileStore';
import ontola from '../../ontology/ontola';
import { FormContext } from '../Form/Form';

import DropzoneInnerPositionY from './DropzoneInnerPositionY';
import DropzoneOverlay from './DropzoneOverlay';

interface PropTypes {
  children: (props: any) => any;
  file?: PreviewedFile;
  isDragActive: boolean;
}

const DropzoneInner: React.FC<PropTypes> = ({
  children,
  file,
  isDragActive,
}) => {
  const lrs = useLRS();
  const { formIRI } = React.useContext(FormContext);

  if (file && isNode(formIRI)) {
    const imagePositionYShape = lrs.findSubject(
      formIRI,
      [...formFieldsPath, sh.path],
      ontola.imagePositionY,
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
        <img alt={file.name} src={file.preview} />
      </div>,
    );
  }

  return children(
    <DropzoneOverlay isDragActive={isDragActive} />,
  );
};

export default DropzoneInner;
