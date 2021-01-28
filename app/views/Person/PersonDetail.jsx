import RDFTypes from '@rdfdev/prop-types';
import * as foaf from '@ontologies/foaf';
import rdf from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  Property,
  register,
  topologyType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { defineMessages, useIntl } from 'react-intl';

import Detail from '../../components/Detail';
import LDLink from '../../components/LDLink';
import argu from '../../ontology/argu';
import person from '../../ontology/person';
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

const PersonDetail = ({
  hideName,
  name,
  theme,
  titleKey,
  topology,
}) => {
  const { formatMessage } = useIntl();

  const title = formatMessage(messages[titleKey || 'showProfile'], { name: name.value });

  if (hideName) {
    return (
      <LDLink features={['centered']}>
        <div className="Detail" title={title}>
          <Property label={schema.image} />
        </div>
      </LDLink>
    );
  }

  return (
    <LDLink
      features={['centered', rdf.equals(topology, tableCellTopology) && 'bold'].filter(Boolean)}
      theme={theme}
    >
      <Detail
        linkedImage
        text={name.value}
        title={title}
      />
    </LDLink>
  );
};

PersonDetail.type = [
  schema.Person,
  person.Person,
  argu.Page,
];

PersonDetail.topology = [detailsBarTopology, tableCellTopology];

PersonDetail.mapDataToProps = {
  name: {
    label: [
      schema.name,
      foaf.name,
    ],
  },
};

PersonDetail.propTypes = {
  hideName: PropTypes.bool,
  name: RDFTypes.literal,
  theme: PropTypes.string,
  titleKey: PropTypes.string,
  topology: topologyType,
};

export default register(PersonDetail);
