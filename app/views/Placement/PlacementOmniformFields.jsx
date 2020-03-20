import rdf from '@ontologies/core';
import schema from '@ontologies/schema';
import {
  linkType,
  lrsType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-final-form';

import { FormContext } from '../../components/Form/Form';
import { FormSectionContext } from '../../components/Form/FormSection';
import OmniformRemoveButton from '../../components/Omniform/OmniformRemoveButton';
import MapView from '../../containers/MapView';
import { calculateFormFieldName, isMarkedForRemove } from '../../helpers/forms';
import argu from '../../ontology/argu';
import fa4 from '../../ontology/fa4';
import { omniformFieldsTopology } from '../../topologies/OmniformFields/OmniformFields';

import './PlacementOmniformFields.scss';

const PlacementOmniformFields = ({
  lrs,
  propertyIndex,
  removeItem,
  targetValue,
}) => {
  const formID = React.useContext(FormContext);
  const formContext = React.useContext(FormSectionContext);
  const fieldName = calculateFormFieldName(formContext, propertyIndex);
  const latFieldName = calculateFormFieldName(schema.latitude);
  const lonFieldName = calculateFormFieldName(schema.longitude);
  const reactFinalForm = useForm();

  if (isMarkedForRemove(targetValue)) {
    return null;
  }

  let renderSubject = false;
  const placements = [];

  let lat, lon;
  if (targetValue) {
    lat = targetValue[latFieldName];
    lon = targetValue[lonFieldName];

    if (lat && lon) {
      placements.push({
        id: targetValue['@id'],
        image: fa4.ns('map-marker'),
        lat,
        lon,
      });
    } else if (targetValue['@id'].termType === 'NamedNode') {
      renderSubject = true;
    }
  }

  const storeCoordinates = (e) => {
    reactFinalForm.change(fieldName, targetValue);
    reactFinalForm.change(
      calculateFormFieldName(formContext, propertyIndex, schema.latitude),
      e[1]
    );
    reactFinalForm.change(
      calculateFormFieldName(formContext, propertyIndex, schema.longitude),
      e[0]
    );
  };

  return (
    <div className="PlacementOmniformFields">
      {removeItem && <OmniformRemoveButton removeItem={removeItem} />}
      <input
        required
        className="hidden-field"
        id={latFieldName}
        name={latFieldName}
        type="text"
        value={lat}
      />
      <input
        required
        className="hidden-field"
        id={lonFieldName}
        name={lonFieldName}
        type="text"
        value={lon}
      />
      <MapView
        lrs={lrs}
        placements={placements}
        renderSubject={renderSubject}
        subject={rdf.namedNode(formID)}
        onMapClick={storeCoordinates}
      />
    </div>
  );
};

PlacementOmniformFields.type = argu.Placement;

PlacementOmniformFields.topology = omniformFieldsTopology;

PlacementOmniformFields.propTypes = {
  lrs: lrsType,
  propertyIndex: PropTypes.number,
  reactFinalForm: PropTypes.shape({
    change: PropTypes.func,
  }),
  removeItem: PropTypes.func,
  targetValue: PropTypes.shape({
    '@id': linkType,
  }),
};

export default register(PlacementOmniformFields);
