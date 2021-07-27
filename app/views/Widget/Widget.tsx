import { Literal } from '@ontologies/core';
import HttpStatus from 'http-status-codes';
import { SomeNode } from 'link-lib';
import {
  FC,
  Property,
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

interface WidgetProps {
  topology: SomeNode;
  widgetSize: Literal;
}

const Widget: FC<WidgetProps> = ({ topology, widgetSize }) => {
  const size = tryParseInt(widgetSize);
  const childProps = React.useMemo(() => ({
    onError: handleErrorStatuses([HttpStatus.FORBIDDEN]),
  }), []);

  let Wrapper: React.ElementType;
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

export default register(Widget);
