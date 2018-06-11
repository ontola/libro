import LinkedRenderStore from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import {
  CardContent,
  CardMain,
  CardMenuFloater,
  Container,
  DetailsBar,
} from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';

const MotionPage = () => (
  <div>
    <Property label={NS.argu('coverPhoto')} />
    <Container>
      <Property label={NS.schema('isPartOf')} />
      <Property label={NS.argu('trashedAt')} />
      <CardMain data-test="Thing-thing">
        <CardContent noSpacing>
          <CardMenuFloater
            header={<Property label={[NS.schema('name'), NS.rdfs('label')]} />}
          >
            <Property label={NS.argu('followMenu')} />
            <Property label={NS.argu('shareMenu')} />
            <Property label={NS.argu('actionsMenu')} />
          </CardMenuFloater>
          <DetailsBar>
            <Property label={NS.schema('creator')} />
            <Property label={NS.schema('dateCreated')} />
          </DetailsBar>
          <Property label={[NS.dbo('thumbnail'), NS.wdt('P18')]} />
          <Property label={[NS.schema('text'), NS.schema('description'), NS.dbo('abstract')]} />
        </CardContent>
        <Property label={NS.argu('attachments')} />
        <Property label={NS.council('attachment')} />
        <Property label={NS.argu('voteableVoteEvent')} />
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
  </div>
);

export default LinkedRenderStore.registerRenderer(MotionPage, NS.argu('Motion'));
