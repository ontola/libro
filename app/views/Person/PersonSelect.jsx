import foaf from '@ontologies/foaf';
import schema from '@ontologies/schema';
import rdfx from '@ontologies/rdf';
import rdfs from '@ontologies/rdfs';
import {
  Property,
  linkType,
  lrsType,
  register,
} from 'link-redux';
import React from 'react';
import PropTypes from 'prop-types';

import { ResourceBoundary } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import { selectTopology } from '../../topologies/Select';

const PersonSelect = ({
  'aria-selected': ariaSelected,
  className,
  element,
  id,
  itemClass,
  lrs,
  onClick,
  onMouseDown,
  onMouseMove,
  role,
  style,
  wrapperProps,
}) => {
  const defaultWrapperProps = () => ({
    'aria-selected': ariaSelected,
    className: `SelectItem ${className} SelectPerson`,
    element: element || 'li',
    id,
    onClick,
    onMouseDown,
    onMouseMove,
    role,
    style,
  });
  const labels = [schema.name, rdfs.label, foaf.name];

  const label = lrs.getResourceProperty(itemClass, ontola.ns('forms/inputs/select/displayProp'));

  if (label) {
    labels.unshift(label);
  }

  return (
    <ResourceBoundary wrapperProps={wrapperProps || defaultWrapperProps()}>
      <Property label={schema.image} />
      <Property label={labels} />
    </ResourceBoundary>
  );
};

PersonSelect.type = [
  schema.Person,
  NS.aod('Persons'),
  argu.ns('Page'),
];

PersonSelect.topology = selectTopology;

PersonSelect.mapDataToProps = {
  itemClass: rdfx.type,
};

PersonSelect.propTypes = {
  'aria-selected': PropTypes.bool,
  className: PropTypes.string,
  element: PropTypes.string,
  id: PropTypes.string,
  itemClass: linkType,
  lrs: lrsType,
  onClick: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseMove: PropTypes.func,
  role: PropTypes.string,
  style: PropTypes.shape({}),
  wrapperProps: PropTypes.shape({}),
};

export default register(PersonSelect);
