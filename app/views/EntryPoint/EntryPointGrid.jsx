import schema from '@ontologies/schema';
import {
  Property,
  linkType,
  register,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { retrievePath } from '../../helpers/iris';
import Button from '../../components/Button';
import GridHeader from '../../components/Grid/GridHeader';
import ontola from '../../ontology/ontola';
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
    <React.Fragment>
      <Property label={schema.isPartOf}>
        <GridHeader header={<Property label={schema.name} />}>
          <Property label={ontola.updateAction} onLoad={() => null} />
        </GridHeader>
        <Property label={schema.text} />
      </Property>
      <Button
        href={retrievePath(href)}
        title={name.value}
      >
        {name.value}
      </Button>
    </React.Fragment>
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
