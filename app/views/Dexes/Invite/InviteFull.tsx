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
import argu from '../../../ontology/argu';
import dexes from '../../../ontology/dexes';
import ontola from '../../../ontology/ontola';
import ActionsBar from '../../../topologies/ActionsBar';
import CardMain from '../../../topologies/Card/CardMain';
import Container from '../../../topologies/Container';
import DetailsBar from '../../../topologies/DetailsBar';
import { fullResourceTopology } from '../../../topologies/FullResource';
import { defaultMenus } from '../../common';

interface InviteFullProps {
  renderPartOf: boolean;
}

const InviteFull: FC<InviteFullProps> = ({
  renderPartOf,
}) => {
  const [assigner] = useProperty(dexes.assigner);
  const [offer] = useProperty(dexes.offer);
  const [file] = useFields(dexes.file, isNamedNode(offer) ? offer : undefined);
  useDataFetching(isNamedNode(file) ? [file] : []);
  const [fileName] = useFields(schema.name, isNamedNode(file) ? file : undefined);

  return (
    <Container>
      {renderPartOf && <Property label={schema.isPartOf} />}
      <Property label={argu.trashedAt} />
      <Property
        label={ontola.publishAction}
        onLoad={() => null}
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
