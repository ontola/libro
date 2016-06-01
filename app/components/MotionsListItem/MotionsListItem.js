//import './motionsListItem.scss';
import React from 'react';
import { Link } from 'react-router';

export default class MotionsListItem extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { identifier, title } = this.props.motion;

    return (
      <li>
        <Link to={`/motion/${identifier}`}>{title}</Link>
      </li>
    );
  }
}

MotionsListItem.propTypes = {
  motion: React.PropTypes.shape({
    identifier: React.PropTypes.number,
    title: React.PropTypes.string
  })
};
