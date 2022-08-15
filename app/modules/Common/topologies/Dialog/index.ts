import { createBasicTopologyProvider } from '../../../Kernel/lib/topology';
import { alertDialogTopology } from '../index';

/**
 * Sets a dialog topology.
 * Defaults to an [alert dialog](https://material.io/design/components/dialogs.html#alert-dialog)
 */
const Dialog = createBasicTopologyProvider(alertDialogTopology);

export default Dialog;
