import {
  lrsType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import { BlankNode, NamedNode } from 'rdflib';
import React from 'react';
import { withReactFinalForm } from 'react-final-form';

import { FormContext } from '../../components/Form/Form';
import { FormSectionContext } from '../../components/Form/FormSection';
import OmniformRemoveButton from '../../components/Omniform/OmniformRemoveButton';
import MapView from '../../containers/MapView';
import { calculateFieldName } from '../../helpers/forms';
import { NS } from '../../helpers/LinkedRenderStore';
import { omniformFieldsTopology } from '../../topologies/OmniformFields/OmniformFields';

import './PlacementOmniformFields.scss';

const PlacementOmniformFields = ({
  lrs,
  propertyIndex,
  reactFinalForm,
  removeItem,
}) => {
  const formID = React.useContext(FormContext);
  const formContext = React.useContext(FormSectionContext);
  // TODO: Store the coordinates in the form state.
  const [coordinate, setCoordinate] = React.useState(undefined);
  const placements = [];

  if (coordinate) {
    placements.push({
      id: new BlankNode(),
      image: NS.fa4('map-marker'),
      lat: coordinate[1],
      lon: coordinate[0],
    });
  }

  const storeCoordinates = (e) => {
    // TODO: Extract and use logic from PropertyShape etc, should make `setCoordinate` superfluous
    reactFinalForm.change(
      calculateFieldName(formContext, propertyIndex, NS.schema('latitude')),
      e[1]
    );
    reactFinalForm.change(
      calculateFieldName(formContext, propertyIndex, NS.schema('longitude')),
      e[0]
    );

    setCoordinate(e);
  };

  return (
    <div className="PlacementOmniformFields">
      <OmniformRemoveButton removeItem={removeItem} />
      <MapView
        lrs={lrs}
        placements={placements}
        subject={NamedNode.find(formID)}
        onMapClick={storeCoordinates}
      />
    </div>
  );
};

PlacementOmniformFields.type = NS.argu('Placement');

PlacementOmniformFields.topology = omniformFieldsTopology;

PlacementOmniformFields.hocs = [withReactFinalForm];

PlacementOmniformFields.propTypes = {
  lrs: lrsType,
  propertyIndex: PropTypes.number,
  reactFinalForm: PropTypes.shape({
    change: PropTypes.func,
  }),
  removeItem: PropTypes.func,
};

export default register(PlacementOmniformFields);
