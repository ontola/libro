import as from '@ontologies/as';
import rdf from '@ontologies/core';
import rdfx from '@ontologies/rdf';
import schema from '@ontologies/schema';
import LinkedRenderStore from 'link-lib';
import {
  linkedPropType,
  lrsType,
  withLRS,
} from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Detail from '../../../components/Detail';
import LDLink from '../../../components/LDLink';
import libro from '../../../ontology/libro';
import ontola from '../../../ontology/ontola';
import { contentDetailsTopology } from '../../../topologies/ContentDetails';
import { detailsBarTopology } from '../../../topologies/DetailsBar';

const propTypes = {
  linkedProp: linkedPropType,
  lrs: lrsType,
};

const LocationDetail = ({ lrs, linkedProp }) => {
  const placement = lrs.dig(linkedProp, [ontola.pages, as.items, rdfx.ns('_1')]).pop();

  if (!placement) {
    return (
      <Detail
        icon="map-marker"
        text={linkedProp.value}
      />
    );
  }

  return (
    <LDLink
      to={placement.value}
      onClick={(e) => {
        e.preventDefault();
        lrs.exec(rdf.namedNode(`${libro.actions.dialog.alert.value}?resource=${encodeURIComponent(placement.value)}`));
      }}
    >
      <Detail
        icon="map-marker"
        text={(
          <FormattedMessage
            defaultMessage="View location"
            id="https://app.argu.co/i18n/schema:Thing/schema:location/detailLabel"
          />
        )}
      />
    </LDLink>
  );
};

LocationDetail.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  withLRS(LocationDetail),
  schema.Thing,
  schema.location,
  [detailsBarTopology, contentDetailsTopology]
);
