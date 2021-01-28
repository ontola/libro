import * as as from '@ontologies/as';
import rdf from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import LinkedRenderStore from 'link-lib';
import {
  linkedPropType,
  lrsType,
  withLRS,
} from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Detail from '../../../components/Detail';
import { retrievePath } from '../../../helpers/iris';
import { isResource } from '../../../helpers/types';
import libro from '../../../ontology/libro';
import ontola from '../../../ontology/ontola';
import { contentDetailsTopology } from '../../../topologies/ContentDetails';
import { detailsBarTopology } from '../../../topologies/DetailsBar';

const propTypes = {
  linkedProp: linkedPropType,
  lrs: lrsType,
};

const LocationDetail = ({ lrs, linkedProp }) => {
  const nestedPlacement = lrs.dig(linkedProp, [ontola.pages, as.items, rdfx.ns('_1')]).pop();
  const placement = nestedPlacement || (isResource(linkedProp) && linkedProp);

  if (!placement) {
    return (
      <Detail
        icon="map-marker"
        text={linkedProp.value}
      />
    );
  }

  return (
    <Detail
      icon="map-marker"
      text={(
        <FormattedMessage
          defaultMessage="View location"
          id="https://app.argu.co/i18n/schema:Thing/schema:location/detailLabel"
        />
      )}
      url={retrievePath(placement.value)}
      onClick={(e) => {
        e.preventDefault();
        lrs.exec(rdf.namedNode(`${libro.actions.dialog.alert.value}?resource=${encodeURIComponent(placement.value)}`));
      }}
    />
  );
};

LocationDetail.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  withLRS(LocationDetail),
  schema.Thing,
  schema.location,
  [detailsBarTopology, contentDetailsTopology]
);
