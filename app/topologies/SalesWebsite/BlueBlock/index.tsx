import { withStyles } from '@material-ui/styles';

import sales from '../../../ontology/sales';
import { SalesTheme } from '../../../themes/salesWebsite/SalesThemeProvider';
import Container, { ContainerProps } from '../../Container';

export const blueBlockTopology = sales.ns('blueBlock');

const styles = (theme: SalesTheme) => ({
  root: {
    background: theme.palette.primary.main,
    padding: 40,
  },
});

type BlueBlockProps = ContainerProps & Record<string, unknown>;

class BlueBlock extends Container {
  constructor(props: BlueBlockProps) {
    super(props);

    this.className = (props.classes as { root: string}).root;
    this.topology = blueBlockTopology;
  }
}

// TODO
// @ts-ignore
export default withStyles(styles)(BlueBlock);
