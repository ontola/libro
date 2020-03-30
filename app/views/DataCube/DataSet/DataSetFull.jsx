import schema from '@ontologies/schema';
import {
  Property,
  Resource,
  linkType,
  useResourceLinks,
  useResourceProperty,
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

const orderComponents = (components) => components
  .sort((a, b) => {
    const aOrder = tryParseInt(a.order);
    const bOrder = tryParseInt(b.order);

    if (aOrder < bOrder) return -1;
    if (aOrder > bOrder) return 1;

    return 0;
  });

const DataSetFull = ({ structure }) => {
  const componentIRIs = useResourceProperty(structure, qb.component);
  const components = useResourceLinks(componentIRIs, {
    measure: qb.measure,
    order: qb.order,
  });
  const orderedComponents = orderComponents(components);
  const orderedMeasures = orderedComponents.map(({ measure }) => measure).filter(Boolean);

  return (
    <Container size="large">
      <Property label={schema.isPartOf} />
      <Property
        label={schema.name}
        topology={fullResourceTopology}
      />
      <Card>
        <ScrollContainer>
          <Table>
            <TableHead>
              <TableRow>
                {orderedComponents.map(({ subject: component }) => (
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
  structure: linkType,
};

export default DataSetFull;
