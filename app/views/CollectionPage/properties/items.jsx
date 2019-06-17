import {
  LinkedResourceContainer,
  PropertyBase,
  linkType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { listToArr } from '../../../helpers/data';
import { NS } from '../../../helpers/LinkedRenderStore';
import Card from '../../../topologies/Card';
import Grid from '../../../topologies/Grid';
import Container, { containerTopology } from '../../../topologies/Container';
import { primaryResourceTopology } from '../../../topologies/PrimaryResource';
import Table from '../../../topologies/Table';
import TableHead from '../../../topologies/TableHead';
import TableHeaderRow from '../../../topologies/TableHeaderRow';
import { CollectionViewTypes } from '../types';

export const CollectionDisplayWrapper = ({
  collectionDisplay, itemList, columns, topology,
}) => {
  switch (collectionDisplay) {
    case NS.ontola('collectionDisplay/grid'):
      return (
        <Grid>
          {itemList}
        </Grid>
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
              {itemList}
            </tbody>
          </Table>
        </Card>
      );
    case NS.ontola('collectionDisplay/card'):
      return (
        <Card>
          {itemList}
        </Card>
      );
    default:
      if (collectionDisplay === NS.ontola('collectionDisplay/default') && topology !== containerTopology) {
        return (
          <Container>
            {itemList}
          </Container>
        );
      }
      return itemList;
  }
};

class Items extends PropertyBase {
  static type = [...CollectionViewTypes, NS.argu('SearchResult')];

  static property = NS.as('items');

  static topology = [
    undefined,
    primaryResourceTopology,
    NS.argu('cardList'),
    NS.argu('widget'),
    NS.argu('container'),
  ];

  static mapDataToProps = {
    items: {
      label: NS.as('items'),
      limit: Infinity,
    },
    totalCount: NS.as('totalItems'),
  };

  static propTypes = {
    depth: PropTypes.number,
    items: linkType,
    /** The amount of items to render. Leave undefined for all items */
    renderLimit: PropTypes.number,
    totalCount: linkType,
  };

  itemList(columns) {
    return this.props.items
      .slice(0, this.props.renderLimit)
      .map(iri => (
        <LinkedResourceContainer
          columns={columns}
          depth={this.props.depth}
          key={`${this.props.subject}:${iri.value}`}
          subject={iri}
        />
      ));
  }

  styleWrapper(itemList, columns) {
    if (this.props.style && this.props.style !== {}) {
      return (
        <div style={this.props.style}>
          {itemList}
        </div>
      );
    }

    return (
      <CollectionDisplayWrapper
        collectionDisplay={this.props.collectionDisplay}
        columns={columns}
        itemList={itemList}
        topology={this.props.topology}
      />
    );
  }

  render() {
    const {
      columns,
      items,
      lrs,
      totalCount,
    } = this.props;
    const resolvedColumns = columns ? listToArr(lrs, [], columns) : undefined;

    let children = null;

    if (totalCount.value === '0') {
      children = <div>Nog geen items</div>;
    } else if (Array.isArray(items) && items.length === 0) {
      children = null;
    } else if (Array.isArray(items)) {
      children = this.itemList(resolvedColumns);
    } else if (typeof items.toArray !== 'undefined') {
      children = this.itemList(resolvedColumns).toKeyedSeq();
    } else {
      children = (
        <LinkedResourceContainer
          depth={this.props.depth}
          subject={this.getLinkedObjectProperty()}
        />
      );
    }

    return this.styleWrapper(children, resolvedColumns || []);
  }
}

export default register(Items);
