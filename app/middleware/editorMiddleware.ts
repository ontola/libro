import rdf, { NamedNode, Node } from '@ontologies/core';
import rdfx from '@ontologies/rdf';
import schema from '@ontologies/schema';
import sh from '@ontologies/shacl';
import { actionIRI, createActionPair } from '@rdfdev/actions';
import { seqPush, seqToArray } from '@rdfdev/collections';
import { add } from '@rdfdev/delta';
import {
  MiddlewareActionHandler,
  MiddlewareFn,
  MiddlewareWithBoundLRS,
} from 'link-lib';
import { LinkReduxLRSType } from 'link-redux';
import React from 'react';
import fa4 from '../ontology/fa4';
import ontola from '../ontology/ontola';

import editor from '../ontology/ontola/editor';
import sp from '../ontology/sp';

interface EditorActionParams {
  mark: NamedNode;
}

const editorMiddleware = (): MiddlewareFn<React.ComponentType<any>> =>
  (store: LinkReduxLRSType): MiddlewareWithBoundLRS => {

  const prefix = editor.ns('').value;
  const { parse } = createActionPair<EditorActionParams>(editor.ns, store);

  const pluginList = rdf.blankNode();
  const toolbar = rdf.blankNode();
  const marks = rdf.blankNode();
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
  store.processDelta([
    add(editor.divider, rdfx.type, editor.Divider),

    add(editor.localSettings, rdfx.type, editor.EditorSettings),
    add(editor.localSettings, editor.enabledPlugins, pluginList),
    add(editor.localSettings, editor.toolbar, toolbar),
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
    add(boldButton, ontola.action, rdf.namedNode(actionIRI(
      editor.actions.toggleMark.value,
      { mark: editor.formatting.Bold },
    ))),

    add(italicButton, rdfx.type, ontola.MenuItem),
    add(italicButton, schema.image, fa4.ns('italic')),
    add(italicButton, schema.name, rdf.literal('Italic')),
    add(italicButton, editor.mark, editor.formatting.Italic),
    add(italicButton, ontola.action, rdf.namedNode(actionIRI(
      editor.actions.toggleMark.value,
      { mark: editor.formatting.Italic },
    ))),

    add(underlineButton, rdfx.type, ontola.MenuItem),
    add(underlineButton, schema.image, fa4.ns('underline')),
    add(underlineButton, schema.name, rdf.literal('Underline')),
    add(underlineButton, editor.mark, editor.formatting.Underline),
    add(underlineButton, ontola.action, rdf.namedNode(actionIRI(
      editor.actions.toggleMark.value,
      { mark: editor.formatting.Underline },
    ))),

    add(paragraphStyleSelector, rdfx.type, ontola.MenuItem),
    add(paragraphStyleSelector, sh.in, paragraphStyleList),
    add(paragraphStyleSelector, editor.current, boldButton),
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
    add(paragraphStyleH1, rdfx.type, schema.Thing),
    add(paragraphStyleH1, schema.name, rdf.literal('Heading 1')),
    add(paragraphStyleH2, rdfx.type, schema.Thing),
    add(paragraphStyleH2, schema.name, rdf.literal('Heading 2')),
    add(paragraphStyleH3, rdfx.type, schema.Thing),
    add(paragraphStyleH3, schema.name, rdf.literal('Heading 3')),
    add(paragraphStyleH4, rdfx.type, schema.Thing),
    add(paragraphStyleH4, schema.name, rdf.literal('Heading 4')),
  ], true);

  return (next: MiddlewareActionHandler) => (iri: NamedNode, opts: any): Promise<any> => {
    if (!iri.value.startsWith(prefix)) {
      return next(iri, opts);
    }

    const { base, params } = parse(iri);
    console.log('editor action', base, params);

    switch (base) {
      case editor.actions.toggleMark:
        console.log('Toggling mark', params.mark);
        const currentMarks = store.getResourceProperty<Node>(editor.localSettings, editor.marks)!;
        const current = seqToArray(store.store, currentMarks);

        const delta = current.includes(params.mark)
          ? [rdf.quad(currentMarks, sp.Variable, params.mark, ontola.remove)]
          : seqPush(store.store, currentMarks, params.mark);

        return store.processDelta(delta, true);
      default:
        console.log('unknown editor action', base);
    }

    return next(iri, opts);
  };
};

export default editorMiddleware;
