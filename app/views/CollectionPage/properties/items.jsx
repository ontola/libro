import as from '@ontologies/as';
import rdf from '@ontologies/core';
import {
  Property,
  Resource,
  ReturnType,
  linkType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import GridItem from '../../../components/Grid/GridItem';
import { LoadingCardFixed } from '../../../components/Loading';
import { tryParseInt } from '../../../helpers/numbers';
import app from '../../../ontology/app';
import ontola from '../../../ontology/ontola';
import CardRow from '../../../topologies/Card/CardRow';
import { CollectionViewTypes } from '../types';
import { allTopologies } from '../../../topologies';

const itemList = (props, columns, separator) => {
  let itemWrapper = React.Fragment;
  let itemWrapperOpts = {};

  if (rdf.equals(props.collectionDisplay, ontola['collectionDisplay/card'])) {
    itemWrapper = CardRow;
  }
  if (rdf.equals(props.collectionDisplay, ontola['collectionDisplay/grid'])) {
    itemWrapper = GridItem;
    itemWrapperOpts = { Fallback: LoadingCardFixed };
  }

  return (
    props.items
      .slice(0, props.renderLimit)
      .map((iri) => (
        <Resource
          columns={columns}
          depth={props.depth}
          itemWrapper={itemWrapper}
          itemWrapperOpts={itemWrapperOpts}
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
    items,
    linkedProp,
    separator,
    topology,
    totalCount,
  } = props;
  let children = null;

  if (tryParseInt(totalCount) === 0) {
    return (
      <Property
        forceRender
        collectionDisplay={collectionDisplay}
        label={app.empty}
        topology={topology}
      />
    );
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

Items.type = CollectionViewTypes;

Items.property = as.items;

Items.topology = allTopologies;

Items.mapDataToProps = {
  items: {
    label: as.items,
    returnType: ReturnType.AllTerms,
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
