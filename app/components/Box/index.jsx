// @flow
import './box.scss';
import React, { PropTypes } from 'react';
import { Button } from '../';
import classNames from 'classnames';

const propTypes = {
  children: PropTypes.node.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.object),
  ghost: PropTypes.bool,
};

const defaultProps = {
  children: [],
  buttons: [],
  ghost: false,
};

function Box({ children, buttons, ghost }) {
  const boxClass = classNames({
    'box': true,
    'box--ghost': ghost,
  });

  const generateButtons = buttons.map(button =>
    <Button
      key={button.label}
      onClick={button.action}
      icon={button.icon}
      children={button.label}
      theme="box"
    />
  );

  const renderButtons = () => {
    if(generateButtons.length === 0) {
      return false;
    } else {
      return (
        <div className="box__actions">{generateButtons}</div>
      );
    }
  }

  return (
    <div className={boxClass}>
      <div className="box__content">{children}</div>
      {renderButtons()}
    </div>
  );
}

Box.propTypes = propTypes;
Box.defaultProps = defaultProps;

export default Box;
