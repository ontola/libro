import as from '@ontologies/as';
import rdf from '@ontologies/core';
import {
  Resource,
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

const itemList = (props, columns, separator) => {
  const itemWrapper = rdf.equals(props.collectionDisplay, ontola['collectionDisplay/card'])
    ? CardRow
    : React.Fragment;

  return (
    props.items
      .slice(0, props.renderLimit)
      .map(iri => (
        <Resource
          columns={columns}
          depth={props.depth}
          itemWrapper={itemWrapper}
          key={`${props.subject}:${iri.value}`}
          separator={separator}
          subject={iri}
        />
      ))
  );
};

const styleWrapper = (props, itemListElem) => {
  if (props.style && props.style !== {}) {
    return (
      <div style={props.style}>
        {itemListElem}
      </div>
    );
  }

  return itemListElem;
};

const Items = (props) => {
  const {
    columns,
    collectionDisplay,
    depth,
    empty,
    items,
    linkedProp,
    separator,
    totalCount,
  } = props;
  let children = null;

  if (totalCount.value === '0') {
    if (empty) {
      return empty();
    }

    const message = (
      <FormattedMessage
        defaultMessage="No items yet"
        id="https://app.argu.co/i18n/collection/empty/message"
      />
    );

    if (rdf.equals(collectionDisplay, ontola['collectionDisplay/card'])) {
      return <CardContent endSpacing>{message}</CardContent>;
    }

    if (rdf.equals(collectionDisplay, ontola['collectionDisplay/table'])
      || rdf.equals(collectionDisplay, ontola['collectionDisplay/settingsTable'])) {
      return <TableRow><TableCell>{message}</TableCell></TableRow>;
    }

    return message;
  }

  if (Array.isArray(items) && items.length === 0) {
    children = null;
  } else if (Array.isArray(items)) {
    children = itemList(props, columns, separator);
  } else if (typeof items.toArray !== 'undefined') {
    children = itemList(props, columns, separator).toKeyedSeq();
  } else {
    children = (
      <Resource
        depth={depth}
        subject={linkedProp}
      />
    );
  }

  return styleWrapper(props, children, columns || []);
};

Items.type = [...CollectionViewTypes, argu.SearchResult];

Items.property = as.items;

Items.topology = allTopologies;

Items.mapDataToProps = {
  items: {
    label: as.items,
    limit: Infinity,
  },
  totalCount: { label: as.totalItems },
};

Items.propTypes = {
  depth: PropTypes.number,
  items: linkType,
  /** The amount of items to render. Leave undefined for all items */
  renderLimit: PropTypes.number,
  separator: PropTypes.string,
  totalCount: linkType,
};

export default register(Items);
