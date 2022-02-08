/**
 * @jest-environment jsdom
 */
import rdf, { NamedNode } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import * as sh from '@ontologies/shacl';
import * as xsd from '@ontologies/xsd';
import { fireEvent, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { seq } from 'link-lib';
import { Resource } from 'link-redux';
import React from 'react';
import { act } from 'react-dom/test-utils';

import Flow from '../../../modules/Flow/topologies/Flow';
import ex from '../../../ontology/ex';
import form from '../../../ontology/form';
import ll from '../../../ontology/ll';
import {
  ScreenWidth,
  mockScreenWidth,
  renderLinked,
} from '../../../test-utils';

const s = (node: NamedNode) => node.toString();
const encode = (iri: NamedNode) => btoa(iri.value);

const entryPoint = ex.ns('entryPoint');
const formIRI = ex.ns('form');

const flow = (inputs: Array<Record<string, unknown>> = []) => ({
  '@id': entryPoint.value,
  [s(rdfx.type)]: schema.EntryPoint,
  [s(schema.httpMethod)]: 'PUT',
  [s(schema.name)]: 'Update',
  [s(ll.actionBody)]: seq([
    {
      '@id': formIRI,
      [s(rdfx.type)]: form.Form,
      [s(form.pages)]: seq([
        {
          '@id': rdf.blankNode(),
          [s(rdfx.type)]: form.Page,
          [s(form.groups)]: seq([
            {
              '@id': rdf.blankNode(),
              [s(rdfx.type)]: form.Group,
              [s(form.fields)]: seq(inputs.map((inp, index) => ({
                ...inp,
                [s(sh.order)]: index,
              }))),
            },
          ]),
        },
      ]),
    },
  ]),
});

const input = (type: NamedNode, path: NamedNode, props: Record<string, unknown> = {}) => ({
  [s(rdfx.type)]: type,
  [s(sh.datatype)]: xsd.string,
  [s(sh.name)]: path.value,
  [s(sh.path)]: path,
  ...props,
});

const renderFlowWithInputs = (...inputs: Array<Record<string, unknown>>) => renderLinked(({ iri }) => (
  <Flow>
    <Resource
      forceRender
      subject={iri}
    />
  </Flow>
), {
  resources: flow(inputs),
});

const enterText = (target: HTMLElement, value: string, blur = true) => {
  act(() => {
    userEvent.type(target, value);
    blur && fireEvent.blur(target);
  });
};

describe('Flows', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    sessionStorage.clear();
    mockScreenWidth();
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should render flow and input element', async () => {
    const {
      findByTestId,
    } = await renderFlowWithInputs(input(form.TextInput, schema.name));

    const flowElement = await findByTestId('flow-form');
    const inputElement = await findByTestId(encode(schema.name));

    expect(flowElement).toBeVisible();
    expect(inputElement).toBeVisible();
  });

  it('switches to the submission screen when Wrap up is clicked', async () => {
    const {
      findByText,
      findByTestId,
      getByTestId,
    } = await renderFlowWithInputs(
      input(form.TextInput, schema.name, {
        [s(sh.minCount)]: 1,
      }),
    );

    const inputElement = await findByTestId(encode(schema.name));
    const page = await findByText('Almost there!');

    expect(page).not.toBeVisible();

    const nextButton = getByTestId('next-button');

    act(() => {
      fireEvent.click(nextButton);
    });

    await waitFor(() => expect(inputElement).not.toBeVisible());

    expect(page).toBeVisible();
  });

  it('should return to the previous field when the previous-button is clicked', async () => {
    const {
      findByTestId,
    } = await renderFlowWithInputs(
      input(form.TextInput, schema.name, {
        [s(sh.minCount)]: 1,
      }),
      input(form.TextInput, schema.text, {
        [s(sh.minCount)]: 1,
      }),
    );

    const inputElement1 = await findByTestId(encode(schema.name));
    const nextButton = await findByTestId('next-button');
    const backButton = await findByTestId('previous-button');

    fireEvent.click(nextButton);

    await waitFor(() => expect(inputElement1).not.toBeVisible());

    act(() => {
      fireEvent.click(backButton);
    });

    await waitFor(() => expect(inputElement1).toBeVisible());

  });

  it('shows the Done submission screen when all fields are valid', async () => {
    const {
      findByTestId,
      findByText,
      getByTestId,
    } = await renderFlowWithInputs(
      input(form.TextInput, schema.name, {
        [s(sh.minCount)]: 1,
      }),
    );

    const inputElement = await findByTestId(encode(schema.name));

    enterText(inputElement, 'Something');

    const page = await findByText('Done! 🎉');

    expect(page).not.toBeVisible();

    const nextButton = getByTestId('next-button');

    act(() => {
      fireEvent.click(nextButton);
    });

    await waitFor(() => expect(page).toBeVisible());
  });

  it('goes back to first invalid input when go back is clicked', async () => {
    const {
      findByTestId,
      getByTestId,
    } = await renderFlowWithInputs(
      input(form.TextInput, schema.name, {
        [s(sh.minCount)]: 1,
      }),
      input(form.TextInput, schema.text, {
        [s(sh.minCount)]: 1,
      }),
      input(form.TextInput, schema.description, {
        [s(sh.minCount)]: 1,
      }),
    );

    const inputElement1 = await findByTestId(encode(schema.name));
    const inputElement2 = await findByTestId(encode(schema.text));
    const inputElement3 = await findByTestId(encode(schema.description));

    const nextButton = getByTestId('next-button');
    const goBackButton = getByTestId('to-invalid-field-button');

    enterText(inputElement1, 'Something');

    act(() => {
      fireEvent.click(nextButton);
      fireEvent.click(nextButton);
    });

    enterText(inputElement3, 'Something');

    act(() => {
      fireEvent.click(nextButton);
      fireEvent.click(goBackButton);
    });

    expect(inputElement2).toBeVisible();
  });

  it('should automatically advance the survey when enter is pressed inside an autoforwarded input', async () => {
    mockScreenWidth(ScreenWidth.LG);

    const {
      findByTestId,
    } = await renderFlowWithInputs(
      input(form.TextInput, schema.name),
      input(form.TextInput, schema.text),
    );

    const inputElement1 = await findByTestId(encode(schema.name));
    const inputElement2 = await findByTestId(encode(schema.text));

    await waitFor(() => expect(inputElement2).not.toBeVisible());

    enterText(inputElement1, 'Something', false);

    act(() => {
      fireEvent.keyDown(inputElement1, { key: 'Enter' });
    });

    await waitFor(() => expect(inputElement2).toBeVisible());
  });

  describe('Flow Stepper', () => {
    it('should be visible on widescreen', async () => {
      mockScreenWidth(ScreenWidth.LG);

      const {
        findByTestId,
      } = await renderFlowWithInputs(
        input(form.TextInput, schema.name),
      );

      const stepper = await findByTestId('flow-stepper');

      expect(stepper).toBeVisible();
    });

    it('should switch pages when the corresponding step is clicked', async () => {
      mockScreenWidth(ScreenWidth.LG);

      const {
        findByTestId,
      } = await renderFlowWithInputs(
        input(form.TextInput, schema.name),
        input(form.TextInput, schema.text),
        input(form.TextInput, schema.description),
      );

      const input3Name = encode(schema.description);
      const step = await findByTestId(`step-${input3Name}`);
      const inputElement3 = await findByTestId(input3Name);

      expect(step).toBeVisible();
      expect(inputElement3).not.toBeVisible();

      act(() => {
        fireEvent.click(step);
      });

      await waitFor(() => expect(inputElement3).toBeVisible());
    });
  });

  it('should show completed step when input is valid and touched', async () => {
    mockScreenWidth(ScreenWidth.LG);

    const {
      findByTestId,
      getByTestId,
    } = await renderFlowWithInputs(
      input(form.TextInput, schema.name, {
        [s(sh.minCount)]: 1,
      }),
    );

    const inputName = encode(schema.name);
    const inputElement = await findByTestId(inputName);
    const step = await findByTestId(`step-${inputName}`);

    expect(step).toBeVisible();

    act(() => {
      fireEvent.focus(inputElement);
    });
    enterText(inputElement, 'Something', false);

    expect(step).toHaveAttribute('data-testid', `step-${inputName}`);

    act(() => {
      fireEvent.blur(inputElement);
      fireEvent.click(getByTestId('next-button'));
    });

    await waitFor(() => expect(step).toHaveAttribute('data-testid', `completed-step-${inputName}`));
  });

  it('should navigate to the submission page when the stepper flag icon is clicked', async () => {
    mockScreenWidth(ScreenWidth.LG);

    const {
      findByTestId,
      findByText,
    } = await renderFlowWithInputs(
      input(form.TextInput, schema.name),
      input(form.TextInput, schema.text),
      input(form.TextInput, schema.description),
    );

    const submissionElement = await findByText('Done! 🎉');

    expect(submissionElement).not.toBeVisible();

    const stepperFlagIcon = await findByTestId('step-flag');

    act(() => {
      fireEvent.click(stepperFlagIcon);
    });

    await waitFor(() => expect(submissionElement).toBeVisible());
  });
});
