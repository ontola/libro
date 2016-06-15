import './hoverable.scss';
import React, { PropTypes } from 'react';
import { Box } from '../';
import classNames from 'classnames';

const propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
};

class Hoverable extends React.Component {
  constructor() {
    super();
    this.state = {
      top: null,
      left: null,
    };
  }

  getPos = () => {
    const elem = document.getElementById(`hoverable-${this.props.id}`);
    const position = elem.getBoundingClientRect();
    
    this.setState({
      top: position.top,
      left: position.left,
    });
  }

  componentDidMount() {
    this.getPos();
  }

  render() {
    const { id, children, content, onShow, onRemove } = this.props;
    const data = {
      content: content,
      top: Math.round(this.state.top),
      left: Math.round(this.state.left),
    };

    return (
      <div id={`hoverable-${id}`} className="Hoverable">
        <div className="Hoverable__children">
          <a
            href="javascript:void(0)"
            onClick={e => {
              e.preventDefault();
              onShow(data);
            }}
          >
            {children}
          </a>
        </div>
      </div>
    );
  }
}


Hoverable.propTypes = propTypes;
// Hoverable.defaultProps = defaultProps;

export default Hoverable;
