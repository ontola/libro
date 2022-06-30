import * as foaf from '@ontologies/foaf';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import dbo from '../../../../ontology/dbo';
import meeting from '../../../../ontology/meeting';
import ActionsBar from '../../../Action/topologies/ActionsBar';
import { PageHeader } from '../../../Common/components/PageHeader';
import SubSection from '../../../Common/components/SubSection';
import { fullResourceTopology } from '../../../Common/topologies/FullResource';
import MainBody from '../../../Common/topologies/MainBody';
import { tabPaneTopology } from '../../../Common/topologies/TabPane';
import { LoadingHidden } from '../../../Core/components/Loading';
import app from '../../../Core/ontology/app';
import ontola from '../../../Core/ontology/ontola';
import argu from '../../lib/argu';

const ShopFull: FC = (): JSX.Element => (
  <React.Fragment>
    <MainBody data-test="Thing-thing">
      <Property label={argu.trashedAt} />
      <Property
        label={ontola.publishAction}
        onLoad={LoadingHidden}
      />
      <PageHeader />
      <Property label={[schema.text, schema.description, dbo.abstract]} />
      <Property label={app.contents} />
      <Property label={foaf.isPrimaryTopicOf} />
      <Property
        label={[argu.attachments, meeting.attachment]}
        onLoad={LoadingHidden}
      />
      <ActionsBar>
        <Property label={ontola.favoriteAction} />
      </ActionsBar>
      <Property
        withoutLoading
        label={schema.location}
      />
    </MainBody>
    <SubSection />
    <Property label={argu.cart} />
  </React.Fragment>
);

ShopFull.type = argu.Shop;

ShopFull.topology = [
  fullResourceTopology,
  tabPaneTopology,
];

export default register(ShopFull);
