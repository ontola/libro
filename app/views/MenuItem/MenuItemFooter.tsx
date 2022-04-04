import { makeStyles } from '@material-ui/styles';
import { Literal } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  FC,
  Property,
  Resource,
  register,
  useIds,
  useLiterals,
} from 'link-redux';
import React from 'react';

import ResourceBoundary from '../../components/ResourceBoundary';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import { LibroTheme } from '../../themes/themes';
import { footerTopology } from '../../topologies';

const ITEM_SPACING = 3;

interface MenuItemFooterProps {
  nested?: boolean;
  onClick?: () => void;
}
interface MenuItemLabelProps extends MenuItemFooterProps {
  id: string;
  image?: SomeNode;
  menuItems?: SomeNode;
  name?: Literal;
}

const useStyles = makeStyles<LibroTheme>((theme) => ({
  item: {
    marginBottom: theme.spacing(ITEM_SPACING),
  },
}));

const MenuItemFooterLabel = ({
  id,
  image,
  name,
  nested,
  onClick,
}: MenuItemLabelProps): JSX.Element | null => {
  if (!name && !image) {
    return null;
  }

  return (
    <Property
      forceRender
      data-test="MenuItem-MenuItemLabel"
      handleClick={onClick}
      id={id}
      label={ontola.href}
    >
      <Property label={schema.image} />
      <Property
        label={schema.name}
        nested={nested}
      />
    </Property>
  );
};

const MenuItemFooter: FC<MenuItemFooterProps> = (props) => {
  const [image] = useIds(schema.image);
  const [menuItems] = useIds(ontola.menuItems);
  const [name] = useLiterals(schema.name);

  const classNames = useStyles();
  const {
    subject,
  } = props;
  const id = `${subject}-menu-items`;

  return (
    <div className={classNames.item}>
      <ResourceBoundary>
        <MenuItemFooterLabel
          {...props}
          id={id}
          image={image}
          menuItems={menuItems}
          name={name}
        />
        {menuItems && (
          <Resource
            childProps={{ nested: true }}
            subject={menuItems}
          />
        )}
      </ResourceBoundary>
    </div>
  );
};

MenuItemFooter.type = [
  ontola.MenuItem,
  argu.SubMenu,
  argu.Menu,
];

MenuItemFooter.topology = footerTopology;

export default register(MenuItemFooter);
