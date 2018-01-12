import Attachment from './index';

const curProgress = 45;

argUnit(Attachment, () => {
  setProp('url', () => 'http://argu.co/');
  setProp('title', () => 'Attachment label');

  it('renders', () => {
    expect(subject).toMatchSnapshot();
  });

  it('renders the label', () => {
    expect(subject.find(marker('title'))).toHaveText('Attachment label');
  });

  describe('with preview', () => {
    setProp('hasPreview', () => true);

    it('renders preview links', () => {
      expect(subject.find(marker('preview'))).toHaveProp('href', '/');
    });
  });

  describe('when downloading', () => {
    setProp('percentageDownloaded', () => curProgress);
    setProp('isDownloading', () => true);

    it('renders downloading spinner', () => {
      expect(subject.find(marker('downloading'))).toHaveProp('href', '/');
    });

    it('renders percentage bar', () => {
      expect(subject.find(marker('progress'))).toHaveStyle('width', `${curProgress}%`);
    });
  });
});
