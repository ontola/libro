import CommonHeader from './common/header';
import DexTransferHeader from './dexTransfer/header';
import DutchGovernmentHeader from './dutchGovernment/header';
import GroenLinksHeader from './groenLinks/header';
import { LIBRO_THEMES } from './LibroThemes';

export default {
  [LIBRO_THEMES.COMMON]: CommonHeader,
  [LIBRO_THEMES.DEXTRANSFER]: DexTransferHeader,
  [LIBRO_THEMES.DUTCHGOVERNMENT]: DutchGovernmentHeader,
  [LIBRO_THEMES.GROENLINKS]: GroenLinksHeader,
};
