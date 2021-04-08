import { SomeTerm } from '@ontologies/core';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import { isFontAwesomeIRI, normalizeFontAwesomeIRI } from '../../helpers/iris';

export interface ImageBaseProps {
  ariaLabel?: string,
  className?: string,
  linkedProp: SomeTerm,
  spin?: boolean;
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
    spin,
    style,
    linkedProp,
  } = overrideProps;

  if (isFontAwesomeIRI(linkedProp.value)) {
    return (
      <span className={className}>
        <FontAwesome
          ariaLabel={ariaLabel || ''}
          name={normalizeFontAwesomeIRI(linkedProp)}
          spin={spin}
          style={style}
        />
      </span>
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
