import { makeStyles } from '@material-ui/styles';

import { colors } from '../../themes/common/variables';
import hoverHighlight from '../../themes/stylelets';

export default makeStyles((theme) => ({
  button: {
    ...hoverHighlight(theme),
    borderRadius: '0',
    minWidth: 'auto',
    padding: '.5rem 1rem',
  },
  root: {
    backgroundColor: colors.grey.xxLight,
  },
}));
