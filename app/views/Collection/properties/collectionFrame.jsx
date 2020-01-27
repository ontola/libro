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

import argu from '../../../ontology/argu';
import ontola from '../../../ontology/ontola';
import Card from '../../../topologies/Card';
import CardAppendix from '../../../topologies/Card/CardAppendix';
import Container, { LargeContainer, containerTopology } from '../../../topologies/Container';
import Grid, { gridTopology } from '../../../topologies/Grid';
import Table from '../../../topologies/Table';
import TableFooter from '../../../topologies/TableFooter';
import TableFooterCell from '../../../topologies/TableFooterCell';
import TableFooterRow from '../../../topologies/TableFooterRow';
import TableHead from '../../../topologies/TableHead';
import TableHeaderRow from '../../../topologies/TableHeaderRow';
import { allTopologiesExcept } from '../../../topologies';
import { CollectionTypes } from '../types';

const getFrame = (wrapper, topology) => {
  const collectionFrame = ({
    body,
    collectionDisplay,
    collectionDisplayFromData,
    columns,
    header,
    pagination,
  }) => {
    let Wrapper;

    switch (rdf.id(collectionDisplay || collectionDisplayFromData)) {
      case rdf.id(ontola.ns('collectionDisplay/grid')):
        Wrapper = wrapper ? LargeContainer : React.Fragment;

        return (
          <Wrapper>
            {header}
            <Grid container>
              {body}
            </Grid>
            {pagination}
          </Wrapper>
        );
      case rdf.id(ontola.ns('collectionDisplay/settingsTable')):
      case rdf.id(ontola.ns('collectionDisplay/table')):
        Wrapper = wrapper ? Container : React.Fragment;

        return (
          <Wrapper>
            {header}
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
          </Wrapper>
        );
      case rdf.id(ontola.ns('collectionDisplay/card')):
        Wrapper = wrapper ? Container : React.Fragment;

        return (
          <Wrapper>
            {header}
            <Card>
              {body}
              <CardAppendix>
                {pagination}
              </CardAppendix>
            </Card>
          </Wrapper>
        );
      case rdf.id(ontola.ns('collectionDisplay/default')):
        Wrapper = wrapper ? Container : React.Fragment;

        return (
          <Wrapper>
            {header}
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
  register(getFrame(true, allTopologiesExcept(containerTopology, gridTopology))),
  register(getFrame(false, [containerTopology, gridTopology])),
];
