import { Literal } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  Property,
  Resource,
  dig,
  register,
  useIds,
  useResourceLinks,
} from 'link-redux';
import React from 'react';

import qb from '../../../../../ontology/qb';
import { alertDialogTopology, containerTopology } from '../../../../../topologies';
import Card from '../../../../../topologies/Card';
import Table from '../../../../../topologies/Table';
import TableBody from '../../../../../topologies/TableBody';
import TableHead from '../../../../../topologies/TableHead';
import TableRow from '../../../../../topologies/TableRow';
import AllWithProperty from '../../../../Common/components/AllWithProperty';
import HeaderWithMenu from '../../../../Common/components/HeaderWithMenu';
import ScrollContainer from '../../../../Common/components/ScrollContainer';
import { tryParseInt } from '../../../../Common/lib/numbers';

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

const DataSetContainer = () => {
  const componentIRIs = useIds(dig(qb.structure, qb.component));
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
            <AllWithProperty
              label={qb.observation}
              measures={orderedMeasures}
            />
          </TableBody>
        </Table>
      </Card>
    </ScrollContainer>
  );
};

DataSetContainer.type = qb.DataSet;

DataSetContainer.topology = [
  alertDialogTopology,
  containerTopology,
];

export default register(DataSetContainer);