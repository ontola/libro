import * as foaf from '@ontologies/foaf'
import * as rdfx from '@ontologies/rdf'
import * as rdfs from '@ontologies/rdfs'
import * as schema from '@ontologies/schema'
import {
  linkType,
  register,
  subjectType,
  useFields,
  useLink,
  useProperty
} from 'link-redux'
import PropTypes from 'prop-types'
import React from 'react'

import ResourceBoundary from '../../components/ResourceBoundary'
import ontola from '../../ontology/ontola'
import { selectTopology } from '../../topologies/Select'

const ThingSelect = ({
  'aria-selected': ariaSelected,
  className,
  element,
  id,
  onClick,
  onMouseDown,
  onMouseMove,
  role,
  style,
  subject,
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

  const [itemClass] = useProperty(rdfx.type);
  const [labelProp] = useFields(itemClass, ontola['forms/inputs/select/displayProp']);

  if (labelProp) {
    labels.unshift(labelProp);
  }

  const { label } = useLink({ label: labels });

  return (
    <ResourceBoundary wrapperProps={wrapperProps || defaultWrapperProps()}>
      {(label || subject).value}
    </ResourceBoundary>
  );
};

ThingSelect.type = schema.Thing;

ThingSelect.topology = selectTopology;

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
  subject: subjectType,
  wrapperProps: PropTypes.shape({}),
};

export default register(ThingSelect);
