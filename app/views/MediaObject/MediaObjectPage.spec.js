import { Literal, NamedNode } from 'rdflib';

import { NS } from '../../../tests';

import components from './index';

const resource = new NamedNode('http://example.com/media_objects/1');
const contentUrl = 'http://example.com/media_objects/1.png';
const filename = '1.png';

const resources = {
  [resource]: {
    [NS.rdf('type')]: NS.schema('MediaObject'),
    [NS.schema('encodingFormat')]: new Literal('image/png'),
    [NS.dbo('filename')]: new Literal(filename),
    [NS.schema('contentUrl')]: new NamedNode(contentUrl),
    [NS.schema('dateCreated')]: new Literal(Date.now()),
    [NS.schema('isPartOf')]: NS.argu('m/1'),
  },
};

describeView('MediaObject', components, resources, resource, () => {
  it('renders the parent link', () => {
    expect(subject.find(marker('isPartOf'))).toExist();
  });

  it('displays the filename if no caption is present', () => {
    expect(subject.find(marker('heading'))).toHaveText(filename);
  });

  it('displays the download button', () => {
    expect(subject.find(marker('download'))).toExist();
  });

  it('links the download button to an content-disposition attachment link', () => {
    expect(subject.find(marker('download'))).toHaveProp('href', `${contentUrl}?download=true`);
  });

  it('displays the image viewer component', () => {
    expect(subject.find(marker('viewer', 'image')).prop('linkedProp').value).toEqual(contentUrl);
  });
});
