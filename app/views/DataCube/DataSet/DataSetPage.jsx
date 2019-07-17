import {
  LinkedResourceContainer,
  Property,
  linkType,
  lrsType,
  subjectType,
} from 'link-redux';
import React from 'react';

import ScrollContainer from '../../../components/ScrollContainer';
import { NS } from '../../../helpers/LinkedRenderStore';
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
    const aOrder = tryParseInt(lrs.getResourceProperty(a, NS.qb('order')));
    const bOrder = tryParseInt(lrs.getResourceProperty(b, NS.qb('order')));

    if (aOrder < bOrder) return -1;
    if (aOrder > bOrder) return 1;

    return 0;
  });

const DataSetPage = ({
  lrs,
  structure,
  subject,
}) => {
  const components = lrs.getResourceProperties(structure, NS.qb('component'));
  const orderedComponents = orderComponents(components, lrs);
  const orderedMeasures = orderedComponents.map(comp => lrs.getResourceProperty(comp, NS.qb('measure')));

  return (
    <PrimaryResource resource={subject.value}>
      <Container size="large">
        <Property
          label={NS.schema('name')}
          topology={primaryResourceTopology}
        />
        <Card>
          <ScrollContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {orderedComponents.map(component => (
                    <LinkedResourceContainer
                      key={component.value}
                      subject={component}
                    />
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <Property
                  label={NS.qb('observation')}
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

DataSetPage.type = NS.qb('DataSet');

DataSetPage.topology = pageTopology;

DataSetPage.mapDataToProps = [
  NS.qb('structure'),
];

DataSetPage.propTypes = {
  lrs: lrsType,
  structure: linkType,
  subject: subjectType,
};

export default DataSetPage;
