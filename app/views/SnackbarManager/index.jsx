import {
  LinkedResourceContainer,
  linkType,
  register,
} from 'link-redux';
import React from 'react';
import { animated, Transition } from 'react-spring';

import { NS } from '../../helpers/LinkedRenderStore';
import { allTopologies } from '../../topologies';

class SnackbarManager extends React.PureComponent {
  static type = NS.ontola('snackbar/Manager');

  static topology = allTopologies;

  static mapDataToProps = [NS.ontola('snackbar/queue')];

  static propTypes = {
    'snackbar/queue': linkType,
  };

  render() {
    const queue = this.props['snackbar/queue'];
    let child;

    if (queue && queue.elements.length > 0) {
      const next = queue.shift();

      child = style => (
        <animated.div style={style}>
          <LinkedResourceContainer
            close={() => this.forceUpdate()}
            subject={next}
          />
        </animated.div>
      );
    }

    return (
      <Transition
        native
        enter={{ bottom: '3rem', position: 'fixed', right: '1rem' }}
        from={{ bottom: '-6rem', position: 'fixed', right: '1rem' }}
        leave={{ bottom: '-6rem', position: 'fixed', right: '1rem' }}
      >
        {child}
      </Transition>
    );
  }
}

export default register(SnackbarManager);
