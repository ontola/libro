import rdf from '@ontologies/core';

import Detail from './index';

argUnit(Detail, () => {
  it('should be a div', () => {
    expect(subject.find(marker())).toHaveDisplayName('div');
  });

  it('should not render an image', () => {
    expect(subject.find(marker('image')).find('img')).not.toExist();
  });

  it('should not render an icon', () => {
    expect(subject.find(marker('image')).find('.fa')).not.toExist();
  });

  it('should not render text', () => {
    expect(subject.find(marker('text'))).not.toExist();
  });

  describe('with url', () => {
    setProp('url', () => 'http://example.org/');

    it('should be an anchor', () => {
      expect(subject.find(marker())).toHaveDisplayName('a');
    });
  });

  describe('with text', () => {
    setProp('text', () => 'Some text');

    it('should be a div', () => {
      expect(subject.find(marker())).toHaveDisplayName('div');
    });

    it('should not render an image', () => {
      expect(subject.find(marker('image')).find('img')).not.toExist();
    });

    it('should not render an icon', () => {
      expect(subject.find(marker('image')).find('.fa')).not.toExist();
    });

    it('should render text', () => {
      expect(subject.find(marker('DetailText'))).toExist();
    });
  });

  describe('with an image', () => {
    setProp('imageUrl', () => rdf.namedNode('http://example.org/photo.jpg'));
    setProp('title', () => 'A description');

    it('should be a div', () => {
      expect(subject.find(marker())).toHaveDisplayName('div');
    });

    it('should render an image', () => {
      expect(subject.find(marker('image')).find('img')).toExist();
    });

    it('should have the correct url', () => {
      expect(subject.find(marker('image')).find('img')).toHaveProp('src', 'http://example.org/photo.jpg');
    });

    it('should have the correct alt text', () => {
      expect(subject.find(marker('image')).find('img')).toHaveProp('alt', 'A description');
    });

    it('should not render an icon', () => {
      expect(subject.find(marker('image')).find('.fa')).not.toExist();
    });

    it('should not render text', () => {
      expect(subject.find(marker('text'))).not.toExist();
    });
  });

  describe('with an icon', () => {
    setProp('icon', () => 'http://example.org/photo.ico');

    it('should be a div', () => {
      expect(subject.find(marker())).toHaveDisplayName('div');
    });

    it('should not render an image', () => {
      expect(subject.find(marker('image')).find('img')).not.toExist();
    });

    it('should render an icon', () => {
      expect(subject.find(marker('image')).find('.fa')).toExist();
    });

    it('should not render text', () => {
      expect(subject.find(marker('text'))).not.toExist();
    });

    describe('with image', () => {
      setProp('imageUrl', () => rdf.namedNode('http://example.org/photo.jpg'));

      it('should not render an image', () => {
        expect(subject.find(marker('image')).find('img')).not.toExist();
      });

      it('should render an icon', () => {
        expect(subject.find(marker('image')).find('.fa')).toExist();
      });
    });
  });
}, {
  link: true,
  mount: true,
  propTypes: {
    icon: null,
    imageUrl: null,
    text: null,
    title: null,
    url: null,
  },
  router: true,
  themeProvider: true,
});
