import as from '@ontologies/as';
import rdf from '@ontologies/core';
import {
  LinkedResourceContainer,
  PropertyBase,
  linkType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import CardContent from '../../../components/Card/CardContent';
import argu from '../../../ontology/argu';
import ontola from '../../../ontology/ontola';
import CardRow from '../../../topologies/Card/CardRow';
import { CollectionViewTypes } from '../types';
import { allTopologies } from '../../../topologies';
import TableRow from '../../../topologies/TableRow';
import TableCell from '../../../topologies/TableCell';

class Items extends PropertyBase {
  static type = [...CollectionViewTypes, argu.SearchResult];

  static property = as.items;

  static topology = allTopologies;

  static mapDataToProps = {
    items: {
      label: as.items,
      limit: Infinity,
    },
    totalCount: { label: as.totalItems },
  };

  static propTypes = {
    depth: PropTypes.number,
    items: linkType,
    /** The amount of items to render. Leave undefined for all items */
    renderLimit: PropTypes.number,
    separator: PropTypes.string,
    totalCount: linkType,
  };

  itemList(columns, separator) {
    const itemWrapper = rdf.equals(this.props.collectionDisplay, ontola['collectionDisplay/card'])
      ? CardRow
      : React.Fragment;

    return (
      this.props.items
        .slice(0, this.props.renderLimit)
        .map(iri => (
          <LinkedResourceContainer
            columns={columns}
            depth={this.props.depth}
            itemWrapper={itemWrapper}
            key={`${this.props.subject}:${iri.value}`}
            separator={separator}
            subject={iri}
          />
        ))
    );
  }

  styleWrapper(itemList) {
    if (this.props.style && this.props.style !== {}) {
      return (
        <div style={this.props.style}>
          {itemList}
        </div>
      );
    }

    return itemList;
  }

  render() {
    const {
      columns,
      items,
      separator,
      totalCount,
    } = this.props;

    let children = null;

    if (totalCount.value === '0') {
      if (this.props.empty) {
        return this.props.empty();
      }

      const message = (
        <FormattedMessage
          defaultMessage="No items yet"
          id="https://app.argu.co/i18n/collection/empty/message"
        />
      );

      if (rdf.equals(this.props.collectionDisplay, ontola['collectionDisplay/card'])) {
        return <CardContent endSpacing>{message}</CardContent>;
      }

      if (rdf.equals(this.props.collectionDisplay, ontola['collectionDisplay/table'])
        || rdf.equals(this.props.collectionDisplay, ontola['collectionDisplay/settingsTable'])) {
        return <TableRow><TableCell>{message}</TableCell></TableRow>;
      }

      return message;
    }

    if (Array.isArray(items) && items.length === 0) {
      children = null;
    } else if (Array.isArray(items)) {
      children = this.itemList(columns, separator);
    } else if (typeof items.toArray !== 'undefined') {
      children = this.itemList(columns, separator).toKeyedSeq();
    } else {
      children = (
        <LinkedResourceContainer
          depth={this.props.depth}
          subject={this.getLinkedObjectProperty()}
        />
      );
    }

    return this.styleWrapper(children, columns || []);
  }
}

export default register(Items);
