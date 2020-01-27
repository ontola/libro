import {
  Property,
  linkType,
  register,
} from 'link-redux';
import React from 'react';

import GridItem from '../../components/Grid/GridItem';
import { tryParseInt } from '../../helpers/numbers';
import ontola from '../../ontology/ontola';
import { gridTopology } from '../../topologies/Grid';

const Widget = ({ widgetSize }) => {
  const size = tryParseInt(widgetSize);

  return (
    <GridItem size={size}>
      <GridItem size={3}>
        <Property label={ontola.widgetResource} />
      </GridItem>
    </GridItem>
  );
};

Widget.type = ontola.Widget;

Widget.topology = gridTopology;

Widget.mapDataToProps = {
  widgetSize: ontola.widgetSize,
};

Widget.propTypes = {
  widgetSize: linkType,
};

export default [
  register(Widget),
];
