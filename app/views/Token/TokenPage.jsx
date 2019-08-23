import { Property, register } from 'link-redux';
import React from 'react';

import { CardContent } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
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
          <Property label={[NS.schema('name'), NS.rdfs('label')]} />
          <Property label={[NS.schema('text'), NS.schema('description'), NS.dbo('abstract')]} />
        </CardContent>
        <ActionsBar>
          <Property label={NS.ontola('favoriteAction')} onLoad={() => null} />
        </ActionsBar>
      </CardMain>
    </Container>
  </PrimaryResource>
);

TokenPage.type = [NS.argu('BearerToken'), NS.argu('EmailToken')];

TokenPage.topology = pageTopology;

export default register(TokenPage);
