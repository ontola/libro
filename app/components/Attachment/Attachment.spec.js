import Attachment from './index';

argUnit(Attachment, () => {
  setProp('url', () => 'http://argu.co/');
  setProp('title', () => 'Attachment label');

  it('renders', () => {
    expect(subject).toMatchSnapshot();
  });

  it('renders the label', () => {
    expect(subject.find(marker('title'))).toHaveText('Attachment label');
  });
});
