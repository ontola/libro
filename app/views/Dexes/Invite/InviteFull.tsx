import { isNamedNode } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  FC,
  Property,
  register,
  useDataFetching,
  useProperty,
  useResourceProperty,
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
  assigner: SomeNode;
  renderPartOf: boolean;
}

const InviteFull: FC<InviteFullProps> = ({
  assigner,
  renderPartOf,
}) => {
  const [offer] = useProperty(dexes.offer);
  const [file] = useResourceProperty(isNamedNode(offer) ? offer : undefined, dexes.file);
  useDataFetching(isNamedNode(file) ? [file] : []);
  const [fileName] = useResourceProperty(isNamedNode(file) ? file : undefined, schema.name);

  return (
    <React.Fragment>
      <Container>
        {renderPartOf && <Property label={schema.isPartOf} />}
        <Property label={argu.trashedAt} />
        <Property label={ontola.publishAction} onLoad={() => null} />
        <CardMain>
          <DetailsBar right={defaultMenus}>
            <Property label={schema.creator} />
            <Property label={rdfx.type} />
            <LinkedDetailDate />
          </DetailsBar>
          <CardContent endSpacing>
            <p>
              <strong>{assigner?.value}</strong> wil
              het bestand <strong>{fileName?.value}</strong> met je delen.
            </p>
            <Property label={dexes.offer}>
              <Property label={dexes.prohibitions} renderWhenEmpty={false} />
              <Property label={dexes.permissions} renderWhenEmpty={false} />
              <Property label={dexes.obligations} renderWhenEmpty={false} />
            </Property>
          </CardContent>
          <ActionsBar>
            <Property label={ontola.favoriteAction} />
          </ActionsBar>
        </CardMain>
      </Container>
    </React.Fragment>
  );
};

InviteFull.type = dexes.Invite;

InviteFull.topology = fullResourceTopology;

InviteFull.mapDataToProps = {
  assigner: dexes.assigner,
};

export default register(InviteFull);
