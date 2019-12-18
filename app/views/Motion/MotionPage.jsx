import rdfx from '@ontologies/rdf';
import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import {
  CardContent,
  LinkedDetailDate,
} from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import argu from '../../ontology/argu';
import meeting from '../../ontology/meeting';
import ontola from '../../ontology/ontola';
import CardAppendix from '../../topologies/Card/CardAppendix';
import CardMain from '../../topologies/Card/CardMain';
import CardRow from '../../topologies/Card/CardRow';
import Container from '../../topologies/Container';
import DetailsBar from '../../topologies/DetailsBar';
import { pageTopology } from '../../topologies/Page';
import PrimaryResource from '../../topologies/PrimaryResource';

class MotionPage extends React.PureComponent {
  static type = [NS.argu('Motion'), NS.opengov('Motion')];

  static topology = pageTopology;

  render() {
    return (
      <PrimaryResource>
        <Property label={ontola.coverPhoto} />
        <Container>
          <Property label={schema.isPartOf} />
          <Property label={argu.trashedAt} />
          <CardMain data-test="Thing-thing">
            <DetailsBar
              right={(
                <React.Fragment>
                  <Property label={ontola.followMenu} />
                  <Property label={ontola.shareMenu} />
                  <Property label={ontola.actionsMenu} />
                </React.Fragment>
              )}
            >
              <Property label={schema.creator} />
              <Property label={rdfx.type} />
              <LinkedDetailDate />
              <Property label={argu.pinnedAt} />
              <Property label={argu.expiresAt} />
              <Property label={argu.followsCount} />
              <Property label={argu.motionsCount} />
              <Property label={schema.location} />
              <Property label={argu.grantedGroups} />
            </DetailsBar>
            <CardContent noSpacing>
              <Property label={[schema.name, rdfs.label]} />
              <Property label={[NS.dbo('thumbnail'), NS.wdt('P18')]} />
              <Property label={[schema.text, schema.description, NS.dbo('abstract')]} />
            </CardContent>
            <CardRow noBorder>
              <Property label={argu.attachments} onLoad={() => null} />
              <Property label={meeting.attachment} onLoad={() => null} />
            </CardRow>
            <Property label={argu.voteableVoteEvent} onLoad={() => null} />
            <CardAppendix>
              <Property forceRender label={NS.app('omniform')} />
            </CardAppendix>
          </CardMain>
          <Property label={ontola.publishAction} onLoad={() => null} />
          <Property label={argu.decision} onLoad={() => null} />
          <Property label={argu.blogPosts} onLoad={() => null} />
          <Property label={schema.location} onLoad={() => null} />
        </Container>
        <Container size="large">
          <Property forceRender label={argu.arguments} />
        </Container>
        <Container>
          <Property label={schema.comment} />
        </Container>
      </PrimaryResource>
    );
  }
}

export default register(MotionPage);
