import {
  TDescendant,
  TElement,
  TText,
} from '@udecode/plate';

import { elementsMap } from '../mapping';
import { use } from '../use';

import {
  AnyElementsElement,
  ElementsDeepRecord,
  isAElement,
  isActionItemElement,
  isButtonElement,
  isGridElement,
  isImgElement,
  isInnerText,
  isPElement,
  isRowElement,
} from './toElementsDeepRecord';

const ensureChildTextNode = (element: TElement, text = '') => {
  if (element.children.length === 0) {
    element.children.push({ text });
  }
};

export const toDescendant = (record: ElementsDeepRecord | AnyElementsElement): TDescendant => {
  if (isInnerText(record)) {
    const innerText: TText = {
      text: record.text!.value,
    };

    use(record['https://ns.ontola.io/elements#bold'], (it) => {
      innerText.bold = it.value === 'true';
    });

    use(record['https://ns.ontola.io/elements#italic'], (it) => {
      innerText.italic = it.value === 'true';
    });

    use(record['https://ns.ontola.io/elements#underline'], (it) => {
      innerText.underline = it.value === 'true';
    });

    use(record['https://ns.ontola.io/elements#color'], (it) => {
      innerText.color = it.value;
    });

    use(record['https://ns.ontola.io/elements#backgroundColor'], (it) => {
      innerText.backgroundColor = it.value;
    });

    return innerText;
  }

  const element: TElement = {
    children: record.children.map(toDescendant),
    type: elementsMap[record.type.value],
  };

  if (isAElement(record)) {
    element.url = record['https://ns.ontola.io/core#href'].value;
  }

  if (isPElement(record)) {
    use(record['https://ns.ontola.io/elements#align'], (it) => {
      element.align = it.value;
    });
    use(record['https://ns.ontola.io/elements#indent'], (it) => {
      element.indent = Number(it.value);
    });
  }

  if (isActionItemElement(record)) {
    use(record['https://ns.ontola.io/elements#checked'], (it) => {
      element.checked = it.value === 'true';
    });
  }

  if (isActionItemElement(record)) {
    use(record['https://ns.ontola.io/elements#checked'], (it) => {
      element.checked = it.value === 'true';
    });
  }

  if (isButtonElement(record)) {
    use(record['http://schema.org/image'], (it) => {
      element.image = it.value;
    });
    use(record['https://ns.ontola.io/elements#variant'], (it) => {
      element.variant = it.value;
    });
    use(record['https://ns.ontola.io/elements#iconPosition'], (it) => {
      element.iconPosition = it.value;
    });
    use(record['https://ns.ontola.io/elements#color'], (it) => {
      element.color = it.value;
    });
    use(record['https://ns.ontola.io/elements#href'], (it) => {
      element.href = it.value;
    });
    use(record['https://argu.co/ns/core#trackingId'], (it) => {
      element.trackingId = it.value;
    });
    ensureChildTextNode(element, record['http://schema.org/text']?.value ?? '');
  }

  if (isGridElement(record)) {
    use(record['https://ns.ontola.io/elements#gap'], (it) => {
      element.gap = it.value;
    });

    use(record['https://ns.ontola.io/elements#minWidth'], (it) => {
      element.minWidth = it.value;
    });

    ensureChildTextNode(element);
  }

  if (isRowElement(record)) {
    use(record['https://ns.ontola.io/elements#gap'], (it) => {
      element.gap = it.value;
    });

    use(record['https://ns.ontola.io/elements#alignment'], (it) => {
      element.alignment = it.value;
    });

    ensureChildTextNode(element);
  }

  if (isImgElement(record)) {
    use(record['https://ns.ontola.io/core#imgUrl568x400'], (it) => {
      element.url = it.value;
    });

    use(record['https://ns.ontola.io/core#format/avif'], (it) => {
      element.avif = it.value;
    });
    use(record['https://ns.ontola.io/core#format/apng'], (it) => {
      element.apng = it.value;
    });
    use(record['https://ns.ontola.io/core#format/png'], (it) => {
      element.png = it.value;
    });
    use(record['https://ns.ontola.io/core#format/webp'], (it) => {
      element.webp = it.value;
    });
    use(record['https://ns.ontola.io/core#format/gif'], (it) => {
      element.gif = it.value;
    });
    use(record['https://ns.ontola.io/core#format/jpg'], (it) => {
      element.jpg = it.value;
    });
    use(record['https://ns.ontola.io/core#format/svg'], (it) => {
      element.svg = it.value;
    });

    element.url = element.svg
      ?? element.avif
      ?? element.webp
      ?? element.apng
      ?? element.gif
      ?? element.png
      ?? element.jpg
      ?? element.url;

    use(record['https://ns.ontola.io/elements#width'], (it) => {
      element.width = Number(it.value);
    });
    use(record['https://ns.ontola.io/elements#caption'], (it) => {
      element.caption = [
        { text: it.value },
      ];
    });
    use(record['https://ns.ontola.io/core#ariaLabel'], (it) => {
      element.caption = it.value;
    });

    ensureChildTextNode(element);
  }

  return element;
};
