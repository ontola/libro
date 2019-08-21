import { makeStyles } from '@material-ui/styles';

import variables from '../../themes/common/variables';

export default makeStyles({
  button: {
    borderRadius: '0',
    minWidth: 'auto',
    padding: '.5rem 1rem',
  },
  root: {
    backgroundColor: variables.grey.xxLight,
  },
});
