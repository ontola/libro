import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { makeStyles } from '@mui/styles';
import { Node } from '@ontologies/core';
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
import AppMenu from '../../topologies/AppMenu';
import { navBarMessages } from '../../translations/messages';
import { Trigger } from '../DropdownMenu/TriggerButton';
import { TriggerButtonNavBar } from '../DropdownMenu/TriggerButtonNavBar';

export const navBarContentItemsCID = 'CID-NavBarContentItems';

export type AddItemCallback = (iri: Node, ref: HTMLElement) => void;

type Observable = {
  domNode: HTMLElement;
  isVisible: boolean;
};

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

const usePriorityNavigation = (navBarRef: HTMLElement | null, menuItems: Node[]) => {
  const [observedItems, setObservedItems] = React.useState<Map<Node, Observable>>(new Map());
  const [_, forceUpdate] = React.useReducer((x) => x + 1, 0);

  const addObservedItem = React.useCallback((iri: Node, ref: HTMLElement) =>
    setObservedItems((current) => new Map(current.set(iri, {
      domNode: ref,
      isVisible: false,
    }))),
  []);

  React.useEffect(() => {
    const observer = new IntersectionObserver((changedEntries) => {
      for (const entry of changedEntries) {
        for (const [key, value] of observedItems) {
          if (value.domNode === entry.target) {
            observedItems.set(key, {
              domNode: value.domNode,
              isVisible: entry.isIntersecting,
            });
          }
        }
      }

      forceUpdate();
    }, {
      root: navBarRef,
      threshold: 0.5,
    });

    for (const [_key, value] of observedItems) {
      if (value.domNode) {
        observer.observe(value.domNode);
      }
    }

    return () => observer.disconnect();
  }, [observedItems]);

  const hiddenItems = menuItems.filter((iri: Node) => !observedItems.get(iri)?.isVisible);

  return {
    addObservedItem,
    hiddenItems,
  };
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
            {({ handleClose }) => hiddenItems.map((iri) => (
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
