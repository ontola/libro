import rdfx from '@ontologies/rdf';
import schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
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
import ActionsBar from '../../topologies/ActionsBar';

const DexesAgreeMentFull = ({ partOf }) => (
  <React.Fragment>
    <Container>
      {partOf && <Property label={schema.isPartOf} />}
      <Property label={argu.trashedAt} />
      <Property label={ontola.publishAction} onLoad={() => null} />
      <CardMain>
        <DetailsBar right={defaultMenus}>
          <Property label={schema.creator} />
          <Property label={rdfx.type} />
          <LinkedDetailDate />
        </DetailsBar>
        <CardContent noSpacing>
          {/* <Property label={dexes.file} /> */}
          <Property label={schema.email} />
          <Property label={dexes.offer} />
          <Property label={dexes.assignee} />
          <Property label={dexes.assigner} />
          <Property label={dexes.dateSigned} />
          <Property label={dexes.assigneeMail} />
        </CardContent>
        <ActionsBar>
          <Property label={ontola.favoriteAction} />
        </ActionsBar>
      </CardMain>
    </Container>
  </React.Fragment>
);

DexesAgreeMentFull.type = dexes.Agreement;

DexesAgreeMentFull.topology = fullResourceTopology;

DexesAgreeMentFull.propTypes = {
  partOf: PropTypes.bool,
};

export default register(DexesAgreeMentFull);
