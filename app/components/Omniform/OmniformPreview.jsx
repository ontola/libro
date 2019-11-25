import { namedNodeShape } from '@ontola/mash';
import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import { getTermBestLang } from 'link-lib';
import { LinkedResourceContainer, lrsType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import {
  FormattedMessage,
  defineMessages,
  useIntl,
} from 'react-intl';

import { NS } from '../../helpers/LinkedRenderStore';

import './Omniform.scss';

const messages = defineMessages({
  defaultResponseType: {
    defaultMessage: 'response',
    id: 'https://app.argu.co/i18n/forms/omniform/defaultResponseType',
  },
});

const propTypes = {
  lrs: lrsType,
  onClick: PropTypes.func.isRequired,
  primaryAction: namedNodeShape,
};

const OmniformPreview = ({
  onClick,
  lrs,
  primaryAction,
}) => {
  const intl = useIntl();

  const actionLabel = primaryAction && getTermBestLang(
    lrs.dig(primaryAction, [schema.result, rdfs.label]),
    lrs.store.langPrefs
  )?.value;

  return (
    <button
      className="Omniform__preview"
      type="button"
      onClick={onClick}
    >
      <LinkedResourceContainer subject={NS.app('c_a')} topology={NS.argu('formFooter')} />
      <span className="Omniform__preview-text">
        <FormattedMessage
          defaultMessage="Share your response..."
          id="https://app.argu.co/i18n/forms/omniform/newResponsePreview"
          values={{
            type: (
              actionLabel || intl.formatMessage(messages.defaultResponseType)
            ).toLocaleLowerCase(),
          }}
        />
      </span>
    </button>
  );
};

OmniformPreview.propTypes = propTypes;

export default OmniformPreview;
