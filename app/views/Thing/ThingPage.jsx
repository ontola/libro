import { Property, register } from 'link-redux';
import React, { PureComponent } from 'react';

import {
  CardContent,
  CardHeader,
} from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import CardAppendix from '../../topologies/Card/CardAppendix';
import CardMain from '../../topologies/Card/CardMain';
import Container from '../../topologies/Container';
import DetailsBar from '../../topologies/DetailsBar';
import { pageTopology } from '../../topologies/Page';
import PrimaryResource from '../../topologies/PrimaryResource';

class ThingPage extends PureComponent {
  static type = NS.schema('Thing');

  static topology = pageTopology;

  render() {
    return (
      <PrimaryResource>
        <Property label={NS.argu('coverPhoto')} />
        <Container>
          <Property label={NS.schema('isPartOf')} />
          <Property label={NS.argu('trashedAt')} />
          <CardMain data-test="Thing-thing">
            <Property label={NS.schema('superEvent')} />
            <CardContent noSpacing>
              <CardHeader
                header={<Property label={[NS.schema('name'), NS.rdfs('label')]} />}
              >
                <Property label={NS.argu('followMenu')} />
                <Property label={NS.argu('shareMenu')} />
                <Property label={NS.argu('actionsMenu')} />
              </CardHeader>
              <DetailsBar>
                <Property label={NS.rdf('type')} />
                <Property label={NS.schema('creator')} />
                <Property label={NS.schema('dateCreated')} />
                <Property label={NS.schema('location')} />
                <Property label={NS.argu('expiresAt')} />
                <Property label={NS.argu('pinnedAt')} />
              </DetailsBar>
              <Property label={[NS.dbo('thumbnail'), NS.wdt('P18')]} />
              <Property label={[NS.schema('text'), NS.schema('description'), NS.dbo('abstract')]} />
              <Property label={NS.foaf('isPrimaryTopicOf')} />
              <Property label={NS.meeting('attachment')} />
              <Property label={NS.argu('attachments')} />
            </CardContent>
            <Property label={NS.meeting('agenda')} />
            <CardAppendix>
              <Property forceRender label={NS.app('omniform')} />
            </CardAppendix>
          </CardMain>
          <Property label={NS.argu('voteEvents')} />
          <Property label={NS.argu('blogPosts')} />
          <Property label={NS.argu('motions')} />
        </Container>
        <Container size="large">
          <Property forceRender label={NS.argu('arguments')} />
        </Container>
        <Container>
          <Property label={NS.schema('comments')} />
          <Property forceRender label={NS.app('omniform')} />
        </Container>
      </PrimaryResource>
    );
  }
}

export default register(ThingPage);
