import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { TextField } from './TextField';

// ---------- TestForm ----------
const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
});

interface Person {
  firstName: string;
  lastName: string;
}

interface TestFormProps {
  onSubmit: (person: Person) => void;
}

function TestForm({ onSubmit }: TestFormProps) {
  const { formState, register, handleSubmit } = useForm<Person>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });
  const { errors } = formState;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        id="firstName"
        {...register('firstName')}
        label="First"
        error={errors.firstName?.message}
      />

      {/* test a field without a label */}
      <TextField
        id="lastName"
        {...register('lastName')}
        testId="lastname"
        error={errors.lastName?.message}
      />

      <button type="submit">Submit</button>
    </form>
  );
}

// ---------- Tests ----------
const handleSubmit = jest.fn();

beforeEach(() => {
  jest.resetAllMocks();
});

describe('<TextField />', () => {
  test('displays a validation error if validation fails', async () => {
    render(<TestForm onSubmit={handleSubmit} />);

    // Submit form with lastName not filled
    userEvent.type(screen.getByLabelText('First'), 'John');
    userEvent.click(screen.getByText('Submit'));

    // Expect to see a validation error
    expect(
      await screen.findByText('lastName is a required field')
    ).toBeTruthy();
  });

  test('submits form information if all validations pass', async () => {
    render(<TestForm onSubmit={handleSubmit} />);

    // Enter valid information and submit form
    userEvent.type(screen.getByLabelText('First'), 'John');
    userEvent.type(screen.getByTestId('lastname'), 'Smith');
    userEvent.click(screen.getByText('Submit'));

    // Expect handleSubmit to be called with the entered information
    await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(1));
    expect(handleSubmit).toHaveBeenCalledWith(
      {
        firstName: 'John',
        lastName: 'Smith',
      },
      // ignore the event that is sent to handleSubmit
      expect.anything()
    );
  });
});
