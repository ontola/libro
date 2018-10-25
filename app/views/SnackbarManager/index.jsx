import {
  LinkedResourceContainer,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import { Collection } from 'rdflib';
import React from 'react';
import { animated, Transition } from 'react-spring';

import { NS } from '../../helpers/LinkedRenderStore';
import { allTopologies } from '../../topologies';

class SnackbarManager extends React.PureComponent {
  static type = NS.ontola('snackbar/Manager');

  static topology = allTopologies;

  static mapDataToProps = [NS.ontola('snackbar/queue')];

  static propTypes = {
    'snackbar/queue': PropTypes.instanceOf(Collection),
  };

  render() {
    const queue = this.props['snackbar/queue'];
    let items = [];

    if (queue && queue.elements.length > 0) {
      const next = queue.shift();
      items = [next];
    }

    return (
      <Transition
        native
        enter={{ bottom: '1rem', opacity: 1 }}
        from={{ bottom: '-2rem', opacity: 0 }}
        items={items}
        leave={{ bottom: '-2rem', opacity: 0 }}
      >
        {item => props => (
          <animated.div
            className="Snackbar__item"
            style={props}
          >
            <LinkedResourceContainer
              close={() => this.forceUpdate()}
              subject={item}
            />
          </animated.div>
        )}
      </Transition>
    );
  }
}

export default register(SnackbarManager);
