import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import {
  Property,
  Resource,
  array,
  useIds,
} from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { navBarMessages } from '../../../../translations/messages';
import { usePriorityNavigation } from '../../../Common/hooks/usePriorityNavigation';
import { frontendIRI } from '../../../Kernel/lib/frontendIRIComponents';
import ontola from '../../../Kernel/ontology/ontola';
import { Trigger } from '../../../Menu/components/DropdownMenu/TriggerButton';
import { TriggerButtonNavBar } from '../../../Menu/components/DropdownMenu/TriggerButtonNavBar';
import AppMenu, { AppMenuChildProps } from '../../../Menu/topologies/AppMenu';

export const navBarContentItemsCID = 'CID-NavBarContentItems';

interface NavbarNavigationsMenuProps {
  navBarRef: React.RefObject<HTMLDivElement>;
}

const useStyles = makeStyles({
  navBarContentItems: {
    display: 'flex',
    flexGrow: 1,
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

const NavbarNavigationsMenu = ({ navBarRef }: NavbarNavigationsMenuProps): JSX.Element => {
  const classes = useStyles();
  const [navigationsMenu] = useIds(frontendIRI, ontola.navigationsMenu);
  const menuItems = useIds(navigationsMenu, array(ontola.menuItems));

  const { addObservedItem, hiddenItems } = usePriorityNavigation(navBarRef.current, menuItems);

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
          {menuItems?.map((iri) => (
            <Resource
              addObservedItem={addObservedItem}
              key={iri.value}
              subject={iri}
            />
          ))}
        </div>
        {(hiddenItems.length > 0) && (
          <AppMenu trigger={createTrigger(classes)}>
            {({ handleClose }: AppMenuChildProps) => hiddenItems?.map((iri) => (
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
