import rdf from '@ontologies/core';

import fullResourceTopologyComponent from '../../Common/topologies/FullResource';
import { TopologyMap } from '../../Kernel/lib/ontology';

import radioGroupTopologyComponent from './RadioGroup';
import selectTopologyComponent from './Select';

import {
  formFooterTopology,
  radioGroupTopology,
  selectTopology, 
} from './index';

export const topologyMap: TopologyMap = {
  [rdf.id(formFooterTopology)]: [fullResourceTopologyComponent, undefined],
  [rdf.id(radioGroupTopology)]: [radioGroupTopologyComponent, undefined],
  [rdf.id(selectTopology)]: [selectTopologyComponent, undefined],
};
