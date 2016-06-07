import './box.scss';
import React, { PropTypes } from 'react';
import { Button } from '../';

function Box({ children, buttons }) {
  const generateButtons = buttons.map(button =>
    <Button
      key={button.label}
      onClick={button.action}
      icon={button.icon}
      children={button.label}
      theme="box"
    />
  );

  return (
    <div className="box">
      <div className="box__content">{children}</div>
      <div className="box__actions">{generateButtons}</div>
    </div>
  );
}

Box.propTypes = {
  children: PropTypes.node.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.object),
};

Box.defaultProps = {
  children: [],
  buttons: [],
};

export default Box;
