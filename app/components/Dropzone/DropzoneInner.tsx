import { makeStyles } from '@material-ui/styles';
import rdf, { isNode } from '@ontologies/core';
import * as sh from '@ontologies/shacl';
import { useLRS } from 'link-redux';
import React from 'react';

import { imageRepresentationUrl } from '../../helpers/attachments';
import { formFieldsPath } from '../../helpers/diggers';
import ontola from '../../ontology/ontola';
import { LibroTheme } from '../../themes/themes';
import { FormContext } from '../Form/Form';
import Image from '../Image';

import DropzoneInnerPositionY from './DropzoneInnerPositionY';
import DropzoneOverlay from './DropzoneOverlay';

const DOCUMENT_PREVIEW_IMAGE_MARGIN_RIGHT = 1;

interface DropzoneInnerProps {
  children: (props: any) => any;
  preview?: string;
  encodingFormat?: string;
  fileName?: string;
  isDragActive: boolean;
}

const useStyles = makeStyles<LibroTheme>((theme) => ({
  documentPreviewFileName: {
    color: theme.palette.text.primary,
  },
  documentPreviewImage: {
    color: theme.palette.primary.main,
    paddingRight: theme.spacing(DOCUMENT_PREVIEW_IMAGE_MARGIN_RIGHT),
  },
  documentPreviewWrapper: {
    fontSize: '1rem',
  },
}));

const DropzoneInner = ({
  children,
  preview,
  encodingFormat,
  fileName,
  isDragActive,
}: DropzoneInnerProps): JSX.Element => {
  const classes = useStyles();
  const lrs = useLRS();
  const { formIRI } = React.useContext(FormContext);

  if (preview && !encodingFormat?.startsWith('image/')) {
    const fileImage = imageRepresentationUrl({ encodingFormat: rdf.literal(encodingFormat) });

    return children(
      <div className={classes.documentPreviewWrapper}>
        <Image className={classes.documentPreviewImage} linkedProp={fileImage} />
        <span className={classes.documentPreviewFileName}>{fileName}</span>
      </div>,
    );
  }

  if (preview && isNode(formIRI)) {
    const imagePositionYShape = lrs.findSubject(
      formIRI,
      [...formFieldsPath, sh.path],
      ontola.imagePositionY,
    ).pop();

    if (imagePositionYShape) {
      return (
        <DropzoneInnerPositionY
          imagePositionYShape={imagePositionYShape}
          preview={preview}
        >
          {children}
        </DropzoneInnerPositionY>
      );
    }
  }

  if (preview) {
    return children(
      <div>
        <img alt={fileName} src={preview} />
      </div>,
    );
  }

  return children(
    <DropzoneOverlay isDragActive={isDragActive} />,
  );
};

export default DropzoneInner;
