import deepmerge from 'deepmerge';

import variables from '../../common/theme/variables';

const customVariables = deepmerge(
  variables, {
    palette: {
      background: {
        default: 'rgba(255, 255, 255, 0)',
      },
    },
  },
);

export default customVariables;
