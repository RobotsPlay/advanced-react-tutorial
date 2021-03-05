import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';

const REQUEST_RESET_MUTATUION = gql`
  mutation REQUEST_RESET_MUTATUION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

export default function RequestReset() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
  });

  const [resetPassword, { data, loading, error }] = useMutation(
    REQUEST_RESET_MUTATUION,
    {
      variables: inputs,
    }
  );

  async function handleSubmit(e) {
    e.preventDefault();

    await resetPassword().catch(console.error);

    if (!error) {
      resetForm();
    }
  }

  return (
    <Form method="post" onSubmit={handleSubmit}>
      <h2>Request a Password Reset</h2>

      <DisplayError error={error} />

      <fieldset disabled={loading} aria-busy={loading}>
        {data?.sendUserPasswordResetLink === null && (
          <p>Check your email for a password reset link.</p>
        )}

        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your email address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
      </fieldset>
      <button type="submit">Request Reset</button>
    </Form>
  );
}
