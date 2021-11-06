/**
 * @jest-environment jsdom
 */

import parseToGraph from '../../../lib/parseToGraph';
import { childrenToSource } from '../projectToSource';
import { subResourcesFromData } from '../subResourcesFromData';

describe('integration', () => {

  it('produces parsable output', () => {
    const hextuples = '["http://schema.org/encodingFormat","http://schema.org/comment",".\\n\\nIn","http://www.w3.org/2001/XMLSchema#string","",""]';

    const children = subResourcesFromData(hextuples, 'https://schema.org');
    const source = childrenToSource(children);

    expect(() => {
      parseToGraph(source, 'http://maatregelenwiki.nl');
    }).not.toThrow();
  });

  it('parses source', () => {

    const hextuples = '["http://schema.org/encodingFormat","http://schema.org/comment","{\\"breadcrumbParent\\":\\"Omgevingsveiligheid\\",\\"breadcrumbParentUrl\\":\\"https://omgevingsveiligheid.rivm.nl\\",\\"primaryLine\\":\\"Rijksinstituut voor Volksgezondheid en Milieu\\",\\"secondaryLine\\":\\"Ministerie van Volksgezondheid,\\\\nWelzijn en Sport\\",\\"footerResources\\":\\"https://maatregelenwiki.nl/media_objects/67,https://maatregelenwiki.nl/custom_menu_items/24\\"}","http://www.w3.org/2001/XMLSchema#string","",""]';

    const children = subResourcesFromData(hextuples, 'https://schema.org');
    const source = childrenToSource(children);

    expect(() => {
      parseToGraph(source, 'http://maatregelenwiki.nl');
    }).not.toThrow();
  });
});
