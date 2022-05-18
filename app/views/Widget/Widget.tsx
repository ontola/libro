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
import { gridTopology } from '../../topologies';
import Container from '../../topologies/Container';
import FullResource from '../../topologies/FullResource';

const Widget = () => {
  const [changeTopology] = useProperty(ontola.topology);
  const [widgetSize] = useProperty(ontola.widgetSize);

  const size = tryParseInt(widgetSize);
  const childProps = React.useMemo(() => ({
    onError: handleErrorStatuses([HttpStatus.FORBIDDEN]),
  }), []);

  let Wrapper: React.ElementType;

  switch (changeTopology) {
  case argu.grid:
    Wrapper = React.Fragment;
    break;
  case argu.container:
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
