import { isNamedNode } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useDataFetching,
  useFields,
  useProperty,
} from 'link-redux';
import React from 'react';

import ActionsBar from '../../../Action/topologies/ActionsBar';
import argu from '../../../Argu/lib/argu';
import CardContent from '../../../Common/components/Card/CardContent';
import LinkedDetailDate from '../../../Common/components/LinkedDetailDate';
import { defaultMenus } from '../../../Common/lib/viewHelpers';
import CardMain from '../../../Common/topologies/Card/CardMain';
import Container from '../../../Common/topologies/Container';
import DetailsBar from '../../../Common/topologies/DetailsBar';
import { fullResourceTopology } from '../../../Common/topologies/FullResource';
import { LoadingHidden } from '../../../Core/components/Loading';
import ontola from '../../../Core/ontology/ontola';
import dexes from '../../ontology/dexes';

const InviteFull: FC = () => {
  const [assigner] = useProperty(dexes.assigner);
  const [offer] = useProperty(dexes.offer);
  const [file] = useFields(isNamedNode(offer) ? offer : undefined, dexes.file);
  useDataFetching(isNamedNode(file) ? [file] : []);
  const [fileName] = useFields(isNamedNode(file) ? file : undefined, schema.name);

  return (
    <Container>
      <Property label={argu.trashedAt} />
      <Property
        label={ontola.publishAction}
        onLoad={LoadingHidden}
      />
      <CardMain>
        <DetailsBar right={defaultMenus}>
          <Property label={schema.creator} />
          <Property label={rdfx.type} />
          <LinkedDetailDate />
        </DetailsBar>
        <CardContent endSpacing>
          <p>
            <strong>
              {assigner?.value}
            </strong>
            {' wil'}
            {'het bestand '}
            <strong>
              {fileName?.value}
            </strong>
            {' met je delen.'}
          </p>
          <Property label={dexes.offer}>
            <Property
              label={dexes.prohibitions}
              renderWhenEmpty={false}
            />
            <Property
              label={dexes.permissions}
              renderWhenEmpty={false}
            />
            <Property
              label={dexes.obligations}
              renderWhenEmpty={false}
            />
          </Property>
        </CardContent>
        <ActionsBar>
          <Property label={ontola.favoriteAction} />
        </ActionsBar>
      </CardMain>
    </Container>
  );
};

InviteFull.type = dexes.Invite;

InviteFull.topology = fullResourceTopology;

export default register(InviteFull);
