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

import CardContent from '../../../Common/components/Card/CardContent';
import LDLink from '../../../Common/components/LDLink';
import { NAME_PREDICATES, TEXT_PREDICATES } from '../../../Common/lib/metaData';
import { gridTopology } from '../../../Common/topologies';
import CardFixed from '../../../Common/topologies/Card/CardFixed';
import DetailsBar from '../../../Common/topologies/DetailsBar';
import ontola from '../../../Kernel/ontology/ontola';
import argu from '../../ontology/argu';

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
