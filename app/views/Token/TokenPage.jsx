import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import { CardContent } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import ontola from '../../ontology/ontola';
import ActionsBar from '../../topologies/ActionsBar';
import CardMain from '../../topologies/Card/CardMain';
import Container from '../../topologies/Container';
import { pageTopology } from '../../topologies/Page';
import PrimaryResource from '../../topologies/PrimaryResource';

const TokenPage = () => (
  <PrimaryResource>
    <Container>
      <CardMain>
        <CardContent noSpacing>
          <Property label={[schema.name, rdfs.label]} />
          <Property label={[schema.text, schema.description, NS.dbo('abstract')]} />
        </CardContent>
        <ActionsBar>
          <Property label={ontola.favoriteAction} onLoad={() => null} />
        </ActionsBar>
      </CardMain>
    </Container>
  </PrimaryResource>
);

TokenPage.type = [NS.argu('BearerToken'), NS.argu('EmailToken')];

TokenPage.topology = pageTopology;

export default register(TokenPage);
