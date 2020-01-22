import schema from '@ontologies/schema';
import {
  Property,
  Resource,
  linkType,
  lrsType,
  subjectType,
} from 'link-redux';
import React from 'react';

import ScrollContainer from '../../../components/ScrollContainer';
import qb from '../../../ontology/qb';
import { tryParseInt } from '../../../helpers/numbers';
import Card from '../../../topologies/Card';
import Container from '../../../topologies/Container';
import { pageTopology } from '../../../topologies/Page';
import PrimaryResource, { primaryResourceTopology } from '../../../topologies/PrimaryResource';
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

const DataSetPage = ({
  lrs,
  structure,
  subject,
}) => {
  const components = lrs.getResourceProperties(structure, qb.component);
  const orderedComponents = orderComponents(components, lrs);
  const orderedMeasures = orderedComponents
    .map((comp) => lrs.getResourceProperty(comp, qb.measure));

  return (
    <PrimaryResource resource={subject.value}>
      <Container size="large">
        <Property
          label={schema.name}
          topology={primaryResourceTopology}
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
    </PrimaryResource>
  );
};

DataSetPage.type = qb.DataSet;

DataSetPage.topology = pageTopology;

DataSetPage.mapDataToProps = {
  structure: qb.structure,
};

DataSetPage.propTypes = {
  lrs: lrsType,
  structure: linkType,
  subject: subjectType,
};

export default DataSetPage;
