import { SomeTerm } from '@ontologies/core';
import React, { FunctionComponent } from 'react';
import FontAwesome from 'react-fontawesome';

const FABase = 'http://fontawesome.io/icon/';

interface ImageProps {
  ariaLabel?: string;
  className?: string;
  linkedProp: SomeTerm;
  override?: FunctionComponent<ImageProps>;
  style?: any;
}

const Image: React.FC<ImageProps> = (props) => {
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
