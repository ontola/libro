import Detail from './index';

argUnit(Detail, () => {
  it('should be a div', () => {
    expect(subject).toHaveTagName('div');
  });

  it('should not render an image', () => {
    expect(subject.find(marker('image'))).not.toBePresent();
  });

  it('should not render an icon', () => {
    expect(subject.find(marker('icon'))).not.toBePresent();
  });

  it('should not render text', () => {
    expect(subject.find(marker('text'))).not.toBePresent();
  });

  describe('with url', () => {
    setProp('url', () => 'http://example.org/');

    it('should be an anchor', () => {
      expect(subject).toHaveTagName('a');
    });

    it('should be styled as an anchor', () => {
      expect(subject).toHaveClassName('Detail--link');
    });
  });

  describe('with text', () => {
    setProp('text', () => 'Some text');

    it('should be a div', () => {
      expect(subject).toHaveTagName('div');
    });

    it('should not render an image', () => {
      expect(subject.find(marker('image'))).not.toBePresent();
    });

    it('should not render an icon', () => {
      expect(subject.find(marker('icon'))).not.toBePresent();
    });

    it('should render text', () => {
      expect(subject.find(marker('text'))).toHaveText('Some text');
    });
  });

  describe('with an image', () => {
    setProp('imageUrl', () => 'http://example.org/photo.jpg');
    setProp('title', () => 'A description');

    it('should be a div', () => {
      expect(subject).toHaveTagName('div');
    });

    it('should render an image', () => {
      expect(subject.find(marker('image'))).toBePresent();
    });

    it('should have the correct url', () => {
      expect(subject.find(marker('image'))).toHaveProp('src', 'http://example.org/photo.jpg');
    });

    it('should have the correct alt text', () => {
      expect(subject.find(marker('image'))).toHaveProp('alt', 'A description');
    });

    it('should not render an icon', () => {
      expect(subject.find(marker('icon'))).not.toBePresent();
    });

    it('should not render text', () => {
      expect(subject.find(marker('text'))).not.toBePresent();
    });
  });

  describe('with an icon', () => {
    setProp('icon', () => 'http://example.org/photo.ico');

    it('should be a div', () => {
      expect(subject).toHaveTagName('div');
    });

    it('should not render an image', () => {
      expect(subject.find(marker('image'))).not.toBePresent();
    });

    it('should render an icon', () => {
      expect(subject.find(marker('icon'))).toBePresent();
    });

    it('should not render text', () => {
      expect(subject.find(marker('text'))).not.toBePresent();
    });

    describe('with image', () => {
      setProp('imageUrl', () => 'http://example.org/photo.jpg');

      it('should render an image', () => {
        expect(subject.find(marker('image'))).toBePresent();
      });

      it('should not render an icon', () => {
        expect(subject.find(marker('icon'))).not.toBePresent();
      });
    });

    describe('with hideIcon', () => {
      setProp('hideIcon', () => true);

      it('should not render an image', () => {
        expect(subject.find(marker('image'))).not.toBePresent();
      });

      it('should not render an icon', () => {
        expect(subject.find(marker('icon'))).not.toBePresent();
      });
    });
  });
});
