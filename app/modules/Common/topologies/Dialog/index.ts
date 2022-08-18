import { createTopologyProvider } from 'link-redux';

import { alertDialogTopology } from '../index';

/**
 * Sets a dialog topology.
 * Defaults to an [alert dialog](https://material.io/design/components/dialogs.html#alert-dialog)
 */
const Dialog = createTopologyProvider(alertDialogTopology);

export default Dialog;
