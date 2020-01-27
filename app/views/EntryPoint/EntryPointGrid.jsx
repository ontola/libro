import schema from '@ontologies/schema';
import {
  linkType,
  register,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { retrievePath } from '../../helpers/iris';
import Button from '../../components/Button';
import { gridTopology } from '../../topologies/Grid';

const EntryPointGrid = ({
  children,
  name,
  subject,
  url,
}) => {
  if (children) {
    return children;
  }
  const href = url?.value || subject.value;

  return (
    <Button
      href={retrievePath(href)}
      title={name.value}
    >
      {name.value}
    </Button>
  );
};

EntryPointGrid.type = schema.EntryPoint;

EntryPointGrid.topology = gridTopology;

EntryPointGrid.mapDataToProps = {
  name: schema.name,
  url: schema.url,
};

EntryPointGrid.propTypes = {
  children: PropTypes.element,
  name: linkType,
  subject: subjectType,
  url: linkType,
};

export default register(EntryPointGrid);
