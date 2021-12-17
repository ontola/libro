import Button from '@material-ui/core/Button';
import * as as from '@ontologies/as';
import {
  FC,
  Resource,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import qb from '../../../ontology/qb';
import { Size } from '../../../themes/themes';
import Container from '../../../topologies/Container';
import { tabPaneTopology } from '../../../topologies/TabPane';

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

  return(
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

DataSetTabPane.type = qb.DataSet;

DataSetTabPane.topology = tabPaneTopology;

export default register(DataSetTabPane);
