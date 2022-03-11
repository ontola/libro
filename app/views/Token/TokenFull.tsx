import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import { LoadingHidden } from '../../components/Loading';
import argu from '../../ontology/argu';
import dbo from '../../ontology/dbo';
import ontola from '../../ontology/ontola';
import ActionsBar from '../../topologies/ActionsBar';
import CardMain from '../../topologies/Card/CardMain';
import Container from '../../topologies/Container';
import { fullResourceTopology } from '../../topologies/FullResource';

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
