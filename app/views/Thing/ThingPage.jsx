import { Property, register } from 'link-redux';
import React, { PureComponent } from 'react';

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
            <DetailsBar
              right={(
                <React.Fragment>
                  <Property label={NS.ontola('followMenu')} />
                  <Property label={NS.ontola('shareMenu')} />
                  <Property label={NS.ontola('actionsMenu')} />
                </React.Fragment>
              )}
            >
              <Property label={NS.argu('pinnedAt')} />
              <Property label={NS.argu('expiresAt')} />
              <Property label={NS.schema('creator')} />
              <Property label={NS.rdf('type')} />
              <Property label={NS.argu('followsCount')} />
              <Property label={NS.argu('motionsCount')} />
              <Property label={NS.schema('location')} />
              <Property label={NS.argu('grantedGroups')} />
              <LinkedDetailDate />
            </DetailsBar>
            <CardContent noSpacing>
              <Property label={[NS.schema('name'), NS.rdfs('label')]} />
              <Property label={[NS.dbo('thumbnail'), NS.wdt('P18')]} />
              <Property label={[NS.schema('text'), NS.schema('description'), NS.dbo('abstract')]} />
              <Property label={NS.foaf('isPrimaryTopicOf')} />
              <Property label={NS.meeting('attachment')} />
              <Property label={NS.argu('attachments')} />
            </CardContent>
            <ActionsBar>
              <Property label={NS.ontola('favoriteAction')} />
            </ActionsBar>
            <Property label={NS.meeting('agenda')} />
            <CardAppendix>
              <Property forceRender label={NS.app('omniform')} />
            </CardAppendix>
          </CardMain>
          <Property label={NS.ontola('publishAction')} />
          <Property label={NS.argu('voteEvents')} />
          <Property label={NS.argu('blogPosts')} />
          <Property label={NS.schema('location')} />
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
