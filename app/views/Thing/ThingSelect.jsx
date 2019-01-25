import {
  linkType,
  lrsType,
  Property,
  register,
} from 'link-redux';
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

  static mapDataToProps = {
    itemClass: NS.rdf('type'),
  };

  static propTypes = {
    'aria-selected': PropTypes.bool,
    className: PropTypes.string,
    id: PropTypes.string,
    itemClass: linkType,
    lrs: lrsType,
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
    const { lrs, itemClass } = this.props;

    const wrapperProps = this.props.wrapperProps || this.defaultWrapperProps();

    const labels = [NS.schema('name'), NS.rdfs('label')];

    const label = lrs.getResourceProperty(itemClass, NS.ontola('forms/inputs/select/displayProp'));

    if (label) {
      labels.unshift(label);
    }

    return (
      <Resource element="li" wrapperProps={wrapperProps}>
        <Property label={labels} />
      </Resource>
    );
  }
}

export default register(ThingSelect);
