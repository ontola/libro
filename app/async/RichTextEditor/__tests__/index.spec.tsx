/* eslint-disable @typescript-eslint/no-namespace */
import {
  DEFAULTS_BOLD,
  DEFAULTS_CODE_BLOCK,
  DEFAULTS_HEADING,
  DEFAULTS_IMAGE,
  DEFAULTS_ITALIC,
  DEFAULTS_LINK,
  DEFAULTS_LIST,
  DEFAULTS_PARAGRAPH,
  DEFAULTS_UNDERLINE,
} from '@udecode/slate-plugins';
import {
  Browser,
  Page,
  chromium,
} from 'playwright';
import { getDocument, queries } from 'playwright-testing-library';
import { ElementHandle } from 'playwright-testing-library/lib/typedefs';

import {
  BOLD_COMMAND_KEY,
  CODE_BLOCK_COMMAND_KEY,
  HEADING1_COMMAND_KEY,
  HEADING2_COMMAND_KEY,
  HEADING3_COMMAND_KEY,
  IMAGE_COMMAND_KEY,
  ITALIC_COMMAND_KEY,
  LINK_COMMAND_KEY,
  ORDERED_LIST_COMMAND_KEY,
  UNDERLINE_COMMAND_KEY,
  UNORDERED_LIST_COMMAND_KEY,
} from '../plugins';

const { getByTestId, getByText } = queries;

const EDITOR_URL = 'https://argu.localdev/d/editor?test';
const LAUNCH_BROWSER_TIMEOUT = 30000;
const LOAD_PAGE_TIMEOUT = 30000;
const LOAD_ELEMENT_TIMEOUT = 10000;

// elements
const CODE_BLOCK_CLASS_NAME = DEFAULTS_CODE_BLOCK.code_block.rootProps.className!;
const HEADING1_CLASS_NAME = DEFAULTS_HEADING.h1.rootProps.className!;
const HEADING2_CLASS_NAME = DEFAULTS_HEADING.h2.rootProps.className!;
const HEADING3_CLASS_NAME = DEFAULTS_HEADING.h3.rootProps.className!;
const IMAGE_CLASS_NAME = DEFAULTS_IMAGE.img.rootProps.className!;
const LINK_CLASS_NAME = DEFAULTS_LINK.link.rootProps.className!;
const ORDERED_LIST_CLASS_NAME = DEFAULTS_LIST.ol.rootProps.className!;
const PARAGRAPH_CLASS_NAME = DEFAULTS_PARAGRAPH.p.rootProps.className!;
const UNORDERED_LIST_CLASS_NAME = DEFAULTS_LIST.ul.rootProps.className!;

// marks
const BOLD_CLASS_NAME = DEFAULTS_BOLD.bold.rootProps!.className!;
const ITALIC_CLASS_NAME = DEFAULTS_ITALIC.italic.rootProps!.className!;
const UNDERLINE_CLASS_NAME = DEFAULTS_UNDERLINE.underline.rootProps!.className!;

// Avoid special keys for code blocks as input (splits text nodes)
const INPUT = 'one two three';
const INPUT_FIRST_WORD = 'one';
const INPUT_LINK = 'https://ontola.io/';
const INPUT_IMAGE = 'https://argu.co/utrecht/media_objects/15514/content/content.jpg';

const elementsTable = [
  ['code block', CODE_BLOCK_COMMAND_KEY, CODE_BLOCK_CLASS_NAME],
  ['heading level 1', HEADING1_COMMAND_KEY, HEADING1_CLASS_NAME],
  ['heading level 2', HEADING2_COMMAND_KEY, HEADING2_CLASS_NAME],
  ['heading level 3', HEADING3_COMMAND_KEY, HEADING3_CLASS_NAME],
  ['ordered list', ORDERED_LIST_COMMAND_KEY, ORDERED_LIST_CLASS_NAME],
  ['unordered list', UNORDERED_LIST_COMMAND_KEY, UNORDERED_LIST_CLASS_NAME],
];

const marksTable = [
  ['bold', BOLD_COMMAND_KEY, BOLD_CLASS_NAME],
  ['italic', ITALIC_COMMAND_KEY, ITALIC_CLASS_NAME],
  ['underline', UNDERLINE_COMMAND_KEY, UNDERLINE_CLASS_NAME],
];

declare global {
  namespace jest {
    interface Matchers<R> {
      hasElementWithTextNode(className: string, index: number, text: string): R;
      hasNrOfElements(nrOfElements: number, className?: string): R;
    }
  }
}

expect.extend({
  hasElementWithTextNode: async (container: ElementHandle, className: string, index: number, text: string) => {
    const elements = await container.$$(`css=.${className}`);
    if (elements.length < index) {
      return {
        message: () =>
          `expected element with class name '${className}' and index = ${index}`,
        pass: false,
      };
    }
    const element = elements[index - 1];

    let pass;
    if (text === '') {
      pass = await element.$('css=span[data-slate-length="0"]');
    } else {
      pass = await getByText(element, text);
    }
    if (pass) {
      return {
        message: () =>
          `expected no text node '${text}'`,
        pass: true,
      };
    }

    return {
      message: () =>
        `expected text node '${text}'`,
      pass: false,
    };

  },

  hasNrOfElements: async (container: ElementHandle, nrOfElements: number, className?: string) => {
    const count = className ?
      await container.$$eval(
        `.${className}`,
        (elements) => elements.length,
      ) :
      await container.$$eval(
        'css=div >> css=[data-slate-node=element]',
        (elements) => elements.length,
      );
    if (count === nrOfElements) {
      return {
        message: () =>
          `expected not ${nrOfElements} elements with class name '${className}'`,
        pass: true,
      };
    }

    return {
      message: () =>
        `expected ${nrOfElements}, not ${count} elements with class name '${className}'`,
      pass: false,
    };

  },
});

describe('RichTextEditor', () => {
  let browser: Browser;
  let page: Page;
  let $document: ElementHandle;
  let editor: ElementHandle;
  let toolbar: ElementHandle;

  beforeAll(async () => {
    browser = await chromium.launch({
      args: ['--ignore-certificate-errors'],
      headless: true,
    });
  }, LAUNCH_BROWSER_TIMEOUT);

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    if (!page) {
      page = await browser.newPage();
      await page.goto(EDITOR_URL);
    } else {
      await page.reload();
    }
    $document = await getDocument(page);
    // Never null with default option { state: visible }:
    editor = (await page.waitForSelector('[role=textbox]', { timeout: LOAD_ELEMENT_TIMEOUT }))!;
    toolbar = (await page.waitForSelector('.Toolbar', { timeout: LOAD_ELEMENT_TIMEOUT }))!;
  }, LOAD_PAGE_TIMEOUT);

  it('starts with just one empty paragraph', async () => {
    await expect(editor).hasNrOfElements(1);
    await expect(editor).hasNrOfElements(1, PARAGRAPH_CLASS_NAME);
    await expect(editor).hasElementWithTextNode(PARAGRAPH_CLASS_NAME, 1, '');
  });

  it.each(elementsTable)('creates a %s', async (_: string, commandKey: string, className: string) => {
    await editor.click();
    const button = await getByTestId(toolbar, commandKey);
    await button.click();
    await editor.type(INPUT);
    await expect(editor).hasElementWithTextNode(className, 1, INPUT);
  });

  it.each(elementsTable)('toggles a %s', async (_: string, commandKey: string, className: string) => {
    await editor.click();
    await editor.type(INPUT);
    await expect(editor).hasElementWithTextNode(PARAGRAPH_CLASS_NAME, 1, INPUT);

    const button = await getByTestId(toolbar, commandKey);
    await button.click();
    await expect(editor).hasElementWithTextNode(className, 1, INPUT);

    await button.click();
    await expect(editor).hasElementWithTextNode(PARAGRAPH_CLASS_NAME, 1, INPUT);
  });

  describe.each(elementsTable)('creates a %s and', (_: string, commandKey1: string, className1: string) => {
    it.each(marksTable)('marks a word %s', async (__: string, commandKey2: string, className2: string) => {
      await editor.click();

      const elementButton = await getByTestId(toolbar, commandKey1);
      await elementButton.click();

      await editor.type(INPUT);
      await expect(editor).hasElementWithTextNode(className1, 1, INPUT);

      // double click first word
      const textNode = await getByText(editor, INPUT);
      await textNode.dblclick({
        position: {
          x: 5,
          y: 5,
        },
      });

      const markButton = await getByTestId(toolbar, commandKey2);
      await markButton.click();
      await expect(editor).hasElementWithTextNode(className2, 1, INPUT_FIRST_WORD);
    });
  });

  it('inserts a link', async () => {
    await editor.click();

    const linkButton = await getByTestId(toolbar, LINK_COMMAND_KEY);
    await linkButton.click();

    const dialogId = `dialog_${LINK_COMMAND_KEY}`;
    const inputDialog = await getByTestId($document, dialogId);
    const inputField = await getByTestId(inputDialog, `${dialogId}_text`);
    await inputField.type(INPUT_LINK);

    const okButton = await getByTestId(inputDialog, `${dialogId}_ok`);
    await okButton.click();

    await expect(editor).hasNrOfElements(1, PARAGRAPH_CLASS_NAME);
    const paragraph = await editor.$(`css=.${PARAGRAPH_CLASS_NAME}`);
    await expect(paragraph).hasElementWithTextNode(LINK_CLASS_NAME, 1, INPUT_LINK);
  });

  it('inserts an image', async () => {
    await editor.click();

    const linkButton = await getByTestId(toolbar, IMAGE_COMMAND_KEY);
    await linkButton.click();

    const dialogId = `dialog_${IMAGE_COMMAND_KEY}`;
    const inputDialog = await getByTestId($document, dialogId);
    const inputField = await getByTestId(inputDialog, `${dialogId}_text`);
    await inputField.type(INPUT_IMAGE);

    const okButton = await getByTestId(inputDialog, `${dialogId}_ok`);
    await okButton.click();

    await expect(editor).hasNrOfElements(1, IMAGE_CLASS_NAME);
    await expect(editor).hasNrOfElements(2, PARAGRAPH_CLASS_NAME);

    const imageDiv = await editor.$(`css=.${IMAGE_CLASS_NAME}`);
    await expect(imageDiv).not.toBeNull();
    await expect(await imageDiv!.$(`css=img[src="${INPUT_IMAGE}"]`));
  });
});
