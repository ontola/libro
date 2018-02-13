import ChronoItem from './index';

argUnit(ChronoItem, () => {
  setProp('currentDate', () => new Date());
  setProp('endDate', () => new Date());
  setProp('startDate', () => new Date());
  setProp('text', () => 'Joe');

  it('should render', () => {
    expect(subject.find(marker())).toBePresent();
  });

  it('should render the details', () => {
    expect(subject.find(marker('details'))).toBePresent();
  });
}, { mount: true, redux: true });
