import foaf from '@ontologies/foaf';
import rdfx from '@ontologies/rdf';
import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import {
  Property,
  linkType,
  lrsType,
  register,
} from 'link-redux';
import React from 'react';
import PropTypes from 'prop-types';

import { Resource } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { selectTopology } from '../../topologies/Select';

const ThingSelect = ({
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

  const label = lrs.getResourceProperty(itemClass, NS.ontola('forms/inputs/select/displayProp'));

  if (label) {
    labels.unshift(label);
  }

  return (
    <Resource wrapperProps={wrapperProps || defaultWrapperProps()}>
      <Property label={labels} />
    </Resource>
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
  lrs: lrsType,
  onClick: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseMove: PropTypes.func,
  role: PropTypes.string,
  style: PropTypes.shape({}),
  wrapperProps: PropTypes.shape({}),
};

export default register(ThingSelect);
