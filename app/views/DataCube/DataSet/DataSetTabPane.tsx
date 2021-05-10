import Button from '@material-ui/core/Button';
import * as as from '@ontologies/as';
import { SomeNode } from 'link-lib';
import {
  FC,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import { Size } from '../../../components/shared/config';
import qb from '../../../ontology/qb';
import Container from '../../../topologies/Container';
import { tabPaneTopology } from '../../../topologies/TabPane';

export interface DataSetTabPaneProps {
  next?: SomeNode;
  nextPage?: () => void;
  previous?: SomeNode;
  previousPage?: () => void;
}

const DataSetTabPane: FC<DataSetTabPaneProps> = ({
  next,
  nextPage,
  previous,
  previousPage,
  subject,
}) => (
  <Container size={Size.Large}>
    <Resource subject={subject} />
    {nextPage && previous && <Button onClick={previousPage}>previous</Button>}
    {previousPage && next && <Button onClick={nextPage}>next</Button>}
  </Container>
);

DataSetTabPane.type = qb.DataSet;

DataSetTabPane.topology = tabPaneTopology;

DataSetTabPane.mapDataToProps = {
  next: as.next,
  previous: as.prev,
};

export default register(DataSetTabPane);
