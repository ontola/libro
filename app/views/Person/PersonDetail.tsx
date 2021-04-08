import rdf, { Literal, NamedNode } from '@ontologies/core';
import * as foaf from '@ontologies/foaf';
import * as schema from '@ontologies/schema';
import {
  FC,
  register,
} from 'link-redux';
import React from 'react';
import { useIntl } from 'react-intl';

import LDDetail from '../../components/LDDetail';
import LDLink from '../../components/LDLink';
import { LinkFeature, LinkTheme } from '../../components/Link';
import argu from '../../ontology/argu';
import person from '../../ontology/person';
import { detailsBarTopology } from '../../topologies/DetailsBar';
import { tableCellTopology } from '../../topologies/TableCell';
import { personMessages } from '../../translations/messages';

interface PersonDetailProps {
  hideName: boolean;
  name: Literal;
  smallMargin?: boolean;
  theme: LinkTheme;
  titleKey: 'showProfile' | 'postedBy';
  topology: NamedNode;
}

const PersonDetail: FC<PersonDetailProps> = ({
  hideName,
  name,
  smallMargin,
  theme,
  titleKey,
  topology,
}) => {
  const { formatMessage } = useIntl();

  const title = formatMessage(personMessages[titleKey || 'showProfile'], { name: name.value });

  return (
    <LDLink
      features={[LinkFeature.Centered, rdf.equals(topology, tableCellTopology) && LinkFeature.Bold].filter(Boolean)}
      theme={theme}
    >
      <LDDetail
        smallMargin={smallMargin}
        text={hideName ? undefined : name.value}
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

export default register(PersonDetail);
