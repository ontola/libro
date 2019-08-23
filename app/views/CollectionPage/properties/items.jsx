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
import { NS } from '../../../helpers/LinkedRenderStore';
import CardRow from '../../../topologies/Card/CardRow';
import { CollectionViewTypes } from '../types';
import { allTopologies } from '../../../topologies';

class Items extends PropertyBase {
  static type = [...CollectionViewTypes, NS.argu('SearchResult')];

  static property = NS.as('items');

  static topology = allTopologies;

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
    separator: PropTypes.string,
    totalCount: linkType,
  };

  itemList(columns, separator) {
    const itemWrapper = this.props.collectionDisplay === NS.ontola('collectionDisplay/card')
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

      if (this.props.collectionDisplay === NS.ontola('collectionDisplay/card')) {
        return <CardContent endSpacing>{message}</CardContent>;
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
