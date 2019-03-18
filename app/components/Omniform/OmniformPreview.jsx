import { getTermBestLang } from 'link-lib';
import { LinkedResourceContainer, lrsType } from 'link-redux';
import PropTypes from 'prop-types';
import { NamedNode } from 'rdflib';
import React from 'react';
import {
  defineMessages,
  FormattedMessage,
  injectIntl,
  intlShape,
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
  intl: intlShape,
  lrs: lrsType,
  onClick: PropTypes.func.isRequired,
  primaryAction: PropTypes.instanceOf(NamedNode),
};

const OmniformPreview = ({
  onClick,
  intl,
  lrs,
  primaryAction,
}) => {
  const actionLabel = getTermBestLang(
    lrs.dig(primaryAction, [NS.schema('result'), NS.rdfs('label')]),
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

export default injectIntl(OmniformPreview);
