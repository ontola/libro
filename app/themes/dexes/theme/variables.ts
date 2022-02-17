import deepmerge from 'deepmerge';

import variables from '../../common/theme/variables';

const customVariables = deepmerge(
  variables, {
    palette: {
      background: {
        default: 'none',
      },
    },
  },
);

export default customVariables;
