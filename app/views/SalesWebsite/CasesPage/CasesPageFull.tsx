import * as as from '@ontologies/as';
import { Node } from '@ontologies/core';
import * as rdfs from '@ontologies/rdfs';
import {
  FC,
  Property,
  Resource,
  register,
  useProperty,
  useResourceProperty,
} from 'link-redux';
import React from 'react';

import sales from '../../../ontology/sales';
import { withSalesTheme } from '../../../themes/salesWebsite/SalesThemeProvider';
import Container from '../../../topologies/Container';
import { fullResourceTopology } from '../../../topologies/FullResource';
import Grid from '../../../topologies/Grid';

const CasesPageFull: FC = () => {
  const [itemsList] = useProperty(as.items) as Node[];
  const items = useResourceProperty(itemsList, rdfs.member);

  return (
    <div>
      <Property label={sales.header} />
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
