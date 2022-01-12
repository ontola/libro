import useMediaQuery from '@material-ui/core/useMediaQuery';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { makeStyles, useTheme } from '@material-ui/styles';
import clsx from 'clsx';
import {
  Property,
  Resource,
  array,
  useIds,
} from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { frontendIRI } from '../../ontology/app';
import ontola from '../../ontology/ontola';
import { LibroTheme } from '../../themes/themes';
import AppMenu from '../../topologies/AppMenu';
import { navBarMessages } from '../../translations/messages';
import { Trigger } from '../DropdownMenu/TriggerButton';
import { TriggerButtonNavBar } from '../DropdownMenu/TriggerButtonNavBar';

export const navBarContentItemsCID = 'CID-NavBarContentItems';

const useStyles = makeStyles({
  itemPusher: {
    display: 'flex',
    height: '100%',
  },
  navBarContentItems: {
    display: 'flex',
    flexWrap: 'wrap',
    height: '100%',
    maxHeight: '100%',
    overflow: 'hidden',
  },
  triggerButtonIcon: {
    transition: 'transform 100ms ease',
  },
  triggerButtonIconOpen: {
    transform: 'rotateZ(180deg)',
  },
});

const createTrigger: (classes: ReturnType<typeof useStyles>) => Trigger = (classes) => (props) => {
  const iconClassName = clsx({
    [classes.triggerButtonIcon]: true,
    [classes.triggerButtonIconOpen]: props.open,
  });

  return (
    <TriggerButtonNavBar
      {...props}
      endIcon={<ArrowDropDownIcon className={iconClassName} />}
    >
      <FormattedMessage {...navBarMessages.moreDropdownButton} />
    </TriggerButtonNavBar>
  );
};

const NavbarNavigationsMenu = (): JSX.Element => {
  const classes = useStyles();
  const theme = useTheme<LibroTheme>();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [navigationsMenu] = useIds(frontendIRI, ontola.navigationsMenu);
  const menuItems = useIds(navigationsMenu, array(ontola.menuItems));

  return (
    <Resource
      forceRender
      subject={frontendIRI}
    >
      <Property label={ontola.navigationsMenu}>
        <div
          className={clsx(
            navBarContentItemsCID,
            classes.navBarContentItems,
          )}
        >
          <div className={classes.itemPusher} />
          {menuItems?.map((iri) => (
            <Resource
              key={iri.value}
              subject={iri}
            />
          ))}
        </div>
        {isMobile && (
          <AppMenu trigger={createTrigger(classes)}>
            {({ handleClose }) => menuItems?.map((iri) => (
              <Resource
                hideIcon
                childProps={{
                  onClose: handleClose,
                }}
                key={iri.value}
                subject={iri}
              />
            ))}
          </AppMenu>
        )}
      </Property>
    </Resource>
  );
};

export default NavbarNavigationsMenu;
