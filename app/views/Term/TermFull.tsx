import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import LinkedDetailDate from '../../components/LinkedDetailDate';
import { PageHeader } from '../../components/PageHeader';
import argu from '../../ontology/argu';
import dbo from '../../ontology/dbo';
import wdt from '../../ontology/wdt';
import Container from '../../topologies/Container';
import { fullResourceTopology } from '../../topologies/FullResource';
import MainBody from '../../topologies/MainBody';

interface TermFullProps {
  renderPartOf: boolean;
}

const TermFull: FC<TermFullProps> = ({
  renderPartOf,
}) => (
  <React.Fragment>
    <Container>
      {renderPartOf && <Property label={schema.isPartOf} />}
      <MainBody>
        <PageHeader
          detailsBarChildren={(
            <React.Fragment>
              <Property label={schema.creator} />
              <LinkedDetailDate />
            </React.Fragment>
          )}
        />
        <Property label={[dbo.thumbnail, wdt.ns('P18')]} />
        <Property label={[schema.text, schema.description, dbo.abstract]} />
      </MainBody>
    </Container>
    <Property label={argu.taggings} />
  </React.Fragment>
);

TermFull.type = argu.Term;

TermFull.topology = fullResourceTopology;

export default register(TermFull);
