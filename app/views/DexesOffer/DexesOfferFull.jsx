import schema from '@ontologies/schema';
import {
  Property,
  register,
} from 'link-redux';
import React from 'react';
import PropTypes from 'prop-types';

import argu from '../../ontology/argu';
import dexes from '../../ontology/dexes';
import ontola from '../../ontology/ontola';
import { CardContent } from '../../topologies/Card';
import CardMain from '../../topologies/Card/CardMain';
import Container from '../../topologies/Container';
import { fullResourceTopology } from '../../topologies/FullResource';
import AttributeListItem from '../../components/AttributeListItem';
import AttributeList from '../../topologies/AttributeList';
import Heading from '../../components/Heading';

const DexesOfferFull = ({ renderPartOf }) => (
  <React.Fragment>
    <Container>
      {renderPartOf && <Property label={schema.isPartOf} />}
      <Property label={argu.trashedAt} />
      <Property label={ontola.publishAction} onLoad={() => null} />
      <CardMain>
        <CardContent>
          <Heading>DataDeal - Voorstel</Heading>
          <AttributeList>
            <AttributeListItem label={dexes.assigner} propertyLabel="Deler" />
            <AttributeListItem label={dexes.assignee} propertyLabel="Gedeeld met" />
            <AttributeListItem label={dexes.file} propertyLabel="Bestand" />
            <Property label={dexes.file}>
              <AttributeListItem label={schema.encodingFormat} propertyLabel="Formaat" />
            </Property>
            <AttributeListItem label={dexes.permissions} propertyLabel="Toegestaan" />
            <AttributeListItem label={dexes.prohibitions} propertyLabel="Verboden" />
            <AttributeListItem label={dexes.obligations} propertyLabel="Verplicht" />
          </AttributeList>
          <Property label={dexes.invites} />
        </CardContent>
      </CardMain>
    </Container>
  </React.Fragment>
);

DexesOfferFull.type = dexes.Offer;

DexesOfferFull.topology = fullResourceTopology;

DexesOfferFull.mapDataToProps = {
  email: schema.email,
};

DexesOfferFull.propTypes = {
  renderPartOf: PropTypes.bool,
};

export default register(DexesOfferFull);
