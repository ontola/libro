import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import dbo from '../../../Common/ontology/dbo';
import wdt from '../../../Common/ontology/wdt';
import LinkedDetailDate from '../../../Common/components/LinkedDetailDate';
import { PageHeader } from '../../../Common/components/PageHeader';
import { fullResourceTopology } from '../../../Common/topologies/FullResource';
import MainBody from '../../../Common/topologies/MainBody';
import argu from '../../ontology/argu';

const TermFull: FC = () => (
  <React.Fragment>
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
    <Property label={argu.taggings} />
  </React.Fragment>
);

TermFull.type = argu.Term;

TermFull.topology = fullResourceTopology;

export default register(TermFull);
