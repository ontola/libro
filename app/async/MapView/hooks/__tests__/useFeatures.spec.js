import { createTheme } from '@material-ui/core/styles';

import { toFeature } from '../useFeatures';

describe('useFeatures', () => {
  describe('toFeature', () => {
    it('', () => {
      const theme = createTheme();
      const image = {
        termType: 'NamedNode',
        value: 'image3',
      };
      const feature = toFeature('id5', 15, 23.3, image, theme, true, 6.8);
      expect(feature.getId()).toBe('id5');
      expect(feature.getProperties().image.value).toBe('image3');
      expect(feature.values_.visited).toBe(true);
    });
  })
})
