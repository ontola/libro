import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import HeaderWithMenu from '../../components/HeaderWithMenu';
import argu from '../../ontology/argu';
import { CardMain } from '../../topologies/Card';
import ContentDetails from '../../topologies/ContentDetails';
import {
  PageHeaderImageAndTextWrapper,
  PageHeaderText,
  pageHeaderTopology,
} from '../../topologies/PageHeader';
import { defaultMenus } from '../common';

const ThingPageHeader: FC = ({ subject }) => (
  <div about={subject?.value} className="ThingPageHeader">
    <CardMain>
      <CardContent>
        <PageHeaderImageAndTextWrapper>
          <PageHeaderText>
            <HeaderWithMenu menu={defaultMenus}>
              <Property label={schema.name} />
            </HeaderWithMenu>
            <ContentDetails>
              <Property label={argu.grantedGroups} />
            </ContentDetails>
            <Property label={[schema.description, schema.text]} />
          </PageHeaderText>
        </PageHeaderImageAndTextWrapper>
      </CardContent>
    </CardMain>
  </div>
);

ThingPageHeader.type = schema.Thing;

ThingPageHeader.topology = pageHeaderTopology;

export default register(ThingPageHeader);
