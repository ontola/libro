import { defaultNS as NS, toGraph } from 'link-lib';

import { describeView } from '../../tests/specHelper';
import { cardMainTopology } from '../topologies/Card/CardMain';
import { pageTopology } from '../topologies/Page';
import { getViews } from '../views';
import { Action } from '../views/Action/Action';

describe('Actions', () => {
  const testIRI = NS.ex('test');
  const nameIRI = NS.ex('form/name');
  const pinIRI = NS.ex('form/pin');
  const locationIRI = NS.ex('form/location');
  const imageIRI = NS.ex('form/image');

  const updateAction = {
    '@id': testIRI.value,
    [NS.rdf.type]: NS.schema.UpdateAction,
    [NS.dc.identifier]: testIRI,
    [NS.schema.name]: 'Edit object',
    [NS.schema.object]: NS.ex(''),
    [NS.schema.target]: {
      [NS.rdf.type]: NS.schema.EntryPoint,
      [NS.schema.httpMethod]: 'PUT',
      [NS.schema.name]: 'Update',
      [NS.schema.url]: NS.example('endpoint'),
      [NS.ll('actionBody')]: {
        [NS.rdf.type]: NS.sh.NodeShape,
        [NS.sh.targetNode]: NS.example('resource'),
        [NS.sh.property]: [
          {
            '@id': nameIRI,
            [NS.rdf.type]: NS.sh.PropertyShape,
            [NS.sh.datatype]: NS.xsd.string,
            [NS.sh.maxCount]: 1,
            [NS.sh.name]: 'Name',
            [NS.sh.order]: 0,
            [NS.sh.path]: NS.schema.name,
          },
          {
            '@id': locationIRI,
            [NS.rdf.type]: NS.sh.PropertyShape,
            [NS.sh.class]: NS.argu('Placement'),
            [NS.sh.maxCount]: 1,
            [NS.sh.name]: 'Location',
            [NS.sh.order]: 1,
            [NS.sh.path]: NS.schema.location,
            [NS.argu('referredShapes')]: {
              [NS.rdf.type]: NS.sh.NodeShape,
              [NS.sh.targetClass]: NS.argu('Placement'),
            },
          },
          {
            '@id': imageIRI,
            [NS.rdf.type]: NS.sh.PropertyShape,
            [NS.sh.class]: NS.schema.ImageObject,
            [NS.sh.maxCount]: 1,
            [NS.sh.name]: 'Image',
            [NS.sh.order]: 3,
            [NS.sh.path]: NS.schema.image,
            [NS.argu('referredShapes')]: {
              [NS.rdf.type]: NS.sh.NodeShape,
              [NS.sh.targetClass]: NS.schema.ImageObject,
            },
          },
          {
            '@id': pinIRI,
            [NS.rdf.type]: NS.sh.PropertyShape,
            [NS.sh.datatype]: NS.xsd.boolean,
            [NS.sh.maxCount]: 1,
            [NS.sh.name]: 'Pin',
            [NS.sh.description]: 'Pin to top of collection',
            [NS.sh.order]: 2,
            [NS.sh.path]: NS.argu('pin'),
            [NS.sh.group]: {
              [NS.rdf.type]: NS.sh.PropertyGroup,
              [NS.rdfs.label]: 'Advanced',
            },
          },
        ],
      },
    },
  };

  const [iri, graph] = toGraph(updateAction);

  describeView('UpdateAction', getViews(), graph, iri, () => {
    as(pageTopology, () => {
      it('renders a form', () => {
        expect(subject).toRenderResource(iri);
        within([cardMainTopology, 'CardContent'], (subject) => {
          expect(subject).toRenderProperty(NS.schema.name, 'Edit object');
        });
        expect(subject).toRenderView(Action);
      });

      it('renders a text input field for strings', () => {
        within(nameIRI, (subject) => {
          expect(subject.find('label')).toHaveText('Name');
          expect(subject.find('input[type="text"]')).toExist();
        });
      });

      it('renders a checkbox for booleans', () => {
        within(pinIRI, (subject) => {
          expect(subject.find('label')).toHaveText('Pin');
          expect(subject.find('input[type="checkbox"]')).toExist();
        });
      });

      it('renders properties within groups', () => {
        within(['div[className="grouped"]', pinIRI], (subject) => {
          expect(subject.find('label')).toHaveText('Pin');
        });
      });

      it('renders a map for placements', () => {
        within(locationIRI, (subject) => {
          expect(subject.find('label')).toHaveText('Location');
          expect(subject.find('Spinner')).toExist();
        });
      });

      it('renders an image uploader for images', () => {
        within(imageIRI, (subject) => {
          expect(subject.find('label')).toHaveText('Image');
          expect(subject.find('Dropzone')).toExist();
          expect(subject.find('input[type="file"]')).toExist();
        });
      });
    });
  });
});
