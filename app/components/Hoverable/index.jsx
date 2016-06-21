import './hoverable.scss';
import React, { PropTypes } from 'react';

const propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node,
  content: PropTypes.node,
  onShow: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

class Hoverable extends React.Component {
  constructor() {
    super();
    this.state = {
      top: null,
      left: null,
    };
  }

  componentDidMount() {
    this.getPos();
  }

  getPos() {
    const elem = document.getElementById(`hoverable-${this.props.id}`);
    const pos = elem.getBoundingClientRect();

    this.setState({
      top: Math.round(pos.top),
      left: Math.round(pos.left),
    });
  }

  render() {
    const { id, children, content, onShow, onRemove } = this.props;
    const data = {
      content,
      top: this.state.top,
      left: this.state.left,
    };

    // window.addEventListener('resize', function(){
    //   this.getPos();
    // }.bind(this), true);

    return (
      <div
        id={`hoverable-${id}`}
        className="Hoverable"
        onMouseEnter={() => { onShow(data); }}
        onMouseLeave={() => { onRemove(); }}
      >
        <div className="Hoverable__children">
          {children}
        </div>
      </div>
    );
  }
}

Hoverable.propTypes = propTypes;
// Hoverable.defaultProps = defaultProps;

export default Hoverable;
