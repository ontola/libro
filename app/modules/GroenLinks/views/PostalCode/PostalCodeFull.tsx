import * as schema from '@ontologies/schema';
import { OK } from 'http-status-codes';
import { SomeNode } from 'link-lib';
import {
  Property,
  register,
  useGlobalIds,
  useLRS,
} from 'link-redux';
import React from 'react';

import AttributeListItem from '../../../../components/AttributeListItem';
import CardContent from '../../../../components/Card/CardContent';
import TabbarProvider from '../../../../components/TabbarProvider';
import app from '../../../../ontology/app';
import ontola from '../../../../ontology/ontola';
import teamGL from '../../../../ontology/teamGL';
import AttributeList from '../../../../topologies/AttributeList';
import CardMain from '../../../../topologies/Card/CardMain';
import Container from '../../../../topologies/Container';
import { fullResourceTopology } from '../../../../topologies/FullResource';

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

const PostalCodeFull = () => {
  const [tabsMenu] = useGlobalIds(ontola.tabsMenu);

  return (
    <TabbarProvider menu={tabsMenu}>
      <Container>
        <Property label={schema.isPartOf} />
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
          <Property
            forceRender
            label={app.menuTabs}
          />
        </CardMain>
      </Container>
      <Property
        forceRender
        label={app.currentTab}
      />
    </TabbarProvider>
  );
};

PostalCodeFull.type = teamGL.PostalCode;

PostalCodeFull.topology = fullResourceTopology;

export default register(PostalCodeFull);
