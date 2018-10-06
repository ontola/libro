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
    let child, key;

    if (queue && queue.elements.length > 0) {
      const next = queue.shift();
      key = next.value;

      child = style => (
        <animated.div
          className="Snackbar__item"
          style={style}
        >
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
        enter={{ bottom: '1rem', opacity: 1 }}
        from={{ bottom: '-2rem', opacity: 0 }}
        key={key}
        leave={{ bottom: '-2rem', opacity: 0 }}
      >
        {child}
      </Transition>
    );
  }
}

export default register(SnackbarManager);
