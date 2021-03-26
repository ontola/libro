import rdf, { NamedNode, SomeTerm } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import {
  FC,
  Property,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import { useCollectionOptions } from '../../../components/Collection/CollectionProvider';
import TableHeadCells from '../../../components/TableHeadCells';
import app from '../../../ontology/app';
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

const style = { marginBottom: '1em' };

interface CollectionFrameProps {
  linkedProp: SomeTerm;
  subject: SomeNode;
}

const getFrame = (wrapper: boolean, topology: NamedNode | NamedNode[]) => {
  const collectionFrame: FC<CollectionFrameProps> = ({
    subject,
  }) => {
    let Wrapper;
    const {
      collectionDisplay,
      collectionResource,
      columns,
    } = useCollectionOptions();
    let body;
    if (!collectionResource || collectionResource === subject) {
      body = (
        <Property
          forceRender
          insideCollection
          label={ontola.pages}
        />
      );
    } else if (collectionResource) {
      body = (
        <Resource
          forceRender
          insideCollection
          subject={collectionResource}
        />
      );
    } else {
      body = <div className="Collection__Empty-frame" />;
    }

    switch (rdf.id(collectionDisplay)) {
    case rdf.id(ontola.ns('collectionDisplay/grid')):
      Wrapper = wrapper ? LargeContainer : React.Fragment;

      return (
        <Wrapper>
          <Property label={ontola.query} />
          <Property forceRender label={ontola.header} />
          <Grid container>
            {body}
          </Grid>
          <Property forceRender label={app.pagination} />
        </Wrapper>
      );
    case rdf.id(ontola.ns('collectionDisplay/settingsTable')):
    case rdf.id(ontola.ns('collectionDisplay/table')):
      Wrapper = wrapper ? LargeContainer : React.Fragment;

      return (
        <Wrapper>
          <Property label={ontola.query} />
          <Property forceRender label={ontola.header} />
          <Card>
            <Table>
              <TableHead>
                <TableHeaderRow>
                  <TableHeadCells />
                </TableHeaderRow>
              </TableHead>
              <tbody>
                {body}
              </tbody>
              <TableFooter>
                <TableFooterRow>
                  <TableFooterCell colSpan={columns?.length}>
                    <Property forceRender label={app.pagination} />
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
          <Property label={ontola.query} />
          <Property forceRender label={ontola.header} />
          <Card>
            {body}
            <CardAppendix>
              <Property forceRender label={app.pagination} />
            </CardAppendix>
          </Card>
        </Wrapper>
      );
    case rdf.id(ontola.ns('collectionDisplay/default')):
      Wrapper = wrapper ? Container : React.Fragment;

      return (
        <Wrapper>
          <Property label={ontola.query} />
          <Property forceRender label={ontola.header} />
          {body}
          <div style={style}>
            <Property forceRender label={app.pagination} />
          </div>
        </Wrapper>
      );
    default:
      return body;
    }
  };

  collectionFrame.type = CollectionTypes;

  collectionFrame.topology = topology;

  collectionFrame.property = ontola.collectionFrame;

  return collectionFrame;
};

export default [
  register(getFrame(true, allTopologiesExcept(containerTopology, gridTopology, pageTopology))),
  register(getFrame(false, [containerTopology, gridTopology])),
];
