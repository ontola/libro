import * as schema from '@ontologies/schema';
import { OK } from 'http-status-codes';
import { SomeNode } from 'link-lib';
import {
  Property,
  register,
  useLRS,
} from 'link-redux';
import React from 'react';

import teamGL from '../../ontology/teamGL';
import { fullResourceTopology } from '../../../../topologies';
import AttributeList from '../../../../topologies/AttributeList';
import CardMain from '../../../../topologies/Card/CardMain';
import Container from '../../../../topologies/Container';
import AttributeListItem from '../../../Common/components/AttributeListItem';
import CardContent from '../../../Common/components/Card/CardContent';

export const usePartialResourceCheck = (subject: SomeNode): boolean => {
  const lrs = useLRS();
  const partal = lrs.getStatus(subject).status !== OK;

  React.useEffect(() => {
    if (partal) {
      lrs.api.invalidate(subject);
    }
  }, [subject]);

  return partal;
};

const PostalCodeFull = () => (
  <React.Fragment>
    <Container>
      <CardMain>
        <CardContent noSpacing>
          <Property label={schema.name} />
          <p>
            In onze campagne gaan we in heel Nederland langs de deuren.
            Kijk hieronder welke straten de meeste potentie hebben voor ons,
            kies een adres en sla de uitkomst van je gesprek op!
          </p>
          <AttributeList fullLabel>
            <AttributeListItem label={teamGL.doors} />
            <AttributeListItem label={teamGL.volunteers} />
            <AttributeListItem label={teamGL.active} />
          </AttributeList>
        </CardContent>
      </CardMain>
    </Container>
    <Property label={teamGL.streets} />
  </React.Fragment>
);

PostalCodeFull.type = teamGL.PostalCode;

PostalCodeFull.topology = fullResourceTopology;

export default register(PostalCodeFull);
