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

import CardContent from '../../../components/Card/CardContent';
import LinkedDetailDate from '../../../components/LinkedDetailDate';
import { LoadingHidden } from '../../../components/Loading';
import argu from '../../../ontology/argu';
import dexes from '../../../ontology/dexes';
import ontola from '../../../ontology/ontola';
import { fullResourceTopology } from '../../../topologies';
import ActionsBar from '../../../topologies/ActionsBar';
import CardMain from '../../../topologies/Card/CardMain';
import Container from '../../../topologies/Container';
import DetailsBar from '../../../topologies/DetailsBar';
import { defaultMenus } from '../../common';

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
