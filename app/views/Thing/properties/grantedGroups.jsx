import {
  linkType,
  register,
  useLRS,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';

import { contentDetailsTopology } from '../../../topologies/ContentDetails';
import { detailsBarTopology } from '../../../topologies/DetailsBar';
import { Detail } from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';
import { listToArr } from '../../../helpers/data';

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

const GrantedGroups = ({ grantedGroups }) => {
  const { formatMessage } = useIntl();
  const lrs = useLRS();

  const groups = __CLIENT__ && grantedGroups && listToArr(lrs, [], grantedGroups);

  if (!Array.isArray(groups)) {
    return null;
  }

  if (groups.indexOf(publicGroupIRI) === -1) {
    const groupNames = groups
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

GrantedGroups.topology = [detailsBarTopology, contentDetailsTopology];

GrantedGroups.property = NS.argu('grantedGroups');

GrantedGroups.mapDataToProps = {
  dataSubjects: NS.argu('grantedGroups'),
  grantedGroups: NS.argu('grantedGroups'),
};

GrantedGroups.propTypes = {
  grantedGroups: linkType,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
  }),
};

export default register(GrantedGroups);
