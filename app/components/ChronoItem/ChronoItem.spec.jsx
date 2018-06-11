import ChronoItem from './index';

argUnit(ChronoItem, () => {
  setProp('currentDate', () => new Date());
  setProp('endDate', () => new Date());
  setProp('startDate', () => new Date());
  setProp('text', () => 'Joe');

  it('should render', () => {
    expect(subject.find(marker())).toExist();
  });

  it('should render the details', () => {
    expect(subject.find(marker('details'))).toExist();
  });
}, { mount: true, redux: true });
