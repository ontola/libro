import LinkedRenderStore from 'link-lib';
import {
  linkedPropType,
  lrsType,
  withLRS,
} from 'link-redux';
import { NamedNode } from 'rdflib';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Detail, LDLink } from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';
import { detailsBarTopology } from '../../../topologies/DetailsBar';

const propTypes = {
  linkedProp: linkedPropType,
  lrs: lrsType,
};

const LocationDetail = ({ lrs, linkedProp }) => {
  const placement = lrs.dig(linkedProp, [NS.ontola('pages'), NS.as('items'), NS.rdf('_1')]).pop();

  if (!placement) {
    return null;
  }

  return (
    <LDLink
      to={placement.value}
      onClick={(e) => {
        e.preventDefault();
        lrs.exec(NamedNode.find(`${NS.ontola('actions/dialog/alert').value}?resource=${encodeURIComponent(placement.value)}`));
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
  NS.schema('Thing'),
  NS.schema('location'),
  detailsBarTopology
);
