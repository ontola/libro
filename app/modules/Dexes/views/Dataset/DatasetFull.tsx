import * as dcterms from '@ontologies/dcterms';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  Resource,
  register,
} from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import dcat from '../../ontology/dcat';
import dexes from '../../ontology/dexes';
import { fullResourceTopology } from '../../../../topologies';
import AttributeList from '../../../../topologies/AttributeList';
import CardMain from '../../../../topologies/Card/CardMain';
import Container from '../../../../topologies/Container';
import DetailsBar from '../../../../topologies/DetailsBar';
import AllWithProperty from '../../../Common/components/AllWithProperty';
import AttributeListItem from '../../../Common/components/AttributeListItem';
import Button from '../../../Common/components/Button';
import CardContent from '../../../Common/components/Card/CardContent';
import Heading from '../../../Common/components/Heading';
import LinkedDetailDate from '../../../Common/components/LinkedDetailDate';
import { defaultMenus } from '../../../Common/lib/viewHelpers';
import { messages } from '../messages';

const DatasetFull: FC = ({
  subject,
}) => (
  <Container>
    <CardMain>
      <DetailsBar right={[defaultMenus]}>
        <Property label={schema.creator} />
        <Property label={rdfx.type} />
        <LinkedDetailDate />
      </DetailsBar>
      <CardContent>
        <Property label={dcterms.title} />
        <Property label={dcterms.description} />
      </CardContent>
      <CardContent>
        <AttributeList>
          <AttributeListItem label={dcterms.license} />
          <AttributeListItem label={dcat.theme} />
        </AttributeList>
        <div>
          <Button
            href={`https://dexes.eu/resolve?uri=${encodeURIComponent(subject.value)}`}
            icon="external-link"
          >
            <FormattedMessage {...messages.showInDexes} />
          </Button>
        </div>
      </CardContent>
      <CardContent noSpacing>
        <Heading>
          <Resource subject={dcat.distribution} />
        </Heading>
      </CardContent>
      <AllWithProperty label={dcat.distribution} />
    </CardMain>
  </Container>
);

DatasetFull.type = dexes.Dataset;

DatasetFull.topology = fullResourceTopology;

export default register(DatasetFull);
