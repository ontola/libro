import schema from '@ontologies/schema';
import {
  linkType,
  register,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { retrievePath } from '../../helpers/iris';
import { widgetTopologyTopology } from '../../topologies/WidgetTopology/WidgetTopology';
import Button from '../../components/Button';

const EntryPointWidget = ({
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

EntryPointWidget.type = schema.EntryPoint;

EntryPointWidget.topology = widgetTopologyTopology;

EntryPointWidget.mapDataToProps = {
  name: schema.name,
  url: schema.url,
};

EntryPointWidget.propTypes = {
  children: PropTypes.element,
  name: linkType,
  subject: subjectType,
  url: linkType,
};

export default register(EntryPointWidget);
