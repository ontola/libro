import deepmerge from 'deepmerge';

import variables from '../../Common/theme/variables';

const customVariables = deepmerge(
  variables, {
    appBar: {
      height: '2.7rem',
      position: 'relative',
    },
  },
);

export default customVariables;
