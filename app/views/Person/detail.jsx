import { register } from 'link-redux';
import PropTypes from 'prop-types';
import { Literal } from 'rdflib';
import React from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

import {
  Detail,
  LDLink,
} from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { detailsBarTopology } from '../../topologies/DetailsBar';
import { tableCellTopology } from '../../topologies/TableCell';

const messages = defineMessages({
  showProfile: {
    defaultMessage: "Show {name}'s profile",
    id: 'https://app.argu.co/i18n/schema:Person/showProfileText',
  },
});

class PersonDetail extends React.PureComponent {
  static type = [NS.schema('Person'), NS.person('Person'), NS.argu('Page')];

  static topology = [detailsBarTopology, tableCellTopology];

  static mapDataToProps = {
    name: {
      label: [
        NS.schema('name'),
        NS.foaf('name'),
      ],
    },
  };

  static hocs = [injectIntl];

  static propTypes = {
    intl: intlShape,
    name: PropTypes.instanceOf(Literal),
  };

  render() {
    const {
      intl: { formatMessage },
      name,
    } = this.props;

    return (
      <LDLink
        features={['centered']}
        title={formatMessage(messages.showProfile, { name })}
      >
        <Detail
          linkedImage
          text={name.value}
        />
      </LDLink>
    );
  }
}

export default register(PersonDetail);
