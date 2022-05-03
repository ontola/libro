/**
 * @jest-environment jsdom
 */

import parseToGraph from '../../../lib/parseToGraph';
import { childrenToSource } from '../projectToSource';
import { subResourcesFromData } from '../subResourcesFromData';

describe('integration', () => {
  it('produces parsable output', () => {
    const empJson = JSON.stringify({
      'http://schema.org/encodingFormat': {
        '_id': {
          type: 'id',
          v: 'http://schema.org/encodingFormat',
        },
        'http://schema.org/comment': {
          type: 's',
          v: '\\n\\nIn',
        },
      },
    });

    const children = subResourcesFromData(empJson, 'https://schema.org', {});
    const source = childrenToSource(children);

    expect(() => {
      parseToGraph(source, 'http://schema.org/');
    }).not.toThrow();
    expect(source).toEqual(`[
({
  "@id": schema.encodingFormat.value,
  [schema.comment]: "\\\\n\\\\nIn",
})
]`);
  });

  it('parses source', () => {
    const empJson = JSON.stringify({
      'http://schema.org/encodingFormat': {
        '_id': {
          type: 'id',
          v: 'http://schema.org/encodingFormat',
        },
        'http://schema.org/comment': {
          type: 's',
          v: JSON.stringify({
            breadcrumbParent: 'Omgevingsveiligheid',
            breadcrumbParentUrl: 'https://omgevingsveiligheid.rivm.nl',
            footerResources: 'https://maatregelenwiki.nl/media_objects/67,https://maatregelenwiki.nl/custom_menu_items/24',
            primaryLine: 'Rijksinstituut voor Volksgezondheid en Milieu',
            secondaryLine: 'Ministerie van Volksgezondheid,\\nWelzijn en Sport',
          }),
        },
      },
    });

    const children = subResourcesFromData(empJson, 'https://schema.org', {});
    const source = childrenToSource(children);

    expect(() => {
      parseToGraph(source, 'http://maatregelenwiki.nl');
    }).not.toThrow();

    expect(source).toEqual(`[
({
  "@id": schema.encodingFormat.value,
  [schema.comment]: "{\\"breadcrumbParent\\":\\"Omgevingsveiligheid\\",\\"breadcrumbParentUrl\\":\\"https://omgevingsveiligheid.rivm.nl\\",\\"footerResources\\":\\"https://maatregelenwiki.nl/media_objects/67,https://maatregelenwiki.nl/custom_menu_items/24\\",\\"primaryLine\\":\\"Rijksinstituut voor Volksgezondheid en Milieu\\",\\"secondaryLine\\":\\"Ministerie van Volksgezondheid,\\\\\\\\nWelzijn en Sport\\"}",
})
]`);
  });
});
