import Category from './Category';
import Employment from './Employment';
import Incident from './Incident';
import Intervention from './Intervention';
import InterventionType from './InterventionType';
import Measure from './Measure';
import MeasureType from './MeasureType';
import Risk from './Risk';
import Scenario from './Scenario';

export default [
  ...Category,
  ...Employment,
  ...Incident,
  ...Intervention,
  ...InterventionType,
  ...Measure,
  ...MeasureType,
  ...Risk,
  ...Scenario,
];
