import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MaterialMenuItem from '@material-ui/core/MenuItem';
import { linkType, subjectType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import Image from '../Image';
import Link from '../Link';

const propTypes = {
  action: PropTypes.func,
  children: PropTypes.node,
  icon: linkType,
  subject: subjectType,
  url: linkType,
};

const MenuItem = ({
  action,
  children,
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
    </MaterialMenuItem>
  );
};
MenuItem.propTypes = propTypes;

export default MenuItem;
