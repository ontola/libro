import { Node } from '@ontologies/core';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import { getTermBestLang } from 'link-lib';
import { Resource, useLRS } from 'link-redux';
import React from 'react';
import {
  FormattedMessage,
  useIntl,
} from 'react-intl';

import app from '../../ontology/app';
import { formFooterTopology } from '../../topologies/FormFooter/Footer';
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
  const lrs = useLRS();

  const actionLabel = primaryAction && getTermBestLang(
    lrs.dig(primaryAction, [schema.result, rdfs.label]),
    (lrs.store as any).langPrefs,
  )?.value;

  return (
    <button
      className="Omniform__preview"
      type="button"
      onClick={onClick}
    >
      <Resource subject={app.c_a} topology={formFooterTopology} />
      <span className="Omniform__preview-text">
        <FormattedMessage
          defaultMessage="Share a response..."
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
