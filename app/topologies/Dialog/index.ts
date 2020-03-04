import ontola from '../../ontology/ontola';
import Topology from '../Topology';

export const alertDialogTopology = ontola.ns('dialog/alert');

/**
 * Sets a dialog topology.
 * Defaults to an [alert dialog](https://material.io/design/components/dialogs.html#alert-dialog)
 */
class Dialog extends Topology {
  constructor(props: {}) {
    super(props);

    this.topology = alertDialogTopology;
  }
}

export default Dialog;
