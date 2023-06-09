import * as as from '@ontologies/as';
import rdf, { NamedNode, SomeTerm } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import {
  FC,
  Property,
  Resource,
  register,
  useIds,
  useProperty, 
} from 'link-redux';
import React, { CSSProperties, ElementType } from 'react';

import { allTopologies } from '../../../../../topologies';
import GridItem from '../../../../Common/components/Grid/GridItem';
import { LoadingCardFixed } from '../../../../Common/components/Loading';
import { tryParseInt } from '../../../../Common/lib/numbers';
import app from '../../../../Common/ontology/app';
import CardRow from '../../../../Common/topologies/Card/CardRow';
import ontola from '../../../../Kernel/ontology/ontola';
import { useCollectionOptions } from '../../../components/CollectionContext';
import { CollectionViewTypes } from '../types';

export interface ItemProps {
  items: SomeNode[];
  linkedProp: SomeTerm;
  renderLimit: number;
  separator: string;
  subject: SomeNode;
  // @deprecated - refactor to classes
  style: CSSProperties;
  topology: NamedNode;
  totalCount: SomeTerm;
}

const ItemList = ({
  items,
  renderLimit,
  subject,
  separator,
}: ItemProps): JSX.Element => {
  const {
    collectionDisplay,
    depth,
    maxColumns,
    onItemClick,
  } = useCollectionOptions();
  const [itemWrapper, itemWrapperOpts] = React.useMemo(() => {
    let wrapper: ElementType = React.Fragment;
    let wrapperOpts = {};

    if (rdf.equals(collectionDisplay, ontola['collectionDisplay/card'])) {
      wrapper = CardRow;
      wrapperOpts = {
        borderTop: true,
      };
    }

    if (rdf.equals(collectionDisplay, ontola['collectionDisplay/grid'])) {
      wrapper = GridItem;
      wrapperOpts = {
        Fallback: LoadingCardFixed,
        maxColumns,
      };
    }

    return [wrapper, wrapperOpts];
  }, [collectionDisplay]);

  return (
    <React.Fragment>
      {items.slice(0, renderLimit).map((iri) => (
        <Resource
          childProps={{ onItemClick }}
          depth={depth}
          itemWrapper={itemWrapper}
          itemWrapperOpts={itemWrapperOpts}
          key={`${subject}:${iri.value}`}
          separator={separator}
          subject={iri}
        />
      ))}
    </React.Fragment>
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

  return (
    <React.Fragment>
      {itemListElem}
    </React.Fragment>
  );
};

const Items: FC<ItemProps> = (props) => {
  const items = useIds(as.items);
  const [totalCount] = useProperty(as.totalItems);

  const {
    linkedProp,
    topology,
  } = props;
  const { depth } = useCollectionOptions();
  let children = null;

  if (tryParseInt(totalCount) === 0) {
    return (
      <Property
        forceRender
        label={app.empty}
        topology={topology}
      />
    );
  }

  if (Array.isArray(items) && items.length === 0) {
    children = null;
  } else if (Array.isArray(items)) {
    children = (
      <ItemList
        {...props}
        items={items}
        totalCount={totalCount}
      />
    );
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

export default register(Items);
