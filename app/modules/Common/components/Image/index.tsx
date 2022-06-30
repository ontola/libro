import {
  SomeTerm,
  isNamedNode,
  isNode,
} from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import {
  Resource,
  useDataFetching,
  useGlobalIds,
} from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import ontola from '../../../Core/ontology/ontola';
import {
  isDifferentWebsite,
  isFontAwesomeIRI,
  normalizeFontAwesomeIRI,
} from '../../lib/iris';

export interface ImageBaseProps {
  alt?: string,
  ariaLabel?: string,
  className?: string,
  linkedProp?: SomeTerm,
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
    alt,
    ariaLabel,
    className,
    spin,
    style,
    linkedProp,
  } = overrideProps;
  useDataFetching(isNamedNode(linkedProp) && !isDifferentWebsite(linkedProp) ? linkedProp : undefined);
  const types = useGlobalIds(isNode(linkedProp) ? linkedProp : undefined, rdfx.type);

  if (linkedProp && isFontAwesomeIRI(linkedProp.value)) {
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

  if (types.includes(schema.MediaObject) || types.includes(schema.ImageObject) || types.includes(ontola.PictureSet)) {
    return <Resource subject={linkedProp} />;
  }

  return (
    <img
      alt={alt}
      aria-label={ariaLabel}
      className={className}
      src={linkedProp?.value}
      style={style}
    />
  );
};

export default Image;
