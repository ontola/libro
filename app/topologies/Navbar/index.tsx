import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import {
  WithStyles,
  withStyles,
  withTheme, 
} from '@material-ui/styles';
import clsx from 'clsx';
import React from 'react';
import { WrappedComponentProps, injectIntl } from 'react-intl';

import app from '../../ontology/app';
import { CSSPropertiesMap, LibroTheme } from '../../themes/themes';
import { landmarkMessages } from '../../translations/messages';
import Topology from '../Topology';

export const navbarTopology = app.ns('topologies/navbar');

interface NavbarProps {
  theme: any;
  fullWidth?: boolean;
  elevated?: boolean;
}

const styles = (theme: LibroTheme): CSSPropertiesMap => ({
  elevated: {
    boxShadow: `0px 4.5px 4.3px rgba(0, 0, 0, 0.05),
                0px 12.5px 11.9px rgba(0, 0, 0, 0.032),
                0px 30.1px 28.6px rgba(0, 0, 0, 0.024),
                0px 100px 95px rgba(0, 0, 0, 0.016)`,
  },
  wrapper: {
    color: theme.appBar.resolveColor(),
    zIndex: theme.zIndex.appBar + 1,
  },
});

type PropType = NavbarProps & WithStyles<typeof styles> & WrappedComponentProps;

class Navbar extends Topology<PropType> {
  constructor(props: PropType) {
    super(props);

    this.topology = navbarTopology;
  }

  getClassName(): string | undefined {
    return clsx({
      [this.props.classes.wrapper]: true,
      [this.props.classes.elevated]: this.props.elevated,
    });
  }

  public renderContent() {
    const {
      background,
      height,
      maxWidth,
      position,
    } = this.props.theme.appBar;

    const ToolbarWrapper = this.props.fullWidth ? 'div' : Container;
    const toolbarWrapperProps = this.props.fullWidth ? {} : { maxWidth };

    return this.wrap((subject) => (
      <React.Fragment>
        <AppBar
          className={this.getClassName()}
          color={background}
          elevation={0}
          position={position}
          resource={subject && subject.value}
        >
          <nav
            aria-label={this.props.intl.formatMessage(landmarkMessages.navigationBar)}
            role="navigation"
          >
            <ToolbarWrapper {...toolbarWrapperProps}>
              <Toolbar
                disableGutters
                variant="dense"
              >
                {this.props.children}
              </Toolbar>
            </ToolbarWrapper>
          </nav>
        </AppBar>
        {position === 'fixed' && <div style={{ height }} />}
      </React.Fragment>
    ));
  }
}

export default withTheme(
  withStyles(styles)(
    injectIntl(Navbar),
  ),
);
