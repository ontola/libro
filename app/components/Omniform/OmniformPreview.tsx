import { makeStyles } from '@material-ui/styles';
import { Node } from '@ontologies/core';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  dig,
  useGlobalIds,
  useStrings,
} from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import {
  FormattedMessage,
  useIntl,
} from 'react-intl';

import { normalizeFontAwesomeIRI } from '../../helpers/iris';
import { LibroTheme } from '../../themes/themes';
import { formMessages } from '../../translations/messages';

const useStyles = makeStyles<LibroTheme>((theme) => ({
  omniformPreview: {
    '& .fa': {
      paddingRight: '.1em',
    },
    '&:hover': {
      backgroundColor: theme.palette.common.white,
    },
    backgroundColor: theme.palette.grey.xxLight,
    borderBottomLeftRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
    cursor: 'text',
    display: 'flex',
    paddingLeft: '1rem',
    width: '100%',
  },
  omniformPreviewText: {
    color: theme.palette.grey.xxLightForegroundSmall,
    lineHeight: '2.4rem',
  },
}));

export interface OmniformPreviewProps {
  onClick: React.MouseEventHandler,
  primaryAction: Node,
}

const OmniformPreview = ({
  onClick,
  primaryAction,
}: OmniformPreviewProps): JSX.Element => {
  const intl = useIntl();
  const classes = useStyles();

  const [actionLabel] = useStrings(primaryAction, dig(schema.result, rdfs.label));
  const [actionIcon] = useGlobalIds(primaryAction, dig(schema.result, schema.image));
  const icon = actionIcon ? normalizeFontAwesomeIRI(actionIcon) : 'plus';

  return (
    <button
      className={classes.omniformPreview}
      type="button"
      onClick={onClick}
    >
      <span className={classes.omniformPreviewText}>
        <FontAwesome name={icon} />
        {' '}
        <FormattedMessage
          defaultMessage="Share your {type}..."
          id="https://app.argu.co/i18n/forms/omniform/newResponsePreview"
          values={{
            type: (
              actionLabel || intl.formatMessage(formMessages.defaultResponseType)
            ).toLocaleLowerCase(),
          }}
        />
      </span>
    </button>
  );
};

export default OmniformPreview;
