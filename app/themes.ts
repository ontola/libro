import { LIBRO_THEMES } from './LibroThemes';
import common from './modules/Common/theme';
import { generateStyle } from './modules/Common/theme/generateStyle';
import dutchGovernment from './modules/DutchGovernment/theme';
import salesWebsite from './modules/SalesWebsite/theme';

export default {
  [LIBRO_THEMES.COMMON]: generateStyle(common),
  [LIBRO_THEMES.DUTCHGOVERNMENT]: generateStyle(dutchGovernment),
  [LIBRO_THEMES.SALES]: generateStyle(salesWebsite),
};
