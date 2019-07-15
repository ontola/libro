import { Property, register, topologyType } from 'link-redux';
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
  postedBy: {
    defaultMessage: 'Posted by {name}',
    id: 'https://app.argu.co/i18n/schema:Person/postedByText',
  },
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
    hideName: PropTypes.bool,
    intl: intlShape,
    name: PropTypes.instanceOf(Literal),
    theme: PropTypes.string,
    titleKey: PropTypes.string,
    topology: topologyType,
  };

  render() {
    const {
      hideName,
      intl: { formatMessage },
      name,
      theme,
      titleKey,
      topology,
    } = this.props;

    const title = formatMessage(messages[titleKey || 'showProfile'], { name });

    if (hideName) {
      return (
        <LDLink features={['centered']}>
          <div className="Detail" title={title}>
            <Property label={NS.schema('image')} />
          </div>
        </LDLink>
      );
    }

    return (
      <LDLink
        features={['centered', topology === tableCellTopology && 'bold'].filter(Boolean)}
        theme={theme}
      >
        <Detail
          linkedImage
          text={name.value}
          title={title}
        />
      </LDLink>
    );
  }
}

export default register(PersonDetail);
