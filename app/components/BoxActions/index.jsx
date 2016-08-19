// @flow
import './BoxActions.scss';
import React, { PropTypes } from 'react';
import { Button } from 'components';

const propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.string,
};

const BoxActions = ({
  buttons,
  id,
}) => (
  <div className="BoxActions">
    {buttons.map((button, i) =>
      <Button
        key={i}
        onClick={() => button.action({
          motionId: id,
          side: button.side,
        })}
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
