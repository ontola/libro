import rdf from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import { DeepRecord } from 'link-lib';

import argu from '../../../../Argu/ontology/argu';
import elements from '../../../../Elements/ontology/elements';
import example from '../../../../Kernel/ontology/example';
import { DeepSlice } from '../../../lib/dataObjectsToDeepSlice';
import { deepSliceToSource } from '../deepSliceToSource';

describe('deepSliceToSource', () => {
  const mainId = example.ns('0');

  it('converts an empty slice', () => {
    const source = deepSliceToSource({}, '');

    expect(source).toEqual('({})');
  });

  /**
   * Slices are converted to quads before being turned into sources, so they can't be present
   * in the final output yet.
   */
  it('converts a slice with an empty record', () => {
    const source = deepSliceToSource({
      [mainId.value]: {
        _id: mainId,
      },
    }, example.ns('').value);

    expect(source).toEqual('({})');
  });

  it('converts a slice with a record', () => {
    const source = deepSliceToSource({
      [mainId.value]: {
        _id: mainId,
        [schema.name.value]: rdf.literal('name!'),
      },
    }, example.ns('').value);

    expect(source).toEqual(`({
  "@id": local("0").value,
  [schema.name]: "name!",
})`);
  });

  it('converts a slice with nested records', () => {
    const source = deepSliceToSource({
      [mainId.value]: {
        _id: mainId,
        [schema.name.value]: rdf.literal('name!'),
        [schema.text.value]: {
          _id: rdf.blankNode(),
          [schema.name.value]: rdf.literal('document!'),
        },
      },
    }, example.ns('').value);

    expect(source).toEqual(`({
  "@id": local("0").value,
  [schema.name]: "name!",
  [schema.text]: {
    [schema.name]: "document!",
  },
})`);
  });

  it('converts a slice with nested sequence', () => {
    const source = deepSliceToSource({
      [mainId.value]: {
        _id: mainId,
        [schema.name.value]: rdf.literal('name!'),
        [schema.text.value]: {
          _id: rdf.blankNode(),
          [rdfx.type.value]: rdfx.Seq,
          [rdfx.ns('_0').value]: {
            _id: rdf.blankNode(),
            [schema.name.value]: rdf.literal('document!'),
          },
        },
      },
    }, example.ns('').value);

    expect(source).toEqual(`({
  "@id": local("0").value,
  [schema.name]: "name!",
  [schema.text]: seq([
    {
      [schema.name]: "document!",
    },
  ]),
})`);
  });

  it('converts a deeply nested slice', () => {
    const local = example.ns;
    const seq = (items: DeepRecord[]): DeepRecord => items.reduce((acc, item, i) => ({
      ...acc,
      [rdfx.ns(`_${i}`).value]: item,
    }), {
      _id: rdf.blankNode(),
      [rdfx.type.value]: rdfx.Seq,
    });
    const id = local('online-participatie/wat-is-participatie/wat-is-beter-online-of-fysieke-participatie');

    const source: DeepSlice = {
      [id.value]: {
        _id: local('online-participatie/wat-is-participatie/wat-is-beter-online-of-fysieke-participatie'),
        [rdfx.type.value]: argu.Chapter,
        [schema.title.value]: rdf.literal('Wat is beter: online of fysieke participatie?'),
        [schema.isPartOf.value]: local(''),
        [argu.chapterContent.value]: {
          _id: rdf.blankNode(),
          [rdfx.type.value]: elements.Document,
          [elements.children.value]: seq([
            {
              _id: rdf.blankNode(),
              [rdfx.type.value]: elements.P,
              [elements.children.value]: seq([
                {
                  _id: rdf.blankNode(),
                  [rdfx.type.value]: elements.InnerText,
                  [schema.text.value]: rdf.literal('Online en fysiek hebben beide voor- en nadelen. Elk participatietraject is anders en het is dus ook niet te zeggen dat online of fysiek beter is. Door online en fysiek te combineren kun je een heel krachtig participatietraject neerzetten.'),
                },
              ]),
            },
            {
              _id: rdf.blankNode(),
              [rdfx.type.value]: elements.H2,
              [elements.children.value]: seq([
                {
                  _id: rdf.blankNode(),
                  [rdfx.type.value]: elements.InnerText,
                  [schema.text.value]: rdf.literal('De belangrijkste voordelen van online en fysiek die je wil benutten zijn:'),
                },
              ]),
            },
            {
              _id: rdf.blankNode(),
              [rdfx.type.value]: elements.Ul,
              [elements.children.value]: seq([
                {
                  _id: rdf.blankNode(),
                  [rdfx.type.value]: elements.Li,
                  [elements.children.value]: seq([
                    {
                      _id: rdf.blankNode(),
                      [rdfx.type.value]: elements.P,
                      [elements.children.value]: seq([
                        {
                          _id: rdf.blankNode(),
                          [rdfx.type.value]: elements.InnerText,
                          [schema.text.value]: rdf.literal('Het zo laagdrempelig mogelijk maken voor mensen om deel te nemen. Voor de meeste mensen is dat online, voor sommige mensen is dat fysiek. Biedt naast een bijeenkomst dus ook online mogelijkheden om mee te denken en andersom.'),
                        },
                      ]),
                    },
                  ]),
                },
                {
                  _id: rdf.blankNode(),
                  [rdfx.type.value]: elements.Li,
                  [elements.children.value]: seq([
                    {
                      _id: rdf.blankNode(),
                      [rdfx.type.value]: elements.P,
                      [elements.children.value]: seq([
                        {
                          _id: rdf.blankNode(),
                          [rdfx.type.value]: elements.InnerText,
                          [schema.text.value]: rdf.literal('Zorg dat het centrale informatiepunt online is. Als je een fysieke bijeenkomst organiseert is het verstandig om de inzichten uit die bijeenkomst te delen op het online platform waar andere mensen ook op kunnen reageren. Zo voorkom je dat de online deelnemers en de fysieke deelnemers op verschillende ideeën en vragen gaan reageren.'),
                        },
                      ]),
                    },
                  ]),
                },
              ]),
            },
          ]),
        },
      },
    };

    expect(deepSliceToSource(source, example.ns('').value)).toEqual(`({
  "@id": local("online-participatie/wat-is-participatie/wat-is-beter-online-of-fysieke-participatie").value,
  [rdfx.type]: argu.Chapter,
  [schema.title]: "Wat is beter: online of fysieke participatie?",
  [schema.isPartOf]: local(""),
  [argu.chapterContent]: {
    [rdfx.type]: elements.Document,
    [elements.children]: seq([
      {
        [rdfx.type]: elements.P,
        [elements.children]: seq([
          {
            [rdfx.type]: elements.InnerText,
            [schema.text]: "Online en fysiek hebben beide voor- en nadelen. Elk participatietraject is anders en het is dus ook niet te zeggen dat online of fysiek beter is. Door online en fysiek te combineren kun je een heel krachtig participatietraject neerzetten.",
          },
        ]),
      },
      {
        [rdfx.type]: elements.H2,
        [elements.children]: seq([
          {
            [rdfx.type]: elements.InnerText,
            [schema.text]: "De belangrijkste voordelen van online en fysiek die je wil benutten zijn:",
          },
        ]),
      },
      {
        [rdfx.type]: elements.Ul,
        [elements.children]: seq([
          {
            [rdfx.type]: elements.Li,
            [elements.children]: seq([
              {
                [rdfx.type]: elements.P,
                [elements.children]: seq([
                  {
                    [rdfx.type]: elements.InnerText,
                    [schema.text]: "Het zo laagdrempelig mogelijk maken voor mensen om deel te nemen. Voor de meeste mensen is dat online, voor sommige mensen is dat fysiek. Biedt naast een bijeenkomst dus ook online mogelijkheden om mee te denken en andersom.",
                  },
                ]),
              },
            ]),
          },
          {
            [rdfx.type]: elements.Li,
            [elements.children]: seq([
              {
                [rdfx.type]: elements.P,
                [elements.children]: seq([
                  {
                    [rdfx.type]: elements.InnerText,
                    [schema.text]: "Zorg dat het centrale informatiepunt online is. Als je een fysieke bijeenkomst organiseert is het verstandig om de inzichten uit die bijeenkomst te delen op het online platform waar andere mensen ook op kunnen reageren. Zo voorkom je dat de online deelnemers en de fysieke deelnemers op verschillende ideeën en vragen gaan reageren.",
                  },
                ]),
              },
            ]),
          },
        ]),
      },
    ]),
  },
})`);
  });
});
