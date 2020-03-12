import MenuItem from '@material-ui/core/MenuItem';
import foaf from '@ontologies/foaf';
import rdfx from '@ontologies/rdf';
import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import {
  Property,
  linkType,
  register,
  useResourceProperty,
} from 'link-redux';
import React from 'react';
import PropTypes from 'prop-types';

import ResourceBoundary from '../../components/ResourceBoundary';
import ontola from '../../ontology/ontola';
import { selectTopology } from '../../topologies/Select';

const ThingSelect = ({
  'aria-selected': ariaSelected,
  className,
  element,
  id,
  itemClass,
  onClick,
  onMouseDown,
  onMouseMove,
  role,
  subject,
  style,
  wrapperProps,
}) => {
  const defaultWrapperProps = () => ({
    'aria-selected': ariaSelected,
    className: `SelectItem ${className}`,
    element: element || 'li',
    id,
    onClick,
    onMouseDown,
    onMouseMove,
    role,
    style,
  });

  const labels = [schema.name, rdfs.label, foaf.name];

  const [label] = useResourceProperty(itemClass, ontola.ns('forms/inputs/select/displayProp'));

  if (label) {
    labels.unshift(label);
  }

  return (
    <ResourceBoundary wrapperProps={wrapperProps || defaultWrapperProps()}>
      <MenuItem value={subject}>
        <Property label={labels} />
      </MenuItem>
    </ResourceBoundary>
  );
};

ThingSelect.type = schema.Thing;

ThingSelect.topology = selectTopology;

ThingSelect.mapDataToProps = {
  itemClass: rdfx.type,
};

ThingSelect.propTypes = {
  'aria-selected': PropTypes.bool,
  className: PropTypes.string,
  element: PropTypes.string,
  id: PropTypes.string,
  itemClass: linkType,
  onClick: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseMove: PropTypes.func,
  role: PropTypes.string,
  style: PropTypes.shape({}),
  wrapperProps: PropTypes.shape({}),
};

export default register(ThingSelect);
