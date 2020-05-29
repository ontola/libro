import Button from '@material-ui/core/Button';
import as from '@ontologies/as';
import {
  Resource,
  linkType,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import qb from '../../../ontology/qb';
import { cardTopology } from '../../../topologies/Card';
import Container from '../../../topologies/Container';
import { tabPaneTopology } from '../../../topologies/TabPane';

const DataSetTabPane = ({
  next,
  nextPage,
  previous,
  previousPage,
  subject,
}) => (
  <Container size="large">
    <Resource subject={subject} topology={cardTopology} />
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

DataSetTabPane.propTypes = {
  next: linkType,
  nextPage: PropTypes.func,
  previous: linkType,
  previousPage: PropTypes.func,
  subject: subjectType,
};

export default DataSetTabPane;
