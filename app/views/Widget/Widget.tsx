import HttpStatus from 'http-status-codes';
import {
  Property,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import { handleErrorStatuses } from '../../components/Error';
import GridItem from '../../components/Grid/GridItem';
import { tryParseInt } from '../../helpers/numbers';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import Container from '../../topologies/Container';
import FullResource from '../../topologies/FullResource';
import { gridTopology } from '../../topologies/Grid';

const Widget = () => {
  const [topology] = useProperty(ontola.topology);
  const [widgetSize] = useProperty(ontola.widgetSize);

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

export default register(Widget);
