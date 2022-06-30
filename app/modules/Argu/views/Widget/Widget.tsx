import HttpStatus from 'http-status-codes';
import {
  Property,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import { handleErrorStatuses } from '../../../Common/components/Error';
import GridItem from '../../../Common/components/Grid/GridItem';
import { tryParseInt } from '../../../Common/lib/numbers';
import Container from '../../../Common/topologies/Container';
import FullResource from '../../../Common/topologies/FullResource';
import { gridTopology } from '../../../Common/topologies/Grid';
import libro from '../../../Core/ontology/libro';
import ontola from '../../../Core/ontology/ontola';

const Widget = () => {
  const [changeTopology] = useProperty(ontola.topology);
  const [widgetSize] = useProperty(ontola.widgetSize);

  const size = tryParseInt(widgetSize);
  const childProps = React.useMemo(() => ({
    onError: handleErrorStatuses([HttpStatus.FORBIDDEN]),
  }), []);

  let Wrapper: React.ElementType;

  switch (changeTopology) {
  case libro.topologies.grid:
    Wrapper = React.Fragment;
    break;
  case libro.topologies.container:
    Wrapper = Container;
    break;
  default:
    Wrapper = FullResource;
  }

  return (
    <Wrapper>
      <GridItem size={size}>
        <Property
          childProps={childProps}
          label={ontola.widgetResource}
        />
      </GridItem>
    </Wrapper>
  );
};

Widget.type = ontola.Widget;

Widget.topology = gridTopology;

export default register(Widget);
