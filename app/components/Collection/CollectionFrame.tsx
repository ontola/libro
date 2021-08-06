import { makeStyles } from '@material-ui/styles';
import * as as from '@ontologies/as';
import rdf from '@ontologies/core';
import { Property, Resource } from 'link-redux';
import React, { ElementType } from 'react';

import app from '../../ontology/app';
import ontola from '../../ontology/ontola';
import Card from '../../topologies/Card';
import CardAppendix from '../../topologies/Card/CardAppendix';
import Grid from '../../topologies/Grid';
import Table from '../../topologies/Table';
import TableFooter from '../../topologies/TableFooter';
import TableFooterCell from '../../topologies/TableFooterCell';
import TableFooterRow from '../../topologies/TableFooterRow';
import TableHead from '../../topologies/TableHead';
import TableHeaderRow from '../../topologies/TableHeaderRow';
import { LoadingCardFixed } from '../Loading';
import Suspense from '../Suspense';
import TableHeadCells from '../TableHeadCells';

import { useCollectionOptions } from './CollectionProvider';

const useStyles = makeStyles({
  paginationWrapper: {
    marginBottom: '1em',
  },
});

export interface CollectionFrameProps {
  hideHeader?: boolean;
  Wrapper: ElementType,
}

const CollectionFrame = ({
  hideHeader,
  Wrapper,
}: CollectionFrameProps): JSX.Element => {
  const styles = useStyles();
  const {
    collectionDisplay,
    currentCollectionPages,
    columns,
  } = useCollectionOptions();

  const body = React.useMemo(() => (
    <React.Fragment>
      {currentCollectionPages?.map((collectionPage) => (
        <Suspense
          fallback={<LoadingCardFixed />}
          key={collectionPage.value}
        >
          <Resource subject={collectionPage}>
            <Property
              forceRender
              label={as.items}
              renderLimit={Infinity}
            />
          </Resource>
        </Suspense>
      ))}
    </React.Fragment>
  ), [currentCollectionPages]);

  switch (rdf.id(collectionDisplay)) {
  case rdf.id(ontola.ns('collectionDisplay/grid')):
    return (
      <Wrapper>
        <Property label={ontola.query} />
        <Property
          forceRender
          hideHeader={hideHeader}
          label={ontola.header}
        />
        <Grid container>
          {body}
        </Grid>
        <Property
          forceRender
          label={app.pagination}
        />
      </Wrapper>
    );
  case rdf.id(ontola.ns('collectionDisplay/settingsTable')):
  case rdf.id(ontola.ns('collectionDisplay/table')):
    return (
      <Wrapper>
        <Property label={ontola.query} />
        <Property
          forceRender
          hideHeader={hideHeader}
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
                <TableFooterCell colSpan={columns?.length}>
                  <Property
                    forceRender
                    label={app.pagination}
                  />
                </TableFooterCell>
              </TableFooterRow>
            </TableFooter>
          </Table>
        </Card>
      </Wrapper>
    );
  case rdf.id(ontola.ns('collectionDisplay/card')):
    return (
      <Wrapper>
        <Property label={ontola.query} />
        <Property
          forceRender
          hideHeader={hideHeader}
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
      </Wrapper>
    );
  case rdf.id(ontola.ns('collectionDisplay/default')):
    return (
      <Wrapper>
        <Property label={ontola.query} />
        <Property
          forceRender
          hideHeader={hideHeader}
          label={ontola.header}
        />
        {body}
        <div className={styles.paginationWrapper}>
          <Property
            forceRender
            label={app.pagination}
          />
        </div>
      </Wrapper>
    );
  default:
    return body;
  }
};

export default CollectionFrame;
