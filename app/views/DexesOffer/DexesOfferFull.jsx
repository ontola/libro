import rdfx from '@ontologies/rdf';
import schema from '@ontologies/schema';
import {
  Property,
  register,
} from 'link-redux';
import React from 'react';
import PropTypes from 'prop-types';

import CardContent from '../../components/Card/CardContent';
import LinkedDetailDate from '../../components/LinkedDetailDate';
import argu from '../../ontology/argu';
import dexes from '../../ontology/dexes';
import ontola from '../../ontology/ontola';
import CardMain from '../../topologies/Card/CardMain';
import Container from '../../topologies/Container';
import DetailsBar from '../../topologies/DetailsBar';
import { fullResourceTopology } from '../../topologies/FullResource';
import { defaultMenus } from '../common';

const DexesOfferFull = ({ renderPartOf }) => (
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
        <CardContent>
          <Property label={dexes.file}>
            <Property label={schema.name} />
          </Property>
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
