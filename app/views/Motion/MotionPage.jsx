import { Property, register } from 'link-redux';
import React from 'react';

import {
  CardContent,
} from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import CardAppendix from '../../topologies/Card/CardAppendix';
import CardMain from '../../topologies/Card/CardMain';
import Container from '../../topologies/Container';
import DetailsBar from '../../topologies/DetailsBar';
import { pageTopology } from '../../topologies/Page';
import PrimaryResource from '../../topologies/PrimaryResource';

class MotionPage extends React.PureComponent {
  static type = NS.argu('Motion');

  static topology = pageTopology;

  render() {
    return (
      <PrimaryResource>
        <Property label={NS.argu('coverPhoto')} />
        <Container>
          <Property label={NS.schema('isPartOf')} />
          <Property label={NS.argu('trashedAt')} />
          <CardMain data-test="Thing-thing">
            <DetailsBar
              right={(
                <React.Fragment>
                  <Property label={NS.argu('followMenu')} />
                  <Property label={NS.argu('shareMenu')} />
                  <Property label={NS.argu('actionsMenu')} />
                </React.Fragment>
              )}
            >
              <Property label={NS.rdf('type')} />
              <Property label={NS.schema('creator')} />
              <Property label={NS.schema('dateCreated')} />
              <Property label={NS.schema('location')} />
              <Property label={NS.argu('expiresAt')} />
              <Property label={NS.argu('pinnedAt')} />
            </DetailsBar>
            <CardContent noSpacing>
              <Property label={[NS.schema('name'), NS.rdfs('label')]} />
              <Property label={[NS.dbo('thumbnail'), NS.wdt('P18')]} />
              <Property label={[NS.schema('text'), NS.schema('description'), NS.dbo('abstract')]} />
            </CardContent>
            <Property label={NS.argu('attachments')} />
            <Property label={NS.meeting('attachment')} />
            <Property label={NS.argu('voteableVoteEvent')} />
            <CardAppendix>
              <Property forceRender label={NS.app('omniform')} />
            </CardAppendix>
          </CardMain>
          <Property label={NS.argu('blogPosts')} />
        </Container>
        <Container size="large">
          <Property forceRender label={NS.argu('arguments')} />
        </Container>
        <Container>
          <Property label={NS.schema('comments')} />
          <Property clickToOpen forceRender label={NS.app('omniform')} />
        </Container>
      </PrimaryResource>
    );
  }
}

export default register(MotionPage);
