import { LIBRO_THEMES } from './LibroThemes';
import AcademyHeader from './modules/Academy/theme/header';
import CommonHeader from './modules/Common/theme/header';
import DutchGovernmentHeader from './modules/DutchGovernment/theme/header';
import GroenLinksHeader from './modules/GroenLinks/theme/header';
import SalesHeader from './modules/SalesWebsite/theme/header';

export default {
  [LIBRO_THEMES.ACADEMY]: AcademyHeader,
  [LIBRO_THEMES.COMMON]: CommonHeader,
  [LIBRO_THEMES.DUTCHGOVERNMENT]: DutchGovernmentHeader,
  [LIBRO_THEMES.GROENLINKS]: GroenLinksHeader,
  [LIBRO_THEMES.SALES]: SalesHeader,
};
