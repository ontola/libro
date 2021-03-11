import { SomeTerm } from '@ontologies/core';
import React from 'react';
import FontAwesome from 'react-fontawesome';

const FABase = 'http://fontawesome.io/icon/';

export interface ImageBaseProps {
  ariaLabel?: string,
  className?: string,
  linkedProp: SomeTerm,
  style?: React.CSSProperties,
}

export interface ImageProps<T extends ImageBaseProps = ImageBaseProps> extends ImageBaseProps {
  override?: (props: T) => JSX.Element,
}

const Image = <T extends ImageBaseProps>(props: ImageProps<T>): JSX.Element => {
  const {
    override,
    ...overrideProps
  } = props;
  const {
    ariaLabel,
    className,
    style,
    linkedProp,
  } = overrideProps;

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
    return override(overrideProps as T);
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
