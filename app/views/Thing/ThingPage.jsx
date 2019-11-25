import foaf from '@ontologies/foaf';
import rdfx from '@ontologies/rdf';
import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
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
  static type = schema.Thing;

  static topology = pageTopology;

  render() {
    return (
      <PrimaryResource>
        <Property label={NS.ontola('coverPhoto')} onLoad={() => null} />
        <Container>
          <Property label={schema.isPartOf} />
          <Property label={NS.argu('trashedAt')} />
          <CardMain data-test="Thing-thing">
            <Property label={schema.superEvent} />
            <DetailsBar
              right={(
                <React.Fragment>
                  <Property label={NS.ontola('followMenu')} />
                  <Property label={NS.ontola('shareMenu')} />
                  <Property label={NS.ontola('actionsMenu')} />
                </React.Fragment>
              )}
            >
              <Property label={schema.creator} />
              <Property label={rdfx.type} />
              <LinkedDetailDate />
              <Property label={NS.argu('pinnedAt')} />
              <Property label={NS.argu('expiresAt')} />
              <Property label={NS.argu('followsCount')} />
              <Property label={NS.argu('motionsCount')} />
              <Property label={schema.location} />
              <Property label={NS.argu('grantedGroups')} />
            </DetailsBar>
            <CardContent noSpacing>
              <Property label={[schema.name, rdfs.label]} />
              <Property label={[NS.dbo('thumbnail'), NS.wdt('P18')]} />
              <Property label={[schema.text, schema.description, NS.dbo('abstract')]} />
              <Property label={foaf.isPrimaryTopicOf} onLoad={() => null} />
              <Property label={NS.meeting('attachment')} onLoad={() => null} />
              <Property label={NS.argu('attachments')} onLoad={() => null} />
            </CardContent>
            <ActionsBar>
              <Property label={NS.ontola('favoriteAction')} onLoad={() => null} />
            </ActionsBar>
            <Property label={NS.meeting('agenda')} onLoad={() => null} />
            <CardAppendix>
              <Property forceRender label={NS.app('omniform')} />
            </CardAppendix>
          </CardMain>
          <Property label={NS.ontola('publishAction')} onLoad={() => null} />
          <Property label={NS.argu('voteEvents')} onLoad={() => null} />
          <Property label={NS.argu('blogPosts')} onLoad={() => null} />
          <Property label={schema.location} onLoad={() => null} />
          <Property label={NS.argu('motions')} onLoad={() => null} />
        </Container>
        <Container size="large">
          <Property forceRender label={NS.argu('arguments')} />
        </Container>
        <Container>
          <Property label={schema.comment} />
        </Container>
      </PrimaryResource>
    );
  }
}

export default register(ThingPage);
