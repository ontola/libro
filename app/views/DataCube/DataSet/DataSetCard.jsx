import * as schema from '@ontologies/schema';
import {
  Property,
  Resource,
  linkType,
  useResourceLinks,
  useResourceProperty,
} from 'link-redux';
import React from 'react';

import CardHeader from '../../../components/Card/CardHeader';
import ScrollContainer from '../../../components/ScrollContainer';
import { tryParseInt } from '../../../helpers/numbers';
import qb from '../../../ontology/qb';
import { cardTopology } from '../../../topologies/Card';
import { cardMainTopology } from '../../../topologies/Card/CardMain';
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

const DataSetCard = ({ structure }) => {
  const componentIRIs = useResourceProperty(structure, qb.component);
  const components = useResourceLinks(componentIRIs, {
    measure: qb.measure,
    order: qb.order,
  });
  const orderedComponents = orderComponents(components);
  const orderedMeasures = orderedComponents.map(({ measure }) => measure).filter(Boolean);

  return (
    <React.Fragment>
      <CardHeader float={<Property label={schema.downloadUrl} />}>
        <Property label={schema.name} />
      </CardHeader>
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
    </React.Fragment>
  );
};

DataSetCard.type = qb.DataSet;

DataSetCard.topology = [cardTopology, cardMainTopology];

DataSetCard.mapDataToProps = {
  structure: qb.structure,
};

DataSetCard.propTypes = {
  structure: linkType,
};

export default DataSetCard;
