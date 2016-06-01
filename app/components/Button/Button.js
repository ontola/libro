import './button.scss';
import React, {Component} from 'react';
import classNames from 'classnames';

export default class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    let btnClass = classNames({
      'btn': true,
      'weight': this.props.weight,
      [`${this.props.theme}`]: true
    });

    return (
      <button {...this.props} className={btnClass}>{this.props.children}</button>
    );
  }
}

Button.propTypes = {
  theme: React.PropTypes.oneOf([
    'subtle',
    'pro',
    'con',
    'default'
  ]),
  weight: React.PropTypes.bool,
  children: React.PropTypes.node.isRequired
};

Button.defaultProps = {
  theme: 'default',
  weight: false,
  children: 'Joep'
};
