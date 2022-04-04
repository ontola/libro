import { alertDialogTopology } from '../../topologies';
import Topology from '../Topology';

/**
 * Sets a dialog topology.
 * Defaults to an [alert dialog](https://material.io/design/components/dialogs.html#alert-dialog)
 */
class Dialog extends Topology {
  constructor(props: Record<string, unknown>) {
    super(props);

    this.topology = alertDialogTopology;
  }
}

export default Dialog;
