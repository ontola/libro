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

import AttributeListItem from '../../../components/AttributeListItem';
import Button from '../../../components/Button';
import CardContent from '../../../components/Card/CardContent';
import Heading from '../../../components/Heading';
import LinkedDetailDate from '../../../components/LinkedDetailDate';
import dcat from '../../../ontology/dcat';
import dexes from '../../../ontology/dexes';
import AttributeList from '../../../topologies/AttributeList';
import CardMain from '../../../topologies/Card/CardMain';
import Container from '../../../topologies/Container';
import DetailsBar from '../../../topologies/DetailsBar';
import { fullResourceTopology } from '../../../topologies/FullResource';
import { defaultMenus } from '../../common';
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
      <Property
        label={dcat.distribution}
        limit={Infinity}
      />
    </CardMain>
  </Container>
);

DatasetFull.type = dexes.Dataset;

DatasetFull.topology = fullResourceTopology;

export default register(DatasetFull);