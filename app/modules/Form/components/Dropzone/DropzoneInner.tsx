import { makeStyles } from '@mui/styles';
import rdf from '@ontologies/core';
import React from 'react';

import { LibroTheme } from '../../../../themes/themes';
import Image from '../../../Common/components/Image';
import { imageRepresentationUrl } from '../../../Common/lib/attachments';
import ontola from '../../../Core/ontology/ontola';
import useInputId from '../../hooks/useInputId';

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
  const imagePositionYShape = useInputId(ontola.imagePositionY);

  if (preview && !encodingFormat?.startsWith('image/')) {
    const fileImage = imageRepresentationUrl({ encodingFormat: rdf.literal(encodingFormat) });

    return children(
      <div className={classes.documentPreviewWrapper}>
        <Image
          className={classes.documentPreviewImage}
          linkedProp={fileImage}
        />
        <span className={classes.documentPreviewFileName}>
          {fileName}
        </span>
      </div>,
    );
  }

  if (preview && imagePositionYShape) {
    return (
      <DropzoneInnerPositionY preview={preview}>
        {children}
      </DropzoneInnerPositionY>
    );
  }

  if (preview) {
    return children(
      <div>
        <img
          alt={fileName}
          src={preview}
        />
      </div>,
    );
  }

  return children(
    <DropzoneOverlay isDragActive={isDragActive} />,
  );
};

export default DropzoneInner;
