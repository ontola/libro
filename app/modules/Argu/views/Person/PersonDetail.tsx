import rdf, { NamedNode } from '@ontologies/core';
import * as foaf from '@ontologies/foaf';
import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';
import { useIntl } from 'react-intl';

import person from '../../../../ontology/person';
import { personMessages } from '../../../../translations/messages';
import LDDetail from '../../../Common/components/LDDetail';
import LDLink from '../../../Common/components/LDLink';
import { LinkFeature, LinkTheme } from '../../../Common/components/Link';
import { detailsBarTopology } from '../../../Common/topologies';
import { tableCellTopology } from '../../../Table/topologies';
import argu from '../../ontology/argu';

interface PersonDetailProps {
  hideName: boolean;
  smallMargin?: boolean;
  theme: LinkTheme;
  titleKey: 'showProfile' | 'postedBy';
  topology: NamedNode;
}

const PersonDetail: FC<PersonDetailProps> = ({
  hideName,
  smallMargin,
  theme,
  titleKey,
  topology,
}) => {
  const { formatMessage } = useIntl();
  const [name] = useProperty([schema.name, foaf.name]);

  const title = formatMessage(
    personMessages[titleKey ?? 'showProfile'],
    { name: name.value },
  );

  return (
    <LDLink
      features={[
        LinkFeature.Centered,
        rdf.equals(topology, tableCellTopology) && LinkFeature.Bold,
      ].filter(Boolean)}
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

export default register(PersonDetail);
