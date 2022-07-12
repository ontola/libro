import * as as from '@ontologies/as';
import rdf from '@ontologies/core';
import {
  Property,
  Resource,
  useStrings,
} from 'link-redux';
import React from 'react';

import Card from '../../Common/topologies/Card';
import CardAppendix from '../../Common/topologies/Card/CardAppendix';
import Grid from '../../Common/topologies/Grid';
import app from '../../Common/ontology/app';
import ontola from '../../Kernel/ontology/ontola';
import TableHeadCells from '../../Table/components/TableHeadCells';
import Table from '../../Table/topologies/Table';
import TableFooter from '../../Table/topologies/TableFooter';
import TableFooterCell from '../../Table/topologies/TableFooterCell';
import TableFooterRow from '../../Table/topologies/TableFooterRow';
import TableHead from '../../Table/topologies/TableHead';
import TableHeaderRow from '../../Table/topologies/TableHeaderRow';

import { useCollectionOptions } from './CollectionContext';
import CollectionCreateButton, { TriggerType } from './CollectionCreateButton';
import { CollectionFrameWrapper } from './CollectionFrameWrapper';

export interface CollectionFrameProps {
  Wrapper: React.ElementType,
}

const CollectionFrame = ({
  Wrapper,
}: CollectionFrameProps): JSX.Element => {
  const {
    collectionDisplay,
    currentCollectionPages,
    columns,
    depth,
  } = useCollectionOptions();
  const [callToAction] = useStrings(ontola.callToAction);

  const body = React.useMemo(() => (
    <React.Fragment>
      {currentCollectionPages?.map((collectionPage) => (
        <Resource
          key={collectionPage.value}
          subject={collectionPage}
        >
          <Property
            forceRender
            label={as.items}
            renderLimit={Infinity}
          />
        </Resource>
      ))}
    </React.Fragment>
  ), [currentCollectionPages]);

  switch (rdf.id(collectionDisplay)) {
  case rdf.id(ontola.ns('collectionDisplay/grid')):
    return (
      <CollectionFrameWrapper Wrapper={Wrapper}>
        <Property label={ontola.query} />
        <Property
          forceRender
          label={ontola.header}
        />
        <Grid container>
          {body}
        </Grid>
        <Property
          forceRender
          label={app.pagination}
        />
      </CollectionFrameWrapper>
    );
  case rdf.id(ontola.ns('collectionDisplay/settingsTable')):
  case rdf.id(ontola.ns('collectionDisplay/table')):
    return (
      <CollectionFrameWrapper Wrapper={Wrapper}>
        <Property label={ontola.query} />
        <Property
          forceRender
          label={ontola.header}
        />
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
                <TableFooterCell colSpan={1}>
                  <CollectionCreateButton trigger={TriggerType.Text} />
                </TableFooterCell>
                <TableFooterCell colSpan={(columns?.length || 1) - 1}>
                  <Property
                    forceRender
                    alignText="right"
                    label={app.pagination}
                  />
                </TableFooterCell>
              </TableFooterRow>
            </TableFooter>
          </Table>
        </Card>
      </CollectionFrameWrapper>
    );
  case rdf.id(ontola.ns('collectionDisplay/card')):
    return (
      <CollectionFrameWrapper Wrapper={Wrapper}>
        <Property label={ontola.query} />
        <Property
          forceRender
          label={ontola.header}
        />
        <Card>
          {body}
          <CardAppendix>
            <Property
              forceRender
              label={app.pagination}
            />
          </CardAppendix>
        </Card>
      </CollectionFrameWrapper>
    );
  case rdf.id(ontola.ns('collectionDisplay/default')):
    return (
      <CollectionFrameWrapper Wrapper={Wrapper}>
        <Property label={ontola.query} />
        <Property
          forceRender
          label={ontola.header}
        />
        {body}
        <Property
          forceRender
          label={app.pagination}
        />
        {!depth && (
          <Property
            forceRender
            header={callToAction}
            label={app.omniform}
          />
        )}
      </CollectionFrameWrapper>
    );
  default:
    return body;
  }
};

export default CollectionFrame;
