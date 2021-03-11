import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import CardContent from '../../../components/Card/CardContent';
import LinkedDetailDate from '../../../components/LinkedDetailDate';
import argu from '../../../ontology/argu';
import dexes from '../../../ontology/dexes';
import ontola from '../../../ontology/ontola';
import CardMain from '../../../topologies/Card/CardMain';
import Container from '../../../topologies/Container';
import DetailsBar from '../../../topologies/DetailsBar';
import { fullResourceTopology } from '../../../topologies/FullResource';
import { defaultMenus } from '../../common';

interface DexesOfferFullProps {
  renderPartOf: boolean;
}

const DexesOfferFull: FC<DexesOfferFullProps> = ({ renderPartOf }) => (
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
      <CardContent>
        <Property label={dexes.file}>
          <Property label={schema.name} />
        </Property>
        <Property label={dexes.invites} />
      </CardContent>
    </CardMain>
  </Container>
);

DexesOfferFull.type = dexes.Offer;

DexesOfferFull.topology = fullResourceTopology;

DexesOfferFull.mapDataToProps = {
  email: schema.email,
};

export default register(DexesOfferFull);
