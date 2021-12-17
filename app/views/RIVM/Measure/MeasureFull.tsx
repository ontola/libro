import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import AttributeListItem from '../../../components/AttributeListItem';
import CardContent from '../../../components/Card/CardContent';
import LinkedDetailDate from '../../../components/LinkedDetailDate';
import { LoadingHidden } from '../../../components/Loading';
import argu from '../../../ontology/argu';
import dbo from '../../../ontology/dbo';
import ontola from '../../../ontology/ontola';
import rivm from '../../../ontology/rivm';
import ActionsBar from '../../../topologies/ActionsBar';
import AttributeList from '../../../topologies/AttributeList';
import CardMain from '../../../topologies/Card/CardMain';
import CardRow from '../../../topologies/Card/CardRow';
import Container from '../../../topologies/Container';
import DetailsBar from '../../../topologies/DetailsBar';
import { fullResourceTopology } from '../../../topologies/FullResource';
import { defaultMenus } from '../../common';

const MeasureFull: FC = () => (
  <React.Fragment>
    <Container>
      <Property label={argu.trashedAt} />
      <Property
        label={ontola.publishAction}
        onLoad={LoadingHidden}
      />
      <CardMain>
        <DetailsBar right={defaultMenus}>
          <Property label={rdfx.type} />
          <Property label={schema.creator} />
          <LinkedDetailDate />
          <Property label={argu.pinnedAt} />
          <Property label={argu.expiresAt} />
          <Property label={schema.location} />
        </DetailsBar>
        <CardContent noSpacing>
          <Property label={[schema.name, rdfs.label]} />
          <Property label={[schema.text, schema.description, dbo.abstract]} />
          <AttributeList>
            <AttributeListItem
              label={rivm.phases}
              propertyLabel="Fases"
            />
            <AttributeListItem
              label={rivm.categories}
              propertyLabel="Categorieën"
            />
            <AttributeListItem label={rivm.secondOpinionBy} />
            <AttributeListItem label={rivm.measureOwner} />
            <AttributeListItem label={rivm.contactInfo} />
            <AttributeListItem label={rivm.moreInfo} />
            <AttributeListItem label={rivm.attachmentPublicationDate} />
          </AttributeList>
        </CardContent>
        <CardRow>
          <Property
            label={argu.attachments}
            onLoad={LoadingHidden}
          />
        </CardRow>
        <ActionsBar>
          <Property
            label={ontola.favoriteAction}
            onLoad={LoadingHidden}
          />
        </ActionsBar>
      </CardMain>
    </Container>
    <Container>
      <Property label={schema.comment} />
    </Container>
  </React.Fragment>
);

MeasureFull.type = rivm.Measure;

MeasureFull.topology = fullResourceTopology;

export default register(MeasureFull);
