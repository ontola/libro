import {
  register,
  subjectType,
  useLRS,
  useResourceProperty,
} from 'link-redux';

import httph from '../../ontology/httph';
import link from '../../ontology/link';
import { fullResourceTopology } from '../../topologies/FullResource';

/**
 * Renders documents which don't have another type.
 *
 * These generally are resources without body or in error state.
 */
const DocumentFull = ({ subject }) => {
  const lrs = useLRS();
  const { lastResponseHeaders } = lrs.getStatus(subject);
  const action = useResourceProperty(lastResponseHeaders, httph['exec-action']);

  if (action) {
    lrs.exec(action);
  }

  return null;
};

DocumentFull.type = link.Document;

DocumentFull.topology = fullResourceTopology;

DocumentFull.propTypes = {
  subject: subjectType,
};

export default [
  register(DocumentFull),
];
