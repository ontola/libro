import {
  LinkedResourceContainer,
  linkType,
  register,
  topologyType,
} from 'link-redux';
import PropTypes from 'prop-types';
import { NamedNode } from 'rdflib';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import Card from '../../../topologies/Card';
import CardAppendix from '../../../topologies/Card/CardAppendix';
import Container, { containerTopology } from '../../../topologies/Container';
import Grid from '../../../topologies/Grid';
import Table from '../../../topologies/Table';
import TableFooter from '../../../topologies/TableFooter';
import TableFooterCell from '../../../topologies/TableFooterCell';
import TableFooterRow from '../../../topologies/TableFooterRow';
import TableHead from '../../../topologies/TableHead';
import TableHeaderRow from '../../../topologies/TableHeaderRow';
import { allTopologiesExcept } from '../../../topologies';
import { CollectionTypes } from '../types';

const getFrame = (Wrapper, topology) => {
  const collectionFrame = ({
    body,
    collectionDisplay,
    columns,
    pagination,
  }) => {
    switch (collectionDisplay) {
      case NS.ontola('collectionDisplay/grid'):
        return (
          <React.Fragment>
            <Grid>
              {body}
            </Grid>
            {pagination}
          </React.Fragment>
        );
      case NS.ontola('collectionDisplay/settingsTable'):
      case NS.ontola('collectionDisplay/table'):
        return (
          <Card>
            <Table>
              <TableHead>
                <TableHeaderRow>
                  {columns.map(property => (
                    <LinkedResourceContainer
                      forceRender
                      key={property.value}
                      subject={property}
                    />
                  ))}
                </TableHeaderRow>
              </TableHead>
              <tbody>
                {body}
              </tbody>
              <TableFooter>
                <TableFooterRow>
                  <TableFooterCell>
                    {pagination}
                  </TableFooterCell>
                </TableFooterRow>
              </TableFooter>
            </Table>
          </Card>
        );
      case NS.ontola('collectionDisplay/card'):
        return (
          <Card>
            {body}
            <CardAppendix>
              {pagination}
            </CardAppendix>
          </Card>
        );
      case NS.ontola('collectionDisplay/default'):
        return (
          <Wrapper>
            {body}
            <div style={{ marginBottom: '1em' }}>
              {pagination}
            </div>
          </Wrapper>
        );
      default:
        return body;
    }
  };

  collectionFrame.type = [...CollectionTypes, NS.argu('SearchResult')];

  collectionFrame.topology = topology;

  collectionFrame.property = NS.ontola('collectionFrame');

  collectionFrame.mapDataToProps = [NS.ontola('collectionDisplay')];

  collectionFrame.propTypes = {
    body: PropTypes.node,
    collectionDisplay: linkType,
    columns: PropTypes.arrayOf(NamedNode),
    pagination: PropTypes.node,
    topology: topologyType,
  };

  return collectionFrame;
};

export default [
  register(getFrame(Container, allTopologiesExcept(containerTopology))),
  register(getFrame(React.Fragment, containerTopology)),
];
