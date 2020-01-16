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
import { NS } from '../../helpers/LinkedRenderStore';
import argu from '../../ontology/argu';
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
  const reactFinalForm = useForm();

  if (isMarkedForRemove(targetValue)) {
    return null;
  }

  let renderSubject = false;
  const placements = [];

  if (targetValue) {
    const lat = targetValue[calculateFormFieldName(schema.latitude)];
    const lon = targetValue[calculateFormFieldName(schema.longitude)];

    if (lat && lon) {
      placements.push({
        id: targetValue['@id'],
        image: NS.fa4('map-marker'),
        lat,
        lon,
      });
    } else if (targetValue['@id'].termType === 'NamedNode') {
      renderSubject = true;
    }
  }

  const storeCoordinates = (e) => {
    reactFinalForm.change(calculateFormFieldName(formContext, propertyIndex), targetValue);
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
