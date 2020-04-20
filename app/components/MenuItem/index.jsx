import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MaterialMenuItem from '@material-ui/core/MenuItem';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { linkType, subjectType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import Image from '../Image';
import Link from '../Link';

const propTypes = {
  action: PropTypes.func,
  allowExternal: PropTypes.bool,
  children: PropTypes.node,
  expandOpen: PropTypes.bool,
  icon: linkType,
  innerRef: PropTypes.func,
  subject: subjectType,
  url: linkType,
};

const MenuItem = ({
  action,
  allowExternal,
  children,
  expandOpen,
  icon,
  innerRef,
  subject,
  url,
}) => {
  const isButton = !!(action || url);
  const actionSafeURL = action && !url ? subject.value : url;
  const component = !isButton
    ? React.forwardRef((props, nestedRef) => {
      // eslint-disable-next-line no-unused-vars,react/prop-types
      const { tabIndex, ...otherProps } = props;

      return (
        <li ref={nestedRef} {...otherProps} />
      );
    })
    : React.forwardRef((props, nestedRef) => (
      <Link
        allowExternal={allowExternal}
        ref={nestedRef}
        {...props}
        theme="menu"
        to={actionSafeURL}
      />
    ));

  return (
    <MaterialMenuItem
      button={isButton}
      component={component}
      ref={innerRef}
      onClick={action}
    >
      {icon && (
        <ListItemIcon>
          <Image linkedProp={icon} />
        </ListItemIcon>
      )}
      <ListItemText>
        {children}
      </ListItemText>
      {expandOpen !== null && (expandOpen ? <ExpandLess /> : <ExpandMore />)}
    </MaterialMenuItem>
  );
};

MenuItem.propTypes = propTypes;

export default React.forwardRef((props, ref) => <MenuItem innerRef={ref} {...props} />);
