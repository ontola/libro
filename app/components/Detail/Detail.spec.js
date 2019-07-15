import { DetailComp as Detail } from './index';

argUnit(Detail, () => {
  it('should be a div', () => {
    expect(subject).toHaveDisplayName('div');
  });

  it('should not render an image', () => {
    expect(subject.find(marker('image'))).not.toExist();
  });

  it('should not render an icon', () => {
    expect(subject.find(marker('icon'))).not.toExist();
  });

  it('should not render text', () => {
    expect(subject.find(marker('text'))).not.toExist();
  });

  describe('with url', () => {
    setProp('url', () => 'http://example.org/');

    it('should be an anchor', () => {
      expect(subject).toHaveDisplayName('a');
    });

    it('should be styled as an anchor', () => {
      expect(subject).toHaveClassName('Detail--link');
    });
  });

  describe('with text', () => {
    setProp('text', () => 'Some text');

    it('should be a div', () => {
      expect(subject).toHaveDisplayName('div');
    });

    it('should not render an image', () => {
      expect(subject.find(marker('image'))).not.toExist();
    });

    it('should not render an icon', () => {
      expect(subject.find(marker('icon'))).not.toExist();
    });

    it('should render text', () => {
      expect(subject.find(marker('DetailText'))).toExist();
    });
  });

  describe('with an image', () => {
    setProp('imageUrl', () => 'http://example.org/photo.jpg');
    setProp('title', () => 'A description');

    it('should be a div', () => {
      expect(subject).toHaveDisplayName('div');
    });

    it('should render an image', () => {
      expect(subject.find(marker('image'))).toExist();
    });

    it('should have the correct url', () => {
      expect(subject.find(marker('image'))).toHaveProp('src', 'http://example.org/photo.jpg');
    });

    it('should have the correct alt text', () => {
      expect(subject.find(marker('image'))).toHaveProp('alt', 'A description');
    });

    it('should not render an icon', () => {
      expect(subject.find(marker('icon'))).not.toExist();
    });

    it('should not render text', () => {
      expect(subject.find(marker('text'))).not.toExist();
    });
  });

  describe('with an icon', () => {
    setProp('icon', () => 'http://example.org/photo.ico');

    it('should be a div', () => {
      expect(subject).toHaveDisplayName('div');
    });

    it('should not render an image', () => {
      expect(subject.find(marker('image'))).not.toExist();
    });

    it('should render an icon', () => {
      expect(subject.find(marker('icon'))).toExist();
    });

    it('should not render text', () => {
      expect(subject.find(marker('text'))).not.toExist();
    });

    describe('with image', () => {
      setProp('imageUrl', () => 'http://example.org/photo.jpg');

      it('should render an image', () => {
        expect(subject.find(marker('image'))).toExist();
      });

      it('should not render an icon', () => {
        expect(subject.find(marker('icon'))).not.toExist();
      });
    });

    describe('with hideIcon', () => {
      setProp('hideIcon', () => true);

      it('should not render an image', () => {
        expect(subject.find(marker('image'))).not.toExist();
      });

      it('should not render an icon', () => {
        expect(subject.find(marker('icon'))).not.toExist();
      });
    });
  });
});
