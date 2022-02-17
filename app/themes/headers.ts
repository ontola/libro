import AcademyHeader from './academy/header';
import CommonHeader from './common/header';
import DexesHeader from './dexes/header';
import DutchGovernmentHeader from './dutchGovernment/header';
import GroenLinksHeader from './groenLinks/header';
import SalesHeader from './salesWebsite/header';
import { LIBRO_THEMES } from './LibroThemes';

export default {
  [LIBRO_THEMES.ACADEMY]: AcademyHeader,
  [LIBRO_THEMES.COMMON]: CommonHeader,
  [LIBRO_THEMES.DEXES]: DexesHeader,
  [LIBRO_THEMES.DUTCHGOVERNMENT]: DutchGovernmentHeader,
  [LIBRO_THEMES.GROENLINKS]: GroenLinksHeader,
  [LIBRO_THEMES.SALES]: SalesHeader,
};
