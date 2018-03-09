import BlurButton from './index';

const clickHandler = jest.fn();

argUnit(BlurButton, () => {
  it('should render', () => {
    expect(clickHandler).not.toHaveBeenCalled();
    expect(subject).toMatchSnapshot();
  });

  it('should blur when clicked', () => {
    const blur = jest.fn();
    const eventMock = {
      currentTarget: { blur },
      nativeEvent: { x: 1 },
    };
    expect(subject.simulate('click', eventMock));
    expect(clickHandler).not.toHaveBeenCalled();
    expect(blur).toHaveBeenCalled();
  });

  it('should not blur when press enter', () => {
    const blur = jest.fn();
    const eventMock = {
      currentTarget: { blur },
      nativeEvent: { x: 0 },
    };
    expect(subject.simulate('click', eventMock));
    expect(clickHandler).not.toHaveBeenCalled();
    expect(blur).not.toHaveBeenCalled();
  });

  describe('with onClick', () => {
    setProp('onClick', () => clickHandler);

    it('should call onClick', () => {
      const blur = jest.fn();
      const eventMock = {
        currentTarget: { blur },
        nativeEvent: { x: 1 },
      };
      expect(subject.simulate('click', eventMock));
      expect(clickHandler).toHaveBeenCalled();
    });
  });
});
