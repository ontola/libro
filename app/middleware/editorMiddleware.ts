import rdf, { NamedNode } from '@ontologies/core';
import rdfx from '@ontologies/rdf';
import schema from '@ontologies/schema';
import sh from '@ontologies/shacl';
import { actionIRI, createActionPair } from '@rdfdev/actions';
import { add, replace } from '@rdfdev/delta';
import {
  MiddlewareActionHandler,
  MiddlewareFn,
  MiddlewareWithBoundLRS,
} from 'link-lib';
import { LinkReduxLRSType } from 'link-redux';
import React from 'react';
import { Editor, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';

import fa4 from '../ontology/fa4';
import ontola from '../ontology/ontola';
import editor from '../ontology/ontola/editor';

interface EditorActionParams {
  mark: NamedNode;
  type: NamedNode;
}

const pluginList = rdf.blankNode();
const toolbar = rdf.blankNode();
const marks = rdf.blankNode();

const shortcutMapping = rdf.blankNode();
const boldShortcut = rdf.blankNode();
const italicShortcut = rdf.blankNode();
const underlineShortcut = rdf.blankNode();
const paragraphShortcut = rdf.blankNode();
const h1Shortcut = rdf.blankNode();
const h2Shortcut = rdf.blankNode();
const h3Shortcut = rdf.blankNode();
const h4Shortcut = rdf.blankNode();

const boldButton = rdf.blankNode();
const italicButton = rdf.blankNode();
const underlineButton = rdf.blankNode();

const paragraphStyleSelector = rdf.blankNode();
const paragraphStyleList = rdf.blankNode();
const paragraphStyleParagraph = rdf.blankNode();
const paragraphStyleH1 = rdf.blankNode();
const paragraphStyleH2 = rdf.blankNode();
const paragraphStyleH3 = rdf.blankNode();
const paragraphStyleH4 = rdf.blankNode();

const toggleMarkBoldAction = rdf.namedNode(actionIRI(
  editor.actions.toggleMark.value,
  { mark: editor.formatting.Bold },
));
const toggleMarkItalicAction = rdf.namedNode(actionIRI(
  editor.actions.toggleMark.value,
  { mark: editor.formatting.Italic },
));
const toggleMarkUnderlineAction = rdf.namedNode(actionIRI(
  editor.actions.toggleMark.value,
  { mark: editor.formatting.Underline },
));
const changeTypeParagraphAction = rdf.namedNode(actionIRI(
  editor.actions.changeType.value,
  { type: editor.elements.Paragraph },
));
const changeTypeH1Action = rdf.namedNode(actionIRI(
  editor.actions.changeType.value,
  { type: editor.elements.H1 },
));
const changeTypeH2Action = rdf.namedNode(actionIRI(
  editor.actions.changeType.value,
  { type: editor.elements.H2 },
));
const changeTypeH3Action = rdf.namedNode(actionIRI(
  editor.actions.changeType.value,
  { type: editor.elements.H3 },
));
const changeTypeH4Action = rdf.namedNode(actionIRI(
  editor.actions.changeType.value,
  { type: editor.elements.H4 },
));

const shiftLineDown = editor.actions.shiftLineDown;
const shiftLineUp = editor.actions.shiftLineUp;
const shiftLineDownShortcut = rdf.blankNode();
const shiftLineUpShortcut = rdf.blankNode();

const editorSeed = [
  add(editor.divider, rdfx.type, editor.Divider),

  add(editor.localSettings, rdfx.type, editor.EditorSettings),
  add(editor.localSettings, editor.enabledPlugins, pluginList),
  add(editor.localSettings, editor.toolbar, toolbar),
  add(editor.localSettings, editor.shortcuts, shortcutMapping),
  add(editor.localSettings, editor.marks, marks),

  add(pluginList, rdfx.type, rdfx.Seq),
  add(pluginList, rdfx.ns('_0'), editor.features.alignment),
  add(pluginList, rdfx.ns('_1'), editor.features.bold),
  add(pluginList, rdfx.ns('_2'), editor.features.color),
  add(pluginList, rdfx.ns('_3'), editor.features.embed),
  add(pluginList, rdfx.ns('_4'), editor.features.fontFamily),
  add(pluginList, rdfx.ns('_5'), editor.features.fontSize),
  add(pluginList, rdfx.ns('_6'), editor.features.grid),
  add(pluginList, rdfx.ns('_7'), editor.features.image),
  add(pluginList, rdfx.ns('_8'), editor.features.italic),
  add(pluginList, rdfx.ns('_9'), editor.features.link),
  add(pluginList, rdfx.ns('_10'), editor.features.list),
  add(pluginList, rdfx.ns('_11'), editor.features.strikethrough),
  add(pluginList, rdfx.ns('_12'), editor.features.underline),

  add(toggleMarkBoldAction, rdfx.type, editor.Action),
  add(toggleMarkBoldAction, schema.name, rdf.literal('Bold', 'en')),
  add(toggleMarkBoldAction, schema.name, rdf.literal('Vet', 'nl')),

  add(toggleMarkItalicAction, rdfx.type, editor.Action),
  add(toggleMarkItalicAction, schema.name, rdf.literal('Italic', 'en')),
  add(toggleMarkItalicAction, schema.name, rdf.literal('Cursief', 'nl')),

  add(toggleMarkUnderlineAction, rdfx.type, editor.Action),
  add(toggleMarkUnderlineAction, schema.name, rdf.literal('Underline', 'en')),
  add(toggleMarkUnderlineAction, schema.name, rdf.literal('Onderschrijf', 'nl')),

  add(changeTypeParagraphAction, rdfx.type, editor.Action),
  add(changeTypeParagraphAction, schema.name, rdf.literal('Normal text', 'en')),
  add(changeTypeParagraphAction, schema.name, rdf.literal('Normale tekst', 'nl')),

  add(changeTypeH1Action, rdfx.type, editor.Action),
  add(changeTypeH1Action, schema.name, rdf.literal('Heading 1', 'en')),
  add(changeTypeH1Action, schema.name, rdf.literal('Kop 1', 'nl')),

  add(changeTypeH2Action, rdfx.type, editor.Action),
  add(changeTypeH2Action, schema.name, rdf.literal('Heading 2', 'en')),
  add(changeTypeH2Action, schema.name, rdf.literal('Kop 2', 'nl')),

  add(changeTypeH3Action, rdfx.type, editor.Action),
  add(changeTypeH3Action, schema.name, rdf.literal('Heading 3', 'en')),
  add(changeTypeH3Action, schema.name, rdf.literal('Kop 3', 'nl')),

  add(changeTypeH4Action, rdfx.type, editor.Action),
  add(changeTypeH4Action, schema.name, rdf.literal('Heading 4', 'en')),
  add(changeTypeH4Action, schema.name, rdf.literal('Kop 4', 'nl')),

  add(shortcutMapping, rdfx.type, rdfx.Seq),
  add(shortcutMapping, rdfx.ns('_0'), boldShortcut),
  add(shortcutMapping, rdfx.ns('_1'), italicShortcut),
  add(shortcutMapping, rdfx.ns('_2'), underlineShortcut),
  add(shortcutMapping, rdfx.ns('_3'), h1Shortcut),
  add(shortcutMapping, rdfx.ns('_4'), h2Shortcut),
  add(shortcutMapping, rdfx.ns('_5'), h3Shortcut),
  add(shortcutMapping, rdfx.ns('_6'), h4Shortcut),
  add(shortcutMapping, rdfx.ns('_7'), shiftLineUpShortcut),
  add(shortcutMapping, rdfx.ns('_8'), shiftLineDownShortcut),

  add(boldShortcut, rdfx.type, editor.Shortcut),
  add(boldShortcut, editor.defaultCombination, rdf.literal('mod+b')),
  add(boldShortcut, ontola.action, toggleMarkBoldAction),

  add(italicShortcut, rdfx.type, editor.Shortcut),
  add(italicShortcut, editor.defaultCombination, rdf.literal('mod+i')),
  add(italicShortcut, ontola.action, toggleMarkItalicAction),

  add(underlineShortcut, rdfx.type, editor.Shortcut),
  add(underlineShortcut, editor.defaultCombination, rdf.literal('mod+u')),
  add(underlineShortcut, ontola.action, toggleMarkUnderlineAction),

  add(paragraphShortcut, rdfx.type, editor.Shortcut),
  add(paragraphShortcut, editor.defaultCombination, rdf.literal('mod+shift+n')),
  add(paragraphShortcut, ontola.action, changeTypeParagraphAction),

  add(h1Shortcut, rdfx.type, editor.Shortcut),
  add(h1Shortcut, editor.defaultCombination, rdf.literal('mod+alt+1')),
  add(h1Shortcut, ontola.action, changeTypeH1Action),

  add(h2Shortcut, rdfx.type, editor.Shortcut),
  add(h2Shortcut, editor.defaultCombination, rdf.literal('mod+alt+2')),
  add(h2Shortcut, ontola.action, changeTypeH2Action),

  add(h3Shortcut, rdfx.type, editor.Shortcut),
  add(h3Shortcut, editor.defaultCombination, rdf.literal('mod+alt+3')),
  add(h3Shortcut, ontola.action, changeTypeH3Action),

  add(h4Shortcut, rdfx.type, editor.Shortcut),
  add(h4Shortcut, editor.defaultCombination, rdf.literal('mod+alt+4')),
  add(h4Shortcut, ontola.action, changeTypeH4Action),

  add(shiftLineDownShortcut, rdfx.type, editor.Shortcut),
  add(shiftLineDownShortcut, editor.defaultCombination, rdf.literal('alt+shift+down')),
  add(shiftLineDownShortcut, ontola.action, shiftLineDown),

  add(shiftLineUpShortcut, rdfx.type, editor.Shortcut),
  add(shiftLineUpShortcut, editor.defaultCombination, rdf.literal('alt+shift+up')),
  add(shiftLineUpShortcut, ontola.action, shiftLineUp),

  // The marks currently active in the editor.
  add(marks, rdfx.type, rdfx.Seq),

  add(toolbar, rdfx.type, rdfx.Seq),
  add(toolbar, rdfx.ns('_10'), boldButton),
  add(toolbar, rdfx.ns('_11'), italicButton),
  add(toolbar, rdfx.ns('_12'), underlineButton),
  add(toolbar, rdfx.ns('_20'), editor.divider),
  add(toolbar, rdfx.ns('_21'), paragraphStyleSelector),

  add(boldButton, rdfx.type, ontola.MenuItem),
  add(boldButton, schema.image, fa4.ns('bold')),
  add(boldButton, schema.name, rdf.literal('Bold')),
  add(boldButton, editor.mark, editor.formatting.Bold),
  add(boldButton, ontola.action, toggleMarkBoldAction),

  add(italicButton, rdfx.type, ontola.MenuItem),
  add(italicButton, schema.image, fa4.ns('italic')),
  add(italicButton, schema.name, rdf.literal('Italic')),
  add(italicButton, editor.mark, editor.formatting.Italic),
  add(italicButton, ontola.action, toggleMarkItalicAction),

  add(underlineButton, rdfx.type, ontola.MenuItem),
  add(underlineButton, schema.image, fa4.ns('underline')),
  add(underlineButton, schema.name, rdf.literal('Underline')),
  add(underlineButton, editor.mark, editor.formatting.Underline),
  add(underlineButton, ontola.action, toggleMarkUnderlineAction),

  add(paragraphStyleSelector, rdfx.type, ontola.MenuItem),
  add(paragraphStyleSelector, sh.in, paragraphStyleList),
  add(paragraphStyleSelector, editor.current, paragraphStyleParagraph),
  add(paragraphStyleSelector, schema.image, fa4.ns('underline')),
  add(paragraphStyleSelector, schema.name, rdf.literal('Underline')),

  add(paragraphStyleList, rdfx.type, rdfx.Seq),
  add(paragraphStyleList, rdfx.ns('_0'), paragraphStyleParagraph),
  add(paragraphStyleList, rdfx.ns('_1'), paragraphStyleH1),
  add(paragraphStyleList, rdfx.ns('_2'), paragraphStyleH2),
  add(paragraphStyleList, rdfx.ns('_3'), paragraphStyleH3),
  add(paragraphStyleList, rdfx.ns('_4'), paragraphStyleH4),

  add(paragraphStyleParagraph, rdfx.type, schema.Thing),
  add(paragraphStyleParagraph, schema.name, rdf.literal('Paragraph')),
  add(paragraphStyleParagraph, ontola.action, changeTypeParagraphAction),
  add(paragraphStyleH1, rdfx.type, schema.Thing),
  add(paragraphStyleH1, schema.name, rdf.literal('Heading 1')),
  add(paragraphStyleH1, ontola.action, changeTypeH1Action),

  add(paragraphStyleH2, rdfx.type, schema.Thing),
  add(paragraphStyleH2, schema.name, rdf.literal('Heading 2')),
  add(paragraphStyleH2, ontola.action, changeTypeH2Action),

  add(paragraphStyleH3, rdfx.type, schema.Thing),
  add(paragraphStyleH3, schema.name, rdf.literal('Heading 3')),
  add(paragraphStyleH3, ontola.action, changeTypeH3Action),

  add(paragraphStyleH4, rdfx.type, schema.Thing),
  add(paragraphStyleH4, schema.name, rdf.literal('Heading 4')),
  add(paragraphStyleH4, ontola.action, changeTypeH4Action),

];

const toggleMark = (textEditor: Editor, format: NamedNode) => {
  const isActive = isMarkActive(textEditor, format);

  if (isActive) {
    Editor.removeMark(textEditor, rdf.toNQ(format));
  } else {
    Editor.addMark(textEditor, rdf.toNQ(format), true);
  }
};

const isBlockActive = (textEditor: Editor, format: NamedNode) => {
  const [match] = Editor.nodes(textEditor, {
    match: (n) => n.type === format,
  });

  return !!match;
};

const isMarkActive = (textEditor: Editor, format: NamedNode) => {
  const currentMarks = Editor.marks(textEditor);

  return currentMarks ? currentMarks[rdf.toNQ(format)] === true : false;
};

const editorMiddleware = (): MiddlewareFn<React.ComponentType<any>> =>
  (store: LinkReduxLRSType): MiddlewareWithBoundLRS => {

  const prefix = editor.ns('').value;
  const { parse } = createActionPair<EditorActionParams>(editor.ns, store);

  store.processDelta(editorSeed, true);

  return (next: MiddlewareActionHandler) => (iri: NamedNode, opts: any): Promise<any> => {
    if (!iri.value.startsWith(prefix)) {
      return next(iri, opts);
    }

    const { base, params } = parse(iri);
    const { item, textEditor } = opts;
    console.log('editor action', base, params, opts);

    switch (base) {
      case editor.actions.toggleMark:
        return new Promise((resolve) => {
          toggleMark(textEditor, params.mark!);
          ReactEditor.focus(textEditor);
          resolve();
        });
      case editor.actions.changeType:
        const { type: format } = params;

        Transforms.setNodes(textEditor, {
          type: isBlockActive(textEditor, format!)
            ? editor.elements.Paragraph
            : false ? 'list-item' : format,
        });
        return store
          .processDelta(
            [replace(item, editor.current, format)],
            true,
          )
          .then(() => {
            ReactEditor.focus(textEditor);
          });
      case editor.actions.shiftLineUp:
        return new Promise((resolve) => {
          const { selection } = textEditor;
          if (selection) {
            const currentLine = selection.anchor?.path[0];
            const diff = -1;
            if (currentLine + diff < 0) {
              return resolve();
            }

            const targetLine = Math.max(0, currentLine + diff);

            Transforms.splitNodes(textEditor, {
              at: [targetLine, 0],
            });
            Transforms.moveNodes(textEditor, {
              at: [targetLine, 0],
              to: [targetLine + 1, 0],
            });
            Transforms.moveNodes(textEditor, {
              at: [targetLine + 2, 0],
              to: [targetLine, 0],
            });
            Transforms.mergeNodes(textEditor, {
              at: [currentLine + 1],
            });
            ReactEditor.focus(textEditor);
          }
          resolve();
        });
      case editor.actions.shiftLineDown:
        return new Promise((resolve) => {
          const { selection } = textEditor;
          if (selection) {
            const currentLine = selection.anchor?.path[0];
            const diff = 1;
            if (currentLine + diff >= textEditor.children.length) {
              return resolve();
            }

            const targetLine = Math.max(0, currentLine + diff);

            Transforms.splitNodes(textEditor, {
              at: [currentLine, 0],
            });
            Transforms.moveNodes(textEditor, {
              at: [targetLine + 1, 0],
              to: [currentLine, 0],
            });
            Transforms.mergeNodes(textEditor, {
              at: [targetLine + 1],
            });
            ReactEditor.focus(textEditor);
          }
          resolve();
        });
      default:
        console.log('unknown editor action', base);
    }

    return next(iri, opts);
  };
};

export default editorMiddleware;
