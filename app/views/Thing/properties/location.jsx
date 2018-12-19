import LinkedRenderStore, { namedNodeByIRI } from 'link-lib';
import { linkedPropType, lrsType } from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Detail, LDLink } from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';
import { detailsBarTopology } from '../../../topologies/DetailsBar';

const propTypes = {
  linkedProp: linkedPropType,
  lrs: lrsType,
};

const LocationDetail = ({ lrs, linkedProp }) => (
  <LDLink
    to={linkedProp.value}
    onClick={(e) => {
      e.preventDefault();
      lrs.exec(namedNodeByIRI(`${NS.ontola('actions/dialog/alert').value}?resource=${encodeURIComponent(linkedProp.value)}`));
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

LocationDetail.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  LocationDetail,
  NS.schema('Thing'),
  NS.schema('location'),
  detailsBarTopology
);
