import * as as from '@ontologies/as';
import { Node } from '@ontologies/core';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  FC,
  Resource,
  register,
  useProperty,
  useResourceProperty,
} from 'link-redux';
import React from 'react';

import { Header } from '../../../components/SalesWebsite';
import sales from '../../../ontology/sales';
import { withSalesTheme } from '../../../themes/salesWebsite/SalesThemeProvider';
import Container from '../../../topologies/Container';
import { fullResourceTopology } from '../../../topologies/FullResource';
import Grid from '../../../topologies/Grid';

const CasesPageFull: FC = () => {
  const [backgroundImage] = useProperty(sales.backgroundImage);
  const [backgroundImageMobile] = useProperty(sales.backgroundImageMobile);
  const [name] = useProperty(schema.name);
  const [itemsList] = useProperty(as.items) as Node[];
  const items = useResourceProperty(itemsList, rdfs.member);

  return (
    <div>
      <Header
        backgroundImageUrl={backgroundImage.value}
        backgroundImageUrlMobile={backgroundImageMobile.value}
        title={name.value}
      />
      <Container>
        <Grid
          container
          direction="row"
          justify="center"
        >
          {items.map((iri) => (
            <Grid item key={iri.value}>
              <Resource subject={iri} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

CasesPageFull.type = sales.CasesPage;

CasesPageFull.topology = fullResourceTopology;

CasesPageFull.hocs = [withSalesTheme];

export default register(CasesPageFull);
