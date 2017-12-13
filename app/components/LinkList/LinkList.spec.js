import LinkList from './';

const exampleLinks = [{
  label: 'Test 1',
  to: '/test1',
}, {
  label: 'Test 2',
  to: '/test2',
}];

argUnit(LinkList, () => {
  set('links', () => exampleLinks);

  it('renders', () => {
    expect(subject).toMatchSnapshot();
  });

  it('renders all links', () => {
    expect(subject.find(marker('link'))).toHaveLength(exampleLinks.length);
  });
});
