import { Property, register } from 'link-redux';
import React from 'react';
import PropTypes from 'prop-types';

import {
  Resource,
} from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { selectTopology } from '../../topologies/Select';

class ThingSelect extends React.PureComponent {
  static type = NS.schema('Thing');

  static topology = selectTopology;

  static propTypes = {
    'aria-selected': PropTypes.bool,
    className: PropTypes.string,
    id: PropTypes.string,
    onClick: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseMove: PropTypes.func,
    role: PropTypes.string,
    style: PropTypes.shape({}),
    wrapperProps: PropTypes.shape({}),
  };

  defaultWrapperProps() {
    const {
      'aria-selected': ariaSelected,
      className,
      id,
      onClick,
      onMouseDown,
      onMouseMove,
      role,
      style,
    } = this.props;

    return {
      'aria-selected': ariaSelected,
      className: `SelectItem ${className}`,
      id,
      onClick,
      onMouseDown,
      onMouseMove,
      role,
      style,
    };
  }

  render() {
    const wrapperProps = this.props.wrapperProps || this.defaultWrapperProps();

    return (
      <Resource element="li" wrapperProps={wrapperProps}>
        <Property label={[NS.schema('name'), NS.rdfs('label')]} />
      </Resource>
    );
  }
}

export default register(ThingSelect);
