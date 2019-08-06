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
  children: PropTypes.node,
  expandOpen: PropTypes.bool,
  icon: linkType,
  subject: subjectType,
  url: linkType,
};

const defaultProps = {
  expandOpen: null,
};

const MenuItem = ({
  action,
  children,
  expandOpen,
  icon,
  subject,
  url,
}) => {
  const isButton = !!(action || url);
  const actionSafeURL = action && !url ? subject : url;
  const component = !isButton
    ? (props) => {
      // eslint-disable-next-line no-unused-vars,react/prop-types
      const { tabIndex, ...otherProps } = props;

      return (
        <li {...otherProps} />
      );
    }
    : props => <Link {...props} to={actionSafeURL} />;

  return (
    <MaterialMenuItem
      button={isButton}
      component={component}
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
MenuItem.defaultProps = defaultProps;

export default MenuItem;
