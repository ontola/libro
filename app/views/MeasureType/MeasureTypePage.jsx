import { Property, register } from 'link-redux';
import React from 'react';

import {
  CardContent,
  LinkedDetailDate,
} from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import ActionsBar from '../../topologies/ActionsBar';
import CardAppendix from '../../topologies/Card/CardAppendix';
import CardMain from '../../topologies/Card/CardMain';
import Container from '../../topologies/Container';
import DetailsBar from '../../topologies/DetailsBar';
import { pageTopology } from '../../topologies/Page';
import PrimaryResource from '../../topologies/PrimaryResource';
import { inlineTopology } from '../../topologies/Inline';

const MeasureTypePage = () => (
  <PrimaryResource>
    <Property label={NS.ontola('coverPhoto')} />
    <Container>
      <Property label={NS.schema('isPartOf')} />
      <Property label={NS.argu('trashedAt')} />
      <CardMain>
        <DetailsBar
          right={(
            <React.Fragment>
              <Property label={NS.ontola('followMenu')} />
              <Property label={NS.ontola('shareMenu')} />
              <Property label={NS.ontola('actionsMenu')} />
            </React.Fragment>
          )}
        >
          <Property label={NS.rdf('type')} />
          <LinkedDetailDate />
          <Property label={NS.argu('pinnedAt')} />
          <Property label={NS.argu('expiresAt')} />
          <Property label={NS.argu('followsCount')} />
          <Property label={NS.schema('location')} />
          <Property label={NS.argu('grantedGroups')} />
        </DetailsBar>
        <CardContent noSpacing>
          <Property label={[NS.schema('name'), NS.rdfs('label')]} />
          <Property label={[NS.dbo('thumbnail'), NS.wdt('P18')]} />
          <Property label={NS.rivm('exampleOf')} topology={inlineTopology} />
          <Property label={[NS.schema('text'), NS.schema('description'), NS.dbo('abstract')]} />
          <Property label={NS.foaf('isPrimaryTopicOf')} onLoad={() => null} />
          <Property label={NS.meeting('attachment')} onLoad={() => null} />
          <Property label={NS.argu('attachments')} onLoad={() => null} />
        </CardContent>
        <ActionsBar>
          <Property label={NS.ontola('favoriteAction')} onLoad={() => null} />
        </ActionsBar>
        <CardAppendix>
          <Property forceRender label={NS.app('omniform')} />
        </CardAppendix>
      </CardMain>
      <Property label={NS.ontola('publishAction')} onLoad={() => null} />
    </Container>
    <Container>
      <Property forceRender renderWhenEmpty label={NS.rivm('measures')} />
    </Container>
    <Container>
      <Property label={NS.schema('comments')} />
      <Property forceRender label={NS.app('omniform')} />
    </Container>
  </PrimaryResource>
);

MeasureTypePage.type = NS.rivm('MeasureType');

MeasureTypePage.topology = pageTopology;

export default register(MeasureTypePage);
