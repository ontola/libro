import { FulfilledRequestStatus } from 'link-lib/dist-types/types';
import {
  FC,
  register,
  useActionById,
  useIds,
  useLRS,
} from 'link-redux';

import httph from '../../../../ontology/httph';
import link from '../../../../ontology/link';
import { fullResourceTopology } from '../../topologies';

/**
 * Renders documents which don't have another type.
 *
 * These generally are resources without body or in error state.
 */
const DocumentFull: FC = ({ subject }) => {
  const lrs = useLRS();
  const { lastResponseHeaders } = lrs.getStatus(subject) as FulfilledRequestStatus;
  const [action] = useIds(lastResponseHeaders ?? undefined, httph['exec-action']);
  const execAction = useActionById(action);

  if (execAction) {
    execAction();
  }

  return null;
};

DocumentFull.type = link.Document;

DocumentFull.topology = fullResourceTopology;

export default register(DocumentFull);
