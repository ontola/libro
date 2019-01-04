import {
  LinkedResourceContainer,
  PropertyBase,
  linkType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import Card from '../../../topologies/Card';
import Grid from '../../../topologies/Grid';
import { CollectionViewTypes } from '../types';
import Container, { containerTopology } from '../../../topologies/Container';
import { primaryResourceTopology } from '../../../topologies/PrimaryResource';
import Table from '../../../topologies/Table';

const settingsTableColumns = [
  NS.argu('invitee'),
  NS.argu('applyLink'),
  NS.argu('redirectUrl'),
  NS.argu('alias'),
  NS.argu('shortnameable'),
  [NS.schema('name'), NS.rdfs('label')],
  NS.schema('email'),
  NS.org('member'),
  NS.argu('grantSet'),
  NS.argu('followsCount'),
  NS.org('hasMember'),
  NS.argu('makePrimaryAction'),
  NS.argu('sendConfirmationAction'),
  [NS.argu('settingsMenu'), NS.argu('updateAction')],
  NS.argu('destroyAction'),
];

export const collectionDisplayWrapper = (collectionDisplay, itemList, topology) => {
  switch (collectionDisplay) {
    case NS.argu('collectionDisplay/grid'):
      return (
        <Grid>
          {itemList}
        </Grid>
      );
    case NS.argu('collectionDisplay/settingsTable'):
      return (
        <Card>
          <Table>
            <tbody>
              {itemList}
            </tbody>
          </Table>
        </Card>
      );
    case NS.argu('collectionDisplay/card'):
      return (
        <Card>
          {itemList}
        </Card>
      );
    default:
      if (topology !== containerTopology) {
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
  static type = CollectionViewTypes;

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

  columns() {
    if (this.props.collectionDisplay === NS.argu('collectionDisplay/settingsTable')) {
      return settingsTableColumns;
    }
    return undefined;
  }

  itemList() {
    return this.props.items
      .slice(0, this.props.renderLimit)
      .map(iri => (
        <LinkedResourceContainer
          columns={this.columns()}
          depth={this.props.depth}
          key={`${this.props.subject}:${iri.value}`}
          subject={iri}
        />
      ));
  }

  styleWrapper(itemList) {
    if (this.props.style && this.props.style !== {}) {
      return (
        <div style={this.props.style}>
          {itemList}
        </div>
      );
    }

    return collectionDisplayWrapper(this.props.collectionDisplay, itemList, this.props.topology);
  }

  render() {
    const { items, totalCount } = this.props;
    let children = null;

    if (totalCount.value === '0') {
      children = <div>Nog geen items</div>;
    } else if (Array.isArray(items) && items.length === 0) {
      children = null;
    } else if (Array.isArray(items)) {
      children = this.itemList();
    } else if (typeof items.toArray !== 'undefined') {
      children = this.itemList().toKeyedSeq();
    } else {
      children = (
        <LinkedResourceContainer
          depth={this.props.depth}
          subject={this.getLinkedObjectProperty()}
        />
      );
    }

    return this.styleWrapper(children);
  }
}

export default register(Items);
