import {
  cardMainTopology,
  cardTopology,
  mainBodyTopology,
} from '../../Common/topologies';
import { flowTopology } from '../../Flow/topologies';
import { omniformFieldsTopology } from '../../Omniform/topologies';
import form from '../ontology/form';

export const formFooterTopology = form.topologies.footer;
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

export const radioGroupTopology = form.topologies.radioGroup;
export const selectTopology = form.topologies.select;
export const selectedValueTopology = form.topologies.selectedValue;

export default [
  formFooterTopology,
  radioGroupTopology,
  selectTopology,
  selectedValueTopology,
];
