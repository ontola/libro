import Button from '@mui/material/Button';
import * as as from '@ontologies/as';
import {
  FC,
  Resource,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import { tabPaneTopology } from '../../../Common/topologies';
import datacube from '../../ontology/datacube';
import { Size } from '../../../Kernel/lib/themes';
import Container from '../../../Common/topologies/Container';

export interface DataSetTabPaneProps {
  nextPage?: () => void;
  previousPage?: () => void;
}

const DataSetTabPane: FC<DataSetTabPaneProps> = ({
  nextPage,
  previousPage,
  subject,
}) => {
  const [next] = useProperty(as.next);
  const [previous] = useProperty(as.prev);

  return (
    <Container size={Size.Large}>
      <Resource subject={subject} />
      {nextPage && previous && (
        <Button onClick={previousPage}>
          previous
        </Button>
      )}
      {previousPage && next && (
        <Button onClick={nextPage}>
          next
        </Button>
      )}
    </Container>
  );
};

DataSetTabPane.type = datacube.DataSet;

DataSetTabPane.topology = tabPaneTopology;

export default register(DataSetTabPane);
