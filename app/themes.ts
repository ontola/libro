import { LIBRO_THEMES } from './LibroThemes';
import { generateStyle } from './modules/Common/theme/generateStyle';
import common from './modules/Common/theme';
import dutchGovernment from './modules/DutchGovernment/theme';
import groenLinks from './modules/GroenLinks/theme';
import salesWebsite from './modules/SalesWebsite/theme';

export default {
  [LIBRO_THEMES.COMMON]: generateStyle(common),
  [LIBRO_THEMES.DUTCHGOVERNMENT]: generateStyle(dutchGovernment),
  [LIBRO_THEMES.GROENLINKS]: generateStyle(groenLinks),
  [LIBRO_THEMES.SALES]: generateStyle(salesWebsite),
};
