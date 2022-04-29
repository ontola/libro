import {
  Button,
  Container,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { Literal, NamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useLiterals,
  useNumbers,
  useProperty,
} from 'link-redux';
import React from 'react';
import { FormattedNumber } from 'react-intl';

import AnnotatedPDFViewer from '../../../components/AnnotatedPDFViewer';
import Heading, { HeadingSize } from '../../../components/Heading';
import Image from '../../../components/Image';
import SheetViewer from '../../../containers/SheetViewer';
import {
  downloadUrl,
  imageRepresentationUrl,
  isPDF,
  isSheet,
} from '../../../helpers/attachments';
import { byteToSize, tryParseInt } from '../../../helpers/numbers';
import dbo from '../../../ontology/dbo';
import { LibroTheme, Margin } from '../../../themes/themes';
import { allTopologies } from '../../../topologies';

interface PropTypes {
  encodingFormat: Literal;
  filename: NamedNode;
  linkedProp: NamedNode;
}

const useStyles = makeStyles<LibroTheme>((theme) => ({
  downloadSection: {
    display: 'flex',
  },
  fileInfo: {
    display: 'inline-block',
    margin: theme.spacing(0, Margin.Medium),
  },
  fileName: {
    fontSize: '1.8em',
    fontWeight: 800,
  },
  mediaObjectPageInfoBarImage: {
    '&.fa': {
      fontSize: '10em',
    },
    display: 'block',
    margin: 'auto',
    maxWidth: '100%',
    textAlign: 'center',
  },

  mediaObjectPageInfoBarImageFilename: {
    textAlign: 'center',
  },
  previewHeading: {
    margin: theme.spacing(Margin.Medium, 0),
  },
}));

export const ContentUrl: FC<PropTypes> = ({
  linkedProp,
  subject,
}) => {
  const classes = useStyles();

  const [contentSize] = useNumbers(schema.contentSize);
  const [encodingFormat] = useLiterals([schema.encodingFormat, schema.fileFormat]);
  const [filename] = useProperty(dbo.filename);

  if (isPDF(encodingFormat, linkedProp)) {
    return (
      <AnnotatedPDFViewer
        subject={subject}
        url={linkedProp.value}
      />
    );
  }

  if (isSheet(linkedProp.value, encodingFormat)) {
    const parsedSize = tryParseInt(contentSize);

    return (
      <React.Fragment>
        <Container>
          <div className={classes.downloadSection}>
            <Button
              color="primary"
              href={downloadUrl(linkedProp)}
              rel="nofollow noindex"
              size="large"
              startIcon={<CloudDownloadIcon />}
              variant="contained"
            >
              Download
            </Button>
            <span className={classes.fileInfo}>
              {filename && (
                <Typography
                  className={classes.fileName}
                  component="h1"
                  variant="body1"
                >
                  {filename.value}
                </Typography>
              )}
              {parsedSize && (
                <Typography variant="body2">
                  <FormattedNumber
                    style="unit"
                    unit={byteToSize(parsedSize)[1]}
                    value={byteToSize(parsedSize)[0]}
                  />
                </Typography>
              )}
            </span>
          </div>
          <Heading
            className={classes.previewHeading}
            size={HeadingSize.LG}
          >
            Preview
          </Heading>
        </Container>
        <SheetViewer
          url={linkedProp.value}
        />
      </React.Fragment>
    );
  }

  const imageLink = encodingFormat?.value?.startsWith('image/')
    ? linkedProp
    : imageRepresentationUrl({ encodingFormat });

  return (
    <a
      href={downloadUrl(linkedProp)}
      rel="nofollow noindex"
      title="Downloaden"
    >
      <Image
        ariaLabel={filename && filename.value}
        className={classes.mediaObjectPageInfoBarImage}
        data-test="MediaObject-viewer-image"
        linkedProp={imageLink}
      />
      {filename && (
        <p className={classes.mediaObjectPageInfoBarImageFilename}>
          {filename.value}
        </p>
      )}
    </a>
  );
};

ContentUrl.type = [
  schema.MediaObject,
  schema.ImageObject,
];

ContentUrl.property = schema.contentUrl;

ContentUrl.topology = allTopologies;

export default register(ContentUrl);
