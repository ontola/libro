import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import dbo from '../../../Common/ontology/dbo';
import ActionsBar from '../../../Action/topologies/ActionsBar';
import CardContent from '../../../Common/components/Card/CardContent';
import CardMain from '../../../Common/topologies/Card/CardMain';
import Container from '../../../Common/topologies/Container';
import { fullResourceTopology } from '../../../Common/topologies/FullResource';
import { LoadingHidden } from '../../../Common/components/Loading';
import ontola from '../../../Kernel/ontology/ontola';
import argu from '../../ontology/argu';

const TokenFull = (): JSX.Element => (
  <Container>
    <CardMain>
      <CardContent endSpacing>
        <Property label={[schema.name, rdfs.label]} />
        <Property label={[schema.text, schema.description, dbo.abstract]} />
        <ActionsBar>
          <Property
            label={ontola.favoriteAction}
            onLoad={LoadingHidden}
          />
        </ActionsBar>
      </CardContent>
    </CardMain>
  </Container>
);

TokenFull.type = [argu.BearerToken, argu.EmailToken];

TokenFull.topology = fullResourceTopology;

export default register(TokenFull);
