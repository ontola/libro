import schema from '@ontologies/schema';
import {
  Property,
  Resource,
  linkType,
  lrsType,
} from 'link-redux';
import React from 'react';

import ScrollContainer from '../../../components/ScrollContainer';
import qb from '../../../ontology/qb';
import { tryParseInt } from '../../../helpers/numbers';
import Card from '../../../topologies/Card';
import Container from '../../../topologies/Container';
import { fullResourceTopology } from '../../../topologies/FullResource';
import Table from '../../../topologies/Table';
import TableBody from '../../../topologies/TableBody';
import TableHead from '../../../topologies/TableHead';
import TableRow from '../../../topologies/TableRow';

const orderComponents = (components, lrs) => components
  .sort((a, b) => {
    const aOrder = tryParseInt(lrs.getResourceProperty(a, qb.order));
    const bOrder = tryParseInt(lrs.getResourceProperty(b, qb.order));

    if (aOrder < bOrder) return -1;
    if (aOrder > bOrder) return 1;

    return 0;
  });

const DataSetFull = ({
  lrs,
  structure,
}) => {
  const components = lrs.getResourceProperties(structure, qb.component);
  const orderedComponents = orderComponents(components, lrs);
  const orderedMeasures = orderedComponents
    .map((comp) => lrs.getResourceProperty(comp, qb.measure));

  return (
    <Container size="large">
      <Property
        label={schema.name}
        topology={fullResourceTopology}
      />
      <Card>
        <ScrollContainer>
          <Table>
            <TableHead>
              <TableRow>
                {orderedComponents.map((component) => (
                  <Resource
                    key={component.value}
                    subject={component}
                  />
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <Property
                label={qb.observation}
                limit={Infinity}
                measures={orderedMeasures}
              />
            </TableBody>
          </Table>
        </ScrollContainer>
      </Card>
    </Container>
  );
};

DataSetFull.type = qb.DataSet;

DataSetFull.topology = fullResourceTopology;

DataSetFull.mapDataToProps = {
  structure: qb.structure,
};

DataSetFull.propTypes = {
  lrs: lrsType,
  structure: linkType,
};

export default DataSetFull;
