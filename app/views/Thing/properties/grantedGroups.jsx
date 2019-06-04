import {
  register,
  useLRS,
  linkType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { defineMessages, FormattedMessage, injectIntl } from 'react-intl';

import { detailsBarTopology } from '../../../topologies/DetailsBar';
import { pageHeaderTopology } from '../../../topologies/PageHeader';
import { Detail } from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';

const publicGroupIRI = NS.app('g/-1');

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


const GrantedGroups = ({ intl: { formatMessage }, dataSubjects }) => {
  const lrs = useLRS();

  if (__CLIENT__) {
    dataSubjects.forEach(g => lrs.queueEntity(g));
  }

  if (dataSubjects.indexOf(publicGroupIRI) === -1) {
    const groupNames = dataSubjects
      .map(group => lrs.getResourceProperty(group, lrs.namespaces.schema('name')))
      .filter(Boolean)
      .join(', ');

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

GrantedGroups.type = NS.schema('Thing');

GrantedGroups.topology = [detailsBarTopology, pageHeaderTopology];

GrantedGroups.property = NS.argu('grantedGroups');

GrantedGroups.mapDataToProps = {
  dataSubjects: {
    label: NS.argu('grantedGroups'),
    limit: Infinity,
  },
};

GrantedGroups.propTypes = {
  dataSubjects: linkType,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
  }),
};

GrantedGroups.hocs = [injectIntl];

export default register(GrantedGroups);
