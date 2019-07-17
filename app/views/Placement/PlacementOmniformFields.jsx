import {
  linkType,
  lrsType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import { NamedNode } from 'rdflib';
import React from 'react';
import { useForm } from 'react-final-form';

import { FormContext } from '../../components/Form/Form';
import { FormSectionContext } from '../../components/Form/FormSection';
import OmniformRemoveButton from '../../components/Omniform/OmniformRemoveButton';
import MapView from '../../containers/MapView';
import { calculateFormFieldName, isMarkedForRemove } from '../../helpers/forms';
import { NS } from '../../helpers/LinkedRenderStore';
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
    const lat = targetValue[calculateFormFieldName(NS.schema('latitude'))];
    const lon = targetValue[calculateFormFieldName(NS.schema('longitude'))];

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
      calculateFormFieldName(formContext, propertyIndex, NS.schema('latitude')),
      e[1]
    );
    reactFinalForm.change(
      calculateFormFieldName(formContext, propertyIndex, NS.schema('longitude')),
      e[0]
    );
  };

  return (
    <div className="PlacementOmniformFields">
      <OmniformRemoveButton removeItem={removeItem} />
      <MapView
        lrs={lrs}
        placements={placements}
        renderSubject={renderSubject}
        subject={NamedNode.find(formID)}
        onMapClick={storeCoordinates}
      />
    </div>
  );
};

PlacementOmniformFields.type = NS.argu('Placement');

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
