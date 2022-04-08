/**
 * @jest-environment jsdom
 */

import { ThemeProvider } from '@material-ui/styles';
import {
  act,
  fireEvent,
  render,
} from '@testing-library/react';
import React from 'react';

import themes from '../../themes';

import Button, {
  ButtonProps,
  ButtonVariant,
} from './index';

describe('Button', () => {
  const aria = 'tested button';
  const link = 'http://argu.co/resource';
  const onClick = jest.fn();

  const renderComp = (props: Partial<React.PropsWithChildren<ButtonProps>> = {}) => render((
    <ThemeProvider theme={themes.common({})}>
      <Button
        ariaLabel={aria}
        {...props}
      />
    </ThemeProvider>
  ));

  it('should render', () => {
    const { getByLabelText } = renderComp({ onClick });

    expect(getByLabelText(aria)).toBeVisible();
    expect(onClick).not.toHaveBeenCalled();
    expect(getByLabelText(aria)).toHaveClass('Button');
  });

  it('should have button class by default', () => {
    const { getByLabelText } = renderComp({ onClick });

    expect(getByLabelText(aria)).toBeVisible();
    expect(onClick).not.toHaveBeenCalled();
    expect(getByLabelText(aria)).toHaveClass('Button');
    expect(getByLabelText(aria)).not.toHaveClass('Button--small');
  });

  it('should be pressable', () => {
    const { getByLabelText } = renderComp({ onClick });

    act(() => {
      fireEvent.click(getByLabelText(aria));
    });

    expect(onClick).toHaveBeenCalled();
  });

  it('should not be disabled', () => {
    const { getByLabelText } = renderComp();

    expect(getByLabelText(aria)).not.toHaveAttribute('disabled');
  });

  it('should render a button', () => {
    const { getByLabelText } = renderComp();

    expect(getByLabelText(aria)).toBeInstanceOf(HTMLButtonElement);
    expect(getByLabelText(aria)).not.toHaveAttribute('type', 'a');
    expect(getByLabelText(aria)).toHaveAttribute('type', 'button');
  });

  describe('with custom class', () => {
    it('should render classname', () => {
      const { getByLabelText } = renderComp({ className: 'custom' });

      expect(getByLabelText(aria)).toHaveClass('custom');
    });
  });

  describe('with href', () => {
    it('should render a link', () => {
      const { getByLabelText } = renderComp({ href: link });

      expect(getByLabelText(aria)).toBeInstanceOf(HTMLAnchorElement);
    });

    it('should point to the link', () => {
      const { getByLabelText } = renderComp({ href: link });

      expect(getByLabelText(aria)).toHaveAttribute('href', link);
    });

    it('should not be disabled', () => {
      const { getByLabelText } = renderComp({ href: link });

      expect(getByLabelText(aria)).not.toHaveAttribute('disabled');
    });
  });

  describe('with icon', () => {
    it('should render an icon', () => {
      const { getByTestId } = renderComp({ icon: 'lightbulb-o' });

      expect(getByTestId('Button-icon')).toHaveClass('fa-lightbulb-o');
    });
  });

  describe('with label', () => {
    it('should render a label', () => {
      const { getByText } = renderComp({ children: 'label text' });

      expect(getByText('label text')).toBeVisible();
    });
  });

  describe('when loading', () => {
    it('should be disabled', () => {
      const { getByLabelText } = renderComp({ loading: true });

      expect(getByLabelText(aria)).toHaveAttribute('disabled');
    });
  });

  describe('with small', () => {
    it('should render small', () => {
      const { getByLabelText } = renderComp({ small: true });

      expect(getByLabelText(aria)).toHaveStyle({
        'fontSize': '.85em',
      });
    });
  });

  describe('with subtle', () => {
    it('should render subtle', () => {
      const { getByLabelText } = renderComp({ variant: ButtonVariant.Subtle });

      expect(getByLabelText(aria)).toHaveStyle({
        'color': 'rgb(76, 76, 76)',
      });
    });
  });
});
