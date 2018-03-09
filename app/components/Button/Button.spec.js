import Button from './index';

const clickHandler = jest.fn();
const link = 'http://argu.co/resource';

argUnit(Button, () => {
  setProp('onClick', () => clickHandler);

  it('should render', () => {
    expect(clickHandler).not.toHaveBeenCalled();
    expect(subject).toMatchSnapshot();
  });

  it('should be pressable', () => {
    expect(subject.simulate('click', { nativeEvent: { x: 0 } }));
    expect(clickHandler).toHaveBeenCalled();
  });

  it('should not be disabled', () => {
    expect(subject.find(marker('button'))).toHaveProp('disabled', undefined);
  });

  it('should render a button', () => {
    expect(subject.find(marker('link'))).not.toBePresent();
    expect(subject.find(marker('button'))).toBePresent();
  });

  describe('with custom class', () => {
    setProp('className', () => 'custom');

    it('should render subtle', () => {
      expect(subject).toHaveClassName('custom');
    });
  });

  describe('with href', () => {
    setProp('href', () => link);

    it('should render a link', () => {
      expect(subject.find(marker('link'))).toBePresent();
      expect(subject.find(marker('button'))).not.toBePresent();
    });

    it('should point to the link', () => {
      expect(subject.find(marker('link'))).toHaveProp('to', link);
    });

    it('should not be disabled', () => {
      expect(subject.find(marker('link'))).toHaveProp('disabled', undefined);
    });

    describe('with icon', () => {
      setProp('icon', () => 'lightbulb-o');

      it('should render an icon', () => {
        expect(subject.find(marker('icon'))).toHaveProp('name', 'lightbulb-o');
      });
    });
  });

  describe('with icon', () => {
    setProp('icon', () => 'lightbulb-o');

    it('should render an icon', () => {
      expect(subject.find(marker('icon'))).toHaveProp('name', 'lightbulb-o');
    });
  });

  describe('with label', () => {
    setProp('children', () => 'Button label');

    it('should render a label', () => {
      expect(subject.find('.Button__label')).toHaveText('Button label');
    });
  });

  describe('when loading', () => {
    setProp('loading', () => true);

    it('should be disabled', () => {
      expect(subject.find(marker('button'))).toHaveProp('disabled', true);
    });
  });

  describe('with small', () => {
    setProp('small', () => true);

    it('should render small', () => {
      expect(subject).toHaveClassName('Button--small');
    });
  });

  describe('with subtle', () => {
    setProp('theme', () => 'subtle');

    it('should render subtle', () => {
      expect(subject).toHaveClassName('Button--subtle');
    });
  });

  describe('with variant', () => {
    setProp('variant', () => 'pro');

    it('should render subtle', () => {
      expect(subject).toHaveClassName('Button--variant-pro');
    });
  });
});
