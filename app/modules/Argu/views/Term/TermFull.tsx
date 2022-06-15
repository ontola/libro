import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import dbo from '../../../../ontology/dbo';
import wdt from '../../../../ontology/wdt';
import { fullResourceTopology } from '../../../../topologies';
import MainBody from '../../../../topologies/MainBody';
import LinkedDetailDate from '../../../Common/components/LinkedDetailDate';
import { PageHeader } from '../../../Common/components/PageHeader';

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
