import * as schema from '@ontologies/schema';
import * as skos from '@ontologies/skos';
import {
  FC,
  Property,
  register,
  useIds,
  useProperty,
} from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import LDLink from '../../components/LDLink';
import { NAME_PREDICATES, TEXT_PREDICATES } from '../../helpers/metaData';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import { gridTopology } from '../../topologies';
import CardFixed from '../../topologies/Card/CardFixed';
import DetailsBar from '../../topologies/DetailsBar';

const TermGrid: FC = () => {
  const [name] = useProperty(NAME_PREDICATES);
  const [exactMatch] = useIds(skos.exactMatch);

  if (exactMatch) {
    return <Property label={skos.exactMatch} />;
  }

  return (
    <CardFixed>
      <LDLink aria-label={name.value}>
        <Property label={ontola.coverPhoto} />
        <CardContent noSpacing>
          <Property label={NAME_PREDICATES} />
          <Property label={TEXT_PREDICATES} />
        </CardContent>
      </LDLink>
      <DetailsBar borderBottom={false}>
        <Property
          hideName
          label={schema.creator}
        />
      </DetailsBar>
    </CardFixed>
  );
};

TermGrid.type = argu.Term;

TermGrid.topology = gridTopology;

export default register(TermGrid);
