import { Literal, NamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  FC,
  Property,
  Resource,
  register,
  useResourceLinks,
  useResourceProperty,
} from 'link-redux';
import React from 'react';

import HeaderWithMenu from '../../../components/HeaderWithMenu';
import ScrollContainer from '../../../components/ScrollContainer';
import { tryParseInt } from '../../../helpers/numbers';
import qb from '../../../ontology/qb';
import Card from '../../../topologies/Card';
import { containerTopology } from '../../../topologies/Container';
import Table from '../../../topologies/Table';
import TableBody from '../../../topologies/TableBody';
import TableHead from '../../../topologies/TableHead';
import TableRow from '../../../topologies/TableRow';

export interface DataSetContainerProps {
  structure: SomeNode;
}

interface Component {
  measure: SomeNode;
  order: Literal;
  subject: SomeNode;
}

const orderComponents = (components: Component[]) => components
  .sort((a, b) => {
    const aOrder = tryParseInt(a.order);
    const bOrder = tryParseInt(b.order);

    if (!aOrder || !bOrder) return 0;
    if (aOrder < bOrder) return -1;
    if (aOrder > bOrder) return 1;

    return 0;
  });

const DataSetContainer: FC<DataSetContainerProps> = ({ structure }) => {
  const componentIRIs = useResourceProperty(structure, qb.component) as NamedNode[];
  const components = useResourceLinks(componentIRIs, {
    measure: qb.measure,
    order: qb.order,
  }) as Component[];
  const orderedComponents = orderComponents(components);
  const orderedMeasures = orderedComponents.map(({ measure }) => measure).filter(Boolean);

  return (
    <ScrollContainer>
      <HeaderWithMenu
        noMargin
        menu={<Property label={schema.downloadUrl} />}
      >
        <Property label={schema.name} />
      </HeaderWithMenu>
      <Card>
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
      </Card>
    </ScrollContainer>
  );
};

DataSetContainer.type = qb.DataSet;

DataSetContainer.topology = [containerTopology];

DataSetContainer.mapDataToProps = {
  structure: qb.structure,
};

export default register(DataSetContainer);
