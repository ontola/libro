import RDFTypes from '@rdfdev/prop-types';
import rdf from '@ontologies/core';
import {
  Property,
  Resource,
  linkType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { useSorting } from '../../../hooks/useSorting';
import ontola from '../../../ontology/ontola';
import Card from '../../../topologies/Card';
import CardAppendix from '../../../topologies/Card/CardAppendix';
import Container, { LargeContainer, containerTopology } from '../../../topologies/Container';
import Grid, { gridTopology } from '../../../topologies/Grid';
import { pageTopology } from '../../../topologies/Page';
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
    footer,
    header,
    pagination,
    setCurrentPage,
  }) => {
    let Wrapper;
    const sortOptions = useSorting();

    switch (rdf.id(collectionDisplay || collectionDisplayFromData)) {
      case rdf.id(ontola.ns('collectionDisplay/grid')):
        Wrapper = wrapper ? LargeContainer : React.Fragment;

        return (
          <Wrapper>
            <Property label={ontola.query} setCurrentPage={setCurrentPage} />
            {header}
            <Grid container>
              {body}
            </Grid>
            {pagination}
            {footer}
          </Wrapper>
        );
      case rdf.id(ontola.ns('collectionDisplay/settingsTable')):
      case rdf.id(ontola.ns('collectionDisplay/table')):
        Wrapper = wrapper ? Container : React.Fragment;

        return (
          <Wrapper>
            <Property label={ontola.query} setCurrentPage={setCurrentPage} />
            {header}
            <Card>
              <Table>
                <TableHead>
                  <TableHeaderRow>
                    {columns.map((property) => (
                      <Resource
                        forceRender
                        key={property.value}
                        setCurrentPage={setCurrentPage}
                        sortOptions={sortOptions.filter((option) => option.item === property)}
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
              {footer}
            </Card>
          </Wrapper>
        );
      case rdf.id(ontola.ns('collectionDisplay/card')):
        Wrapper = wrapper ? Container : React.Fragment;

        return (
          <Wrapper>
            <Property label={ontola.query} setCurrentPage={setCurrentPage} />
            {header}
            <Card>
              {body}
              <CardAppendix>
                {pagination}
              </CardAppendix>
              {footer}
            </Card>
          </Wrapper>
        );
      case rdf.id(ontola.ns('collectionDisplay/default')):
        Wrapper = wrapper ? Container : React.Fragment;

        return (
          <Wrapper>
            <Property label={ontola.query} setCurrentPage={setCurrentPage} />
            {header}
            {body}
            <div style={{ marginBottom: '1em' }}>
              {pagination}
            </div>
            {footer}
          </Wrapper>
        );
      default:
        return body;
    }
  };

  collectionFrame.type = CollectionTypes;

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
    header: PropTypes.node,
    pagination: PropTypes.node,
    setCurrentPage: PropTypes.func,
  };

  return collectionFrame;
};

export default [
  register(getFrame(true, allTopologiesExcept(containerTopology, gridTopology, pageTopology))),
  register(getFrame(false, [containerTopology, gridTopology])),
];
