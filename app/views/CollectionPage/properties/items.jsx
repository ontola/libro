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
import useViewByIRI from '../../../hooks/useViewByIRI';
import app from '../../../ontology/app';
import ontola from '../../../ontology/ontola';
import CardRow from '../../../topologies/Card/CardRow';
import { CollectionViewTypes } from '../types';
import { allTopologies } from '../../../topologies';

const itemList = (props, columns, separator, view, maxColumns) => {
  const [itemWrapper, itemWrapperOpts] = React.useMemo(() => {
    let wrapper = React.Fragment;
    let wrapperOpts = {};

    if (rdf.equals(props.collectionDisplay, ontola['collectionDisplay/card'])) {
      wrapper = CardRow;
    }
    if (rdf.equals(props.collectionDisplay, ontola['collectionDisplay/grid'])) {
      wrapper = GridItem;
      wrapperOpts = {
        Fallback: LoadingCardFixed,
        maxColumns,
      };
    }

    return [wrapper, wrapperOpts];
  }, [props.collectionDisplay, maxColumns]);

  return (
    props.items
      .slice(0, props.renderLimit)
      .map((iri) => (
        <Resource
          columns={columns}
          depth={props.depth}
          itemRenderer={view}
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
    maxColumns,
    separator,
    topology,
    totalCount,
    view: viewIRI,
  } = props;
  let children = null;
  const view = viewIRI && useViewByIRI(viewIRI);

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
    children = itemList(props, columns, separator, view, maxColumns);
  } else if (typeof items.toArray !== 'undefined') {
    children = itemList(props, columns, separator, view, maxColumns).toKeyedSeq();
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
  view: linkType,
};

export default register(Items);
