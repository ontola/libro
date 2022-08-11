import { LinkReduxLRSType } from 'link-redux';

import type { GenerateLRSOpts } from '../../../helpers/generateLRS';
import { getMetaContent } from '../../Kernel/lib/dom';

import { initializeCable, subscribeDeltaChannel } from './websockets';

export const initialize = (lrs: LinkReduxLRSType, options: GenerateLRSOpts): void => {
  const websocketPath = !__TEST__ && getMetaContent('websocket-path');

  if (__CLIENT__ && websocketPath && !localStorage.getItem('_libro_disable_ws') && options.middleware) {
    initializeCable(lrs, websocketPath).then(() => {
      subscribeDeltaChannel(lrs, 'UserChannel');
      subscribeDeltaChannel(lrs, 'RootChannel');
    });
  }
};
