import * as as from '@ontologies/as';
import { Node } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import {
  dig,
  register,
  useIds,
} from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import ontola from '../../../../Kernel/ontology/ontola';
import Detail from '../../../components/Detail';
import { useShowDialog } from '../../../hooks/useShowDialog';
import { retrievePath } from '../../../lib/iris';
import { isResource } from '../../../../Kernel/lib/typeCheckers';
import { contentDetailsTopology, detailsBarTopology } from '../../../topologies';

interface LocationDetailProps {
  linkedProp: Node;
}

const LocationDetail = ({ linkedProp }: LocationDetailProps): JSX.Element => {
  const [nestedPlacement] = useIds(linkedProp, dig(ontola.pages, as.items, rdfx.ns('_1')));
  const placement = nestedPlacement ?? (isResource(linkedProp) && linkedProp);
  const showDialog = useShowDialog(placement);

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
      onClick={showDialog}
    />
  );
};

LocationDetail.type = schema.Thing;

LocationDetail.property = schema.location;

LocationDetail.topology = [detailsBarTopology, contentDetailsTopology];

export default register(LocationDetail);
