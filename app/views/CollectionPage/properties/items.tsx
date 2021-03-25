import * as as from '@ontologies/as';
import rdf, { NamedNode, SomeTerm } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import {
  FC,
  Property,
  Resource,
  ReturnType,
  register,
} from 'link-redux';
import React, { CSSProperties, ElementType } from 'react';

import GridItem from '../../../components/Grid/GridItem';
import { LoadingCardFixed } from '../../../components/Loading';
import { tryParseInt } from '../../../helpers/numbers';
import useViewByIRI from '../../../hooks/useViewByIRI';
import app from '../../../ontology/app';
import ontola from '../../../ontology/ontola';
import CardRow from '../../../topologies/Card/CardRow';
import { CollectionViewTypes } from '../types';
import { allTopologies } from '../../../topologies';

export interface ItemProps {
  columns: NamedNode[];
  collectionDisplay: SomeTerm;
  maxColumns: number;
  depth: number;
  items: SomeNode[];
  linkedProp: SomeTerm;
  renderLimit: number;
  separator: string;
  subject: SomeNode;
  // @deprecated - refactor to classes
  style: CSSProperties;
  topology: NamedNode;
  totalCount: SomeTerm;
  view?: NamedNode;
}

const itemList = (props: ItemProps) => {
  const view = props.view && useViewByIRI(props.view);
  const [itemWrapper, itemWrapperOpts] = React.useMemo(() => {
    let wrapper: ElementType = React.Fragment;
    let wrapperOpts = {};

    if (rdf.equals(props.collectionDisplay, ontola['collectionDisplay/card'])) {
      wrapper = CardRow;
      wrapperOpts = {
        borderTop: true,
      };
    }
    if (rdf.equals(props.collectionDisplay, ontola['collectionDisplay/grid'])) {
      wrapper = GridItem;
      wrapperOpts = {
        Fallback: LoadingCardFixed,
        maxColumns: props.maxColumns,
      };
    }

    return [wrapper, wrapperOpts];
  }, [props.collectionDisplay, props.maxColumns]);

  return (
    props.items
      .slice(0, props.renderLimit)
      .map((iri) => (
        <Resource
          columns={props.columns}
          depth={props.depth}
          itemRenderer={view}
          itemWrapper={itemWrapper}
          itemWrapperOpts={itemWrapperOpts}
          key={`${props.subject}:${iri.value}`}
          separator={props.separator}
          subject={iri}
        />
      ))
  );
};

const styleWrapper = (props: ItemProps, itemListElem: JSX.Element | JSX.Element[] | null) => {
  if (props.style && props.style !== {}) {
    return (
      <div style={props.style}>
        {itemListElem}
      </div>
    );
  }

  return <React.Fragment>{itemListElem}</React.Fragment>;
};

const Items: FC<ItemProps> = (props) => {
  const {
    collectionDisplay,
    depth,
    items,
    linkedProp,
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
    children = itemList(props);
  } else {
    children = (
      <Resource
        depth={depth}
        subject={linkedProp}
      />
    );
  }

  return styleWrapper(props, children);
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

export default register(Items);
