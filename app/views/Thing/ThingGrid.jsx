import schema from '@ontologies/schema';
import rdfs from '@ontologies/rdfs';
import foaf from '@ontologies/foaf';
import { Property, register } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  CardContent,
  LDLink,
  LinkedDetailDate,
} from '../../components';
import argu from '../../ontology/argu';
import dbo from '../../ontology/dbo';
import ontola from '../../ontology/ontola';
import CardFixed from '../../topologies/Card/CardFixed';
import DetailsBar from '../../topologies/DetailsBar';
import { gridTopology } from '../../topologies/Grid';

const ThingGrid = ({ itemSize }) => (
  <CardFixed size={itemSize}>
    <LDLink>
      <Property label={ontola.coverPhoto} />
      <CardContent noSpacing>
        <Property label={[schema.name, rdfs.label, foaf.name]} />
        <Property label={[schema.text, schema.description, dbo.abstract]} />
      </CardContent>
    </LDLink>
    <DetailsBar>
      <Property hideName label={schema.creator} />
      <LinkedDetailDate />
      <Property label={argu.pinnedAt} />
      <Property short label={argu.expiresAt} />
      <Property label={argu.followsCount} />
      <Property label={argu.motionsCount} />
    </DetailsBar>
  </CardFixed>
);

ThingGrid.type = schema.Thing;

ThingGrid.topology = gridTopology;

ThingGrid.propTypes = {
  itemSize: PropTypes.number,
};

export default register(ThingGrid);
