import RDFTypes from '@rdfdev/prop-types';
import rdf from '@ontologies/core';
import {
  Resource,
  linkType,
  register,
  topologyType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import argu from '../../../ontology/argu';
import ontola from '../../../ontology/ontola';
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
    collectionDisplayFromData,
    columns,
    pagination,
  }) => {
    switch (rdf.id(collectionDisplay || collectionDisplayFromData)) {
      case rdf.id(NS.ontola('collectionDisplay/grid')):
        return (
          <React.Fragment>
            <Grid>
              {body}
            </Grid>
            {pagination}
          </React.Fragment>
        );
      case rdf.id(NS.ontola('collectionDisplay/settingsTable')):
      case rdf.id(NS.ontola('collectionDisplay/table')):
        return (
          <Card>
            <Table>
              <TableHead>
                <TableHeaderRow>
                  {columns.map((property) => (
                    <Resource
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
                  <TableFooterCell colSpan={columns.length}>
                    {pagination}
                  </TableFooterCell>
                </TableFooterRow>
              </TableFooter>
            </Table>
          </Card>
        );
      case rdf.id(NS.ontola('collectionDisplay/card')):
        return (
          <Card>
            {body}
            <CardAppendix>
              {pagination}
            </CardAppendix>
          </Card>
        );
      case rdf.id(NS.ontola('collectionDisplay/default')):
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

  collectionFrame.type = [...CollectionTypes, argu.SearchResult];

  collectionFrame.topology = topology;

  collectionFrame.property = ontola.collectionFrame;

  collectionFrame.mapDataToProps = {
    collectionDisplayFromData: ontola.collectionDisplay,
  };

  collectionFrame.propTypes = {
    body: PropTypes.node,
    collectionDisplay: linkType,
    collectionDisplayFromData: linkType,
    columns: PropTypes.arrayOf(RDFTypes.namedNode),
    pagination: PropTypes.node,
    topology: topologyType,
  };

  return collectionFrame;
};

export default [
  register(getFrame(Container, allTopologiesExcept(containerTopology))),
  register(getFrame(React.Fragment, containerTopology)),
];
