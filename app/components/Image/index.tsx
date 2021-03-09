import { SomeTerm } from '@ontologies/core';
import React from 'react';
import FontAwesome from 'react-fontawesome';

const FABase = 'http://fontawesome.io/icon/';

export interface ImageProps {
  ariaLabel?: string,
  className?: string,
  linkedProp: SomeTerm,
  override?: (props: ImageProps) => JSX.Element,
  style?: {
    maxHeight?: string,
  },
}

const Image = (props: ImageProps): JSX.Element => {
  const {
    ariaLabel,
    className,
    override,
    style,
    linkedProp,
  } = props;

  if (linkedProp?.value?.startsWith(FABase)) {
    return (
      <FontAwesome
        ariaLabel={ariaLabel || ''}
        className={className}
        name={linkedProp.value.split(FABase)[1]}
        style={style}
      />
    );
  }
  if (typeof override !== 'undefined') {
    return override(props);
  }

  return (
    <img
      alt={ariaLabel || ''}
      className={className}
      src={linkedProp?.value}
      style={style}
    />
  );
};

export default Image;
