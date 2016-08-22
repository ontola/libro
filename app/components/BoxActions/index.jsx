import './BoxActions.scss';
import React, { PropTypes } from 'react';
import { Button } from 'components';
import { sides } from 'components/shared/config';

const propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string,
    label: PropTypes.string.isRequired,
    side: PropTypes.oneOf(sides),
    action: PropTypes.func.isRequired,
  })).isRequired,
};

const BoxActions = ({
  buttons,
}) => (
  <div className="BoxActions">
    {buttons.map((button, i) =>
      <Button
        key={i}
        onClick={() => button.action()}
        icon={button.icon}
        children={button.label}
        theme="box"
        variant={button.side}
      />
    )}
  </div>
);

BoxActions.propTypes = propTypes;

export default BoxActions;
