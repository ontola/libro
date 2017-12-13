import Attachment from './index';

const curProgress = 45;

argUnit(Attachment, () => {
  set('url', () => 'http://argu.co/');
  set('title', () => 'Attachment label');

  it('renders', () => {
    expect(subject).toMatchSnapshot();
  });

  it('renders the label', () => {
    expect(subject.find(marker('title'))).toHaveText('Attachment label');
  });

  describe('with preview', () => {
    set('hasPreview', () => true);

    it('renders preview links', () => {
      expect(subject.find(marker('preview'))).toHaveProp('href', '/');
    });
  });

  describe('when downloading', () => {
    set('percentageDownloaded', () => curProgress);
    set('isDownloading', () => true);

    it('renders downloading spinner', () => {
      expect(subject.find(marker('downloading'))).toHaveProp('href', '/');
    });

    it('renders percentage bar', () => {
      expect(subject.find(marker('progress'))).toHaveStyle('width', `${curProgress}%`);
    });
  });
});
