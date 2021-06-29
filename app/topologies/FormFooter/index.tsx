import { withStyles } from '@material-ui/styles';
import { ClassNameMap } from '@material-ui/styles/withStyles/withStyles';
import clsx from 'clsx';
import { TopologyProvider } from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import { CSSPropertiesMap, LibroTheme } from '../../themes/themes';

export const formFooterTopology = argu.formFooter;

const styles = (theme: LibroTheme): CSSPropertiesMap => ({
  borderTop: {
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
});

interface PropTypes {
  borderTop?: boolean;
  classes: ClassNameMap;
}

class FormFooter extends TopologyProvider<PropTypes> {
  constructor(props: PropTypes) {
    super(props);

    this.topology = formFooterTopology;
  }

  public render() {
    const className = clsx({
      [this.props.classes.borderTop]: this.props.borderTop,
      [this.props.classes.wrapper]: true,
    });

    return this.wrap((
      <div className={className}>
        {this.props.children}
      </div>
    ));
  }
}

export default withStyles(styles)(FormFooter);
