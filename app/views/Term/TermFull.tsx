import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import LinkedDetailDate from '../../components/LinkedDetailDate';
import argu from '../../ontology/argu';
import dbo from '../../ontology/dbo';
import wdt from '../../ontology/wdt';
import CardMain from '../../topologies/Card/CardMain';
import Container from '../../topologies/Container';
import DetailsBar from '../../topologies/DetailsBar';
import { fullResourceTopology } from '../../topologies/FullResource';
import { defaultMenus } from '../common';

interface TermFullProps {
  renderPartOf: boolean;
}

const TermFull: FC<TermFullProps> = ({
  renderPartOf,
}) => (
  <React.Fragment>
    <Container>
      {renderPartOf && <Property label={schema.isPartOf} />}
      <CardMain>
        <DetailsBar right={defaultMenus}>
          <Property label={schema.creator} />
          <LinkedDetailDate />
        </DetailsBar>
        <CardContent noSpacing>
          <Property label={[schema.name, rdfs.label]} />
          <Property label={[dbo.thumbnail, wdt.ns('P18')]} />
          <Property label={[schema.text, schema.description, dbo.abstract]} />
        </CardContent>
      </CardMain>
    </Container>
    <Property label={argu.taggings} />
  </React.Fragment>
);

TermFull.type = argu.Term;

TermFull.topology = fullResourceTopology;

export default register(TermFull);
