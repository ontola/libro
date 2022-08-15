import * as foaf from '@ontologies/foaf';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import meeting from '../../../../ontology/meeting';
import ActionsBar from '../../../Action/topologies/ActionsBar';
import argu from '../../../Argu/ontology/argu';
import { PageHeader } from '../../components/PageHeader';
import ResourceBoundary from '../../components/ResourceBoundary';
import SubSection from '../../components/SubSection';
import { contentsProps, thumbnailProps } from '../../ontology/app';
import ontola from '../../../Kernel/ontology/ontola';
import { fullResourceTopology } from '../../topologies';
import MainBody from '../../topologies/MainBody';

const ThingFull: FC = () => (
  <ResourceBoundary>
    <MainBody data-test="Thing-thing">
      <Property label={argu.trashedAt} />
      <Property
        label={ontola.publishAction}
        onLoad={() => null}
      />
      <PageHeader />
      <Property label={thumbnailProps} />
      <Property label={contentsProps} />
      <Property
        label={foaf.isPrimaryTopicOf}
        onLoad={() => null}
      />
      <Property
        label={[argu.attachments, meeting.attachment]}
        onLoad={() => null}
      />
      <ActionsBar>
        <Property
          label={ontola.favoriteAction}
          onLoad={() => null}
        />
      </ActionsBar>
      <Property
        label={[argu.mapQuestion, schema.location]}
        onLoad={() => null}
      />
      <Property label={argu.blogPosts} />
    </MainBody>
    <SubSection />
  </ResourceBoundary>
);

ThingFull.type = schema.Thing;

ThingFull.topology = fullResourceTopology;

export default register(ThingFull);
