import DataType from './DataType';
import Error from './Error';
import ErrorResponse from './ErrorResponse';
import Loading from './Loading';
import PropertyQuery from './PropertyQuery';
import RDFProperty from './RDFProperty';
import RDFSClass from './RDFSClass';
import SeqComp from './Seq';

export default [
  ...DataType,
  ...Error,
  ...ErrorResponse,
  ...RDFProperty,
  ...RDFSClass,
  ...Loading,
  ...PropertyQuery,
  ...SeqComp,
];
