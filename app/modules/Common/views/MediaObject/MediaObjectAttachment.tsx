import { makeStyles } from '@mui/styles';
import * as as from '@ontologies/as';
import * as schema from '@ontologies/schema';
import clsx from 'clsx';
import {
  register,
  useDataFetching,
  useIds,
  useValues,
} from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import dbo from '../../ontology/dbo';
import { LibroTheme } from '../../../Kernel/lib/themes';
import LDLink from '../../components/LDLink';
import { tryParseInt } from '../../lib/numbers';
import {
  cardMainTopology,
  cardRowTopology,
  cardTopology, 
} from '../../topologies';

const attachmentIconCID = 'CID-AttachmentIcon';

const useStyles = makeStyles<LibroTheme>((theme) => ({
  attachment: {
    border: theme.greyBorder,
    borderRadius: theme.shape.borderRadius,
    display: 'inline-flex',
    maxWidth: '20em',
    overflow: 'hidden',
    position: 'relative',
  },
  attachmentIcon: {
    color: theme.palette.grey.light,
    position: 'relative',
    zIndex: 1,
  },
  attachmentInsideButton: {
    '&:hover': {
      [`& .${attachmentIconCID}`]: {
        color: theme.palette.grey.xxLightForegroundSmall,
      },
      backgroundColor: theme.palette.grey.xxLight,
    },
    alignItems: 'center',
    borderLeft: theme.greyBorder,
    display: 'flex',
    flexGrow: 0,
    flexShrink: 0,
    height: '1.7em',
    justifyContent: 'center',
    marginRight: 'auto',
    position: 'relative',
    width: '1.7em',
    zIndex: 1,
  },
  attachmentPrimary: {
    alignItems: 'center',
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
    overflow: 'hidden',
    paddingLeft: '.4em',
    position: 'relative',
  },
  attachmentText: {
    color: theme.palette.grey.midDark,
    margin: '0 .6em',
    overflow: 'hidden',
    position: 'relative',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}));

const MediaObjectAttachment = () => {
  const [comment] = useIds(schema.comment);
  const [contentUrl] = useValues(schema.contentUrl);
  const [name] = useValues([schema.name, dbo.filename]);
  const classes = useStyles();
  const classesAttachmentIcon = clsx(attachmentIconCID, classes.attachmentIcon);

  useDataFetching(comment);
  const totalItems = tryParseInt(useValues(comment, as.totalItems));

  return (
    <div>
      <div className={classes.attachment}>
        <LDLink
          className={classes.attachmentPrimary}
          title={name}
        >
          <FontAwesome
            className={classesAttachmentIcon}
            name="file"
          />
          <div
            className={classes.attachmentText}
            data-test="Attachment-title"
          >
            {name}
          </div>
        </LDLink>
        <a
          download
          className={classes.attachmentInsideButton}
          data-test="Attachment-download"
          href={contentUrl ?? ''}
          rel="noopener noreferrer"
          target="_blank"
          title="Downloaden"
        >
          <FontAwesome
            className={classesAttachmentIcon}
            name="download"
          />
        </a>
      </div>
      {' '}
      {totalItems && totalItems > 0 && (
        <span>
          <FontAwesome
            className={classesAttachmentIcon}
            name="comment"
          />
          {totalItems}
        </span>
      )}
    </div>
  );
};

MediaObjectAttachment.type = schema.MediaObject;

MediaObjectAttachment.topology = [
  cardRowTopology,
  cardTopology,
  cardMainTopology,
];

export default register(MediaObjectAttachment);
