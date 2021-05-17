import deepmerge from 'deepmerge';

import variables from '../../common/theme/variables';

const customVariables = deepmerge(
  variables, {
    appBar: {
      height: '2.7rem',
    },
  },
);

export default customVariables;
