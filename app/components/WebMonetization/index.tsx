import rdf from '@ontologies/core';
import {
  Property,
  useAction,
  useGlobalIds,
} from 'link-redux';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FormattedMessage, useIntl } from 'react-intl';

import { NAME_PREDICATES } from '../../helpers/metaData';
import dexes from '../../ontology/dexes';
import libro from '../../ontology/libro';
import Container from '../../topologies/Container';

import { monetizationMessages } from './lib/messages';
import useMonetization, { MONETIZATION_STATE } from './lib/useMonetization';
import StatusMessage from './StatusMessage';

interface WebMonetization {
  children: JSX.Element;
}

const WebMonetization = ({
  children,
}: WebMonetization): JSX.Element => {
  const { formatMessage } = useIntl();
  const [paymentPointer] = useGlobalIds(dexes.paymentPointer);
  const paymentStatus = useMonetization();
  const showDialog = useAction(
    rdf.namedNode(`${libro.actions.snackbar.show.value}?text=${encodeURIComponent(formatMessage(monetizationMessages.snackbar))}`),
  );

  React.useEffect(() => {
    if (paymentStatus === MONETIZATION_STATE.PAYING) {
      showDialog();
    }
  }, [paymentStatus]);

  if (!paymentPointer) {
    return children;
  }

  if (paymentStatus === MONETIZATION_STATE.PAYING) {
    return (
      <React.Fragment>
        <Helmet>
          <meta
            content={paymentPointer.value}
            name="monetization"
          />
        </Helmet>
        {children}
      </React.Fragment>
    );
  }

  return (
    <Container>
      <Property label={NAME_PREDICATES} />
      <Helmet>
        <meta
          content={paymentPointer.value}
          name="monetization"
        />
      </Helmet>
      <FormattedMessage
        {...monetizationMessages.intro}
        tagName="p"
      />
      <StatusMessage status={paymentStatus} />
    </Container>
  );
};

export default WebMonetization;
