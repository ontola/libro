import deepmerge from 'deepmerge';

import variables from '../../common/theme/variables';

const customVariables = deepmerge(
  variables, {
    appBar: {
      height: '4.7rem',
      iconBreakPoint: 'xl',
      maxWidth: false,
      position: 'fixed',
    },
    palette: {
      background: {
        default: '#ede4e5',
      },
      mapIcon: {
        background: '#533bff',
        backgroundHover: '#3d2db3',
        text: 'white',
      },
    },
    shape: {
      borderRadius: 0,
    },
  }
);

export default customVariables;
