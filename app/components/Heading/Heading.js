import './heading.scss';
import React, {Component} from 'react';

export default class Heading extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const Element = `h${this.props.size}`;
    return (
      <Element className="heading">{this.props.children}</Element>
    );
  }
}

Heading.propTypes = {
  children: React.PropTypes.node.isRequired,
  size: React.PropTypes.oneOf(['1', '2', '3', '4', '5', '6'])
};

Heading.defaultProps = {
  children: 'No title specified',
  size: '2'
};
