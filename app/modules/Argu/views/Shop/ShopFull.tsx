import * as foaf from '@ontologies/foaf';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import app from '../../../../ontology/app';
import argu from '../../ontology/argu';
import dbo from '../../../../ontology/dbo';
import meeting from '../../../../ontology/meeting';
import ontola from '../../../../ontology/ontola';
import { fullResourceTopology, tabPaneTopology } from '../../../../topologies';
import ActionsBar from '../../../../topologies/ActionsBar';
import MainBody from '../../../../topologies/MainBody';
import { PageHeader } from '../../../Common/components/PageHeader';
import SubSection from '../../../Common/components/SubSection';
import { LoadingHidden } from '../../../Core/components/Loading';

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
