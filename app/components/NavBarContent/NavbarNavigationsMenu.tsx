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

import { frontendIRI } from '../../ontology/app';
import ontola from '../../ontology/ontola';
import AppMenu from '../../topologies/AppMenu';
import { navBarMessages } from '../../translations/messages';
import { Trigger } from '../DropdownMenu/TriggerButton';
import { TriggerButtonNavBar } from '../DropdownMenu/TriggerButtonNavBar';

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

const observeElements = (elements: HTMLElement[], observer: IntersectionObserver) => {
  elements.forEach((element) => {
    if (element) {
      observer.observe(element);
    }
  });
};

const NavbarNavigationsMenu = ({ navBarRef }: NavbarNavigationsMenuProps): JSX.Element => {
  const classes = useStyles();
  const [navigationsMenu] = useIds(frontendIRI, ontola.navigationsMenu);
  const menuItems = useIds(navigationsMenu, array(ontola.menuItems));
  const menuItemRefs = React.useRef<HTMLElement[]>([]);
  const [visibleItemRefs, setVisibleItemRefs] = React.useState<Set<Element>>(new Set(menuItemRefs.current));

  const observer = React.useMemo(() => new IntersectionObserver((changedEntries) => {
    for (const entry of changedEntries) {
      setVisibleItemRefs((prevRefs) => {
        if (entry.isIntersecting) {
          prevRefs.add(entry.target);
        }
        else {
          prevRefs.delete(entry.target);
        }

        return new Set(prevRefs);
      });
    }
  }, { root: navBarRef.current }), [navBarRef.current]);

  React.useEffect(() => {
    observeElements(menuItemRefs.current, observer);

    return () => {
      observer.disconnect();
      setVisibleItemRefs(new Set());
    };
  }, [menuItems]);

  const hiddenItems = menuItems.filter((_, index) => !visibleItemRefs.has(menuItemRefs.current[index]));

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
          {menuItems?.map((iri, index) => (
            <Resource
              key={iri.value}
              menuItemRef={(element: HTMLElement) => menuItemRefs.current[index] = element}
              subject={iri}
            />
          ))}
        </div>
        {(hiddenItems.length > 0) && (
          <AppMenu trigger={createTrigger(classes)}>
            {({ handleClose }) => hiddenItems?.map((iri) => (
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
