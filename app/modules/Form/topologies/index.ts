import rdf from '@ontologies/core';

import { cardTopology } from '../../Common/topologies/Card';
import { cardMainTopology } from '../../Common/topologies/Card/CardMain';
import fullResourceTopologyComponent from '../../Common/topologies/FullResource';
import { mainBodyTopology } from '../../Common/topologies/MainBody';
import { TopologyMap } from '../../Kernel/lib/ontology';
import { flowTopology } from '../../Flow/topologies/Flow';
import { omniformFieldsTopology } from '../../Omniform/topologies/OmniformFields/OmniformFields';

import { formFooterTopology } from './FormFooter';
import radioGroupTopologyComponent, { radioGroupTopology } from './RadioGroup';
import selectTopologyComponent, { selectTopology } from './Select';
import { selectedValueTopology } from './SelectedValue';

export const formTopologies = [
  cardMainTopology,
  cardTopology,
  formFooterTopology,
  mainBodyTopology,
  omniformFieldsTopology,
];

export const formFieldTopologies = [
  ...formTopologies,
  flowTopology,
];

export const topologyMap: TopologyMap = {
  [rdf.id(formFooterTopology)]: [fullResourceTopologyComponent, undefined],
  [rdf.id(radioGroupTopology)]: [radioGroupTopologyComponent, undefined],
  [rdf.id(selectTopology)]: [selectTopologyComponent, undefined],
};

export default [
  formFooterTopology,
  radioGroupTopology,
  selectTopology,
  selectedValueTopology,
];
