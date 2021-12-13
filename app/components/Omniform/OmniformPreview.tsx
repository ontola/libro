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
import { formMessages } from '../../translations/messages';

import './Omniform.scss';

export interface OmniformPreviewProps {
  onClick: React.MouseEventHandler,
  primaryAction: Node,
}

const OmniformPreview = ({
  onClick,
  primaryAction,
}: OmniformPreviewProps): JSX.Element => {
  const intl = useIntl();

  const [actionLabel] = useStrings(primaryAction, dig(schema.result, rdfs.label));
  const [actionIcon] = useGlobalIds(primaryAction, dig(schema.result, schema.image));
  const icon = actionIcon ? normalizeFontAwesomeIRI(actionIcon) : 'plus';

  return (
    <button
      className="Omniform__preview"
      type="button"
      onClick={onClick}
    >
      <span className="Omniform__preview-text">
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
