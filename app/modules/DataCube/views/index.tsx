/**
 * Data Cube vocabulary
 *
 * @desc This vocabulary allows multi-dimensional data, such as statistics, to be published in RDF.
 *        It is based on the core information model from SDMX (and thus also DDI).
 * @link https://raw.githubusercontent.com/UKGovLD/publishing-statistical-data/master/specs/src/main/vocab/cube.ttl
 * @link https://www.w3.org/TR/vocab-data-cube/
 */
import DataSetContainer from './DataSet/DataSetContainer';
import DataSetFull from './DataSet/DataSetFull';
import DataSetTabPane from './DataSet/DataSetTabPane';
import DownloadUrl from './DataSet/properties/downloadUrl';
import MeasurePropertyTableRow from './MeasureProperty/MeasurePropertyTableRow';
import ObservationTableBody from './Observation/ObservationTableBody';

export default [
  ...DataSetFull,
  ...DataSetContainer,
  ...DataSetTabPane,
  ...DownloadUrl,
  ...MeasurePropertyTableRow,
  ...ObservationTableBody,
];
