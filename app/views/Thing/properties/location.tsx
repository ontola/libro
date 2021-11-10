import * as as from '@ontologies/as';
import rdf from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import {
  FC,
  PropertyProps,
  dig,
  register,
  useAction,
  useIds,
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

const LocationDetail: FC<PropertyProps> = ({
  linkedProp,
  subject,
}) => {
  const [nestedPlacement] = useIds(
    isResource(linkedProp) ? linkedProp : subject,
    dig(ontola.pages, as.items, rdfx.ns('_1')),
  );
  const placement = nestedPlacement ?? (isResource(linkedProp) ? linkedProp : undefined);
  const showDialog = useAction(rdf.namedNode(`${libro.actions.dialog.alert.value}?resource=${encodeURIComponent(placement?.value)}`));

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
        showDialog();
      }}
    />
  );
};

LocationDetail.type = schema.Thing;

LocationDetail.property = schema.location;

LocationDetail.topology = [detailsBarTopology, contentDetailsTopology];

export default register(LocationDetail);
