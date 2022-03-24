import { makeStyles } from '@material-ui/styles';
import { Node } from '@ontologies/core';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import clsx from 'clsx';
import {
  dig,
  useStrings,
  useTopology,
} from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import {
  FormattedMessage,
  useIntl,
} from 'react-intl';

import { LibroTheme } from '../../themes/themes';
import { containerTopology } from '../../topologies/Container';
import { formMessages } from '../../translations/messages';

const useStyles = makeStyles<LibroTheme>((theme) => ({
  omniformPreview: {
    '& .fa': {
      paddingRight: '0.5em',
      verticalAlign: 'middle',
    },
    '&:hover span': {
      color: theme.palette.grey.midDark,
    },
    backgroundColor: theme.palette.common.white,
    borderBottomLeftRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
    cursor: 'text',
    display: 'flex',
    paddingLeft: '1rem',
    width: '100%',
  },
  omniformPreviewCard: {
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  omniformPreviewContainer: {
    border: theme.greyBorder,
    borderRadius: theme.shape.borderRadius,
  },
  omniformPreviewText: {
    color: theme.palette.grey.xxLightForegroundSmall,
    lineHeight: '2.4rem',
  },
  omniformPreviewTextContainer: {
    fontSize: '17px',
    fontWeight: 'bold',
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
  const topology = useTopology();

  return (
    <button
      className={clsx({
        [classes.omniformPreview]: true,
        [classes.omniformPreviewContainer]: topology === containerTopology,
        [classes.omniformPreviewCard]: topology !== containerTopology,
      })}
      type="button"
      onClick={onClick}
    >
      <span
        className={clsx({
          [classes.omniformPreviewText]: true,
          [classes.omniformPreviewTextContainer]: topology === containerTopology,
        })}
      >
        <FontAwesome name="plus" />
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
