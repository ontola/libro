import Attachment from './MediaObjectAttachment';

argUnit(Attachment, () => {
  setProp('url', () => 'http://argu.co/');
  setProp('name', () => 'Attachment label');

  it('renders', () => {
    expect(subject).toMatchSnapshot();
  });

  it('renders the label', () => {
    expect(subject.find(marker('title'))).toHaveText('Attachment label');
  });
});
