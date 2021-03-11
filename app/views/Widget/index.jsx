import HttpStatus from 'http-status-codes';
import {
  Property,
  linkType,
  register,
} from 'link-redux';
import React from 'react';

import GridItem from '../../components/Grid/GridItem';
import { tryParseInt } from '../../helpers/numbers';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import Container from '../../topologies/Container';
import FullResource from '../../topologies/FullResource';
import { gridTopology } from '../../topologies/Grid';
import { handleErrorStatuses } from '../../components/Error';

const Widget = ({ topology, widgetSize }) => {
  const size = tryParseInt(widgetSize);
  const childProps = React.useMemo(() => ({
    onError: handleErrorStatuses([HttpStatus.FORBIDDEN]),
    renderWhenEmpty: true,
  }));

  let Wrapper;
  let wrapperOpts = {};
  switch (topology) {
  case argu.grid:
    Wrapper = GridItem;
    wrapperOpts = { size: 3 };
    break;
  case argu.container:
    Wrapper = Container;
    break;
  default:
    Wrapper = FullResource;
  }

  return (
    <GridItem size={size}>
      <Wrapper {...wrapperOpts}>
        <Property
          childProps={childProps}
          label={ontola.widgetResource}
        />
      </Wrapper>
    </GridItem>
  );
};

Widget.type = ontola.Widget;

Widget.topology = gridTopology;

Widget.mapDataToProps = {
  topology: ontola.topology,
  widgetSize: ontola.widgetSize,
};

Widget.propTypes = {
  topology: linkType,
  widgetSize: linkType,
};

export default [
  register(Widget),
];
