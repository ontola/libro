import { Node } from '@ontologies/core';
import sh from '@ontologies/shacl';
import { LinkedResourceContainer, Property, useLRS } from 'link-redux';
import React, { FC } from 'react';

export interface Props {
  targetValue: Array<{ '@id': Node }>;
  nestedShape: boolean;
  targetNode: Node;
  theme: string;
  onKeyUp: () => void;
  removeItem: () => void;
  shClass: Node;
}

export const NestedResourceView: FC<Props> = (props) => {
  const {
    targetValue,
    nestedShape,
    targetNode,
    theme,
    onKeyUp,
    shClass,
  } = props;
  const lrs = useLRS();

  if (typeof targetValue === 'undefined') {
    return null;
  }

  const targetShape = lrs.store.find(
    null,
    sh.targetClass,
    shClass,
    null,
  );

  const children = !targetShape
    ? (
      <Property
        label={sh.class}
        nestedShape={nestedShape}
        targetNode={targetNode}
        theme={theme}
        onKeyUp={onKeyUp}
        {...props}
      />
    )
    : (
      <LinkedResourceContainer
        subject={targetShape.subject}
        {...props}
      />
    );

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
};
