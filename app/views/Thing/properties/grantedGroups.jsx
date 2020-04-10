import rdf from '@ontologies/core';
import schema from '@ontologies/schema';
import {
  ReturnType,
  linkedPropType,
  register,
  useDataFetching,
  useLRS,
  useResourceLinks,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import {
  FormattedMessage,
  defineMessages,
  useIntl,
} from 'react-intl';

import Detail from '../../../components/Detail';
import { LoadingDetail } from '../../../components/Loading';
import { isPromise } from '../../../helpers/types';
import { useContainerToArr } from '../../../hooks/useContainerToArr';
import app from '../../../ontology/app';
import argu from '../../../ontology/argu';
import { contentDetailsTopology } from '../../../topologies/ContentDetails';
import { detailsBarTopology } from '../../../topologies/DetailsBar';
import { entityIsLoaded } from '../../../helpers/data';

const publicGroupIRI = rdf.id(app.ns('g/-1'));

const messages = defineMessages({
  privateTitle: {
    defaultMessage: 'Visible for {groupNames}',
    id: 'https://app.argu.co/i18n/detail/argu:grantedGroups/private/title',
  },
  publicTitle: {
    defaultMessage: 'Visible for everyone',
    id: 'https://app.argu.co/i18n/detail/argu:grantedGroups/public/title',
  },
});

const GrantedGroups = ({ linkedProp }) => {
  const { formatMessage } = useIntl();
  const lrs = useLRS();
  useDataFetching(linkedProp);
  const groups = __CLIENT__ && useContainerToArr(linkedProp);
  const groupNames = useResourceLinks(
    isPromise(groups) ? undefined : groups,
    { name: schema.name },
    { returnType: ReturnType.Value }
  ).map(({ name }) => name)
    .filter(Boolean)
    .join(', ');

  if (!entityIsLoaded(lrs, linkedProp)) {
    return <LoadingDetail />;
  }

  if (!Array.isArray(groups)) {
    return null;
  }

  if (groups.findIndex((g) => rdf.id(g) === publicGroupIRI) === -1) {
    return (
      <Detail
        icon="group"
        text={(
          <FormattedMessage
            defaultMessage="Private"
            id="https://app.argu.co/i18n/detail/argu:grantedGroups/private/text"
          />
        )}
        title={formatMessage(messages.privateTitle, { groupNames })}
      />
    );
  }

  return (
    <Detail
      icon="globe"
      text={(
        <FormattedMessage
          defaultMessage="Public"
          id="https://app.argu.co/i18n/detail/argu:grantedGroups/public/text"
        />
      )}
      title={formatMessage(messages.publicTitle)}
    />
  );
};

GrantedGroups.type = schema.Thing;

GrantedGroups.topology = [detailsBarTopology, contentDetailsTopology];

GrantedGroups.property = argu.grantedGroups;

GrantedGroups.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
  }),
  linkedProp: linkedPropType,
};

export default register(GrantedGroups);
