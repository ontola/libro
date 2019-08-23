import {
  linkType,
  register,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { retrievePath } from '../../helpers/iris';
import { NS } from '../../helpers/LinkedRenderStore';
import { widgetTopologyTopology } from '../../topologies/WidgetTopology/WidgetTopology';
import Button from '../../components/Button';

const ActionWidget = ({
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
    <div>
      <Button
        href={retrievePath(href)}
        title={name && name.toString()}
      >
        {name.value}
      </Button>
    </div>
  );
};

ActionWidget.type = NS.schema('Action');

ActionWidget.topology = widgetTopologyTopology;

ActionWidget.mapDataToProps = [
  NS.schema('name'),
  NS.schema('url'),
];

ActionWidget.propTypes = {
  children: PropTypes.element,
  name: linkType,
  subject: subjectType,
  url: linkType,
};

export default register(ActionWidget);
