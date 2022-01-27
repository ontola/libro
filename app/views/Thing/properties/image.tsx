import { Node, isNamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  Resource,
  register,
  useDataInvalidation,
  useStatus,
} from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { NOT_ACCEPTABLE } from 'http-status-codes';

import { isFontAwesomeIRI, normalizeFontAwesomeIRI } from '../../../helpers/iris';
import dbo from '../../../ontology/dbo';
import wdt from '../../../ontology/wdt';
import { allTopologies } from '../../../topologies';
import Image from '../../../components/Image';

interface ThingImagePropProps {
  ariaLabel: string;
  className: string;
  children: React.ReactNode;
  linkedProp: Node;
}

const ThingImageProp = ({
  ariaLabel,
  children,
  className,
  linkedProp,
}: ThingImagePropProps): JSX.Element | null => {
  useDataInvalidation(linkedProp);
  const status = useStatus(isFontAwesomeIRI(linkedProp?.value) ? undefined : linkedProp);

  if (children) {
    return (
      <Resource
        className={className}
        subject={linkedProp}
      >
        {children}
      </Resource>
    );
  }

  if (!linkedProp) {
    return null;
  } else if (status?.status === NOT_ACCEPTABLE) {
    return (
      <Image
        ariaLabel={ariaLabel}
        linkedProp={linkedProp}
      />
    );
  } else if (linkedProp
    && Object.keys(linkedProp).length === 0
    && linkedProp.constructor === Object
  ) {
    return (
      <div>
        image
      </div>
    );
  } else if (isNamedNode(linkedProp) && isFontAwesomeIRI(linkedProp.value)) {
    return (
      <FontAwesome
        name={normalizeFontAwesomeIRI(linkedProp)}
      />
    );
  }

  return (
    <Resource
      ariaLabel={ariaLabel}
      className={className}
      subject={linkedProp}
    />
  );
};

ThingImageProp.type = schema.Thing;

ThingImageProp.property = [
  schema.image,
  dbo.thumbnail,
  wdt.ns('P18'),
];

ThingImageProp.topology = allTopologies;

export default register(ThingImageProp);
