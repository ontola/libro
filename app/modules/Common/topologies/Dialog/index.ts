import { createBasicTopologyProvider } from '../../../Kernel/lib/topology';
import libro from '../../../Kernel/ontology/libro';

export const alertDialogTopology = libro.ns('dialog/alert');

/**
 * Sets a dialog topology.
 * Defaults to an [alert dialog](https://material.io/design/components/dialogs.html#alert-dialog)
 */
const Dialog = createBasicTopologyProvider(alertDialogTopology);

export default Dialog;
