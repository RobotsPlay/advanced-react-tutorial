import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';

const RESET_MUTATUION = gql`
  mutation RESET_MUTATUION(
    $email: String!
    $token: String!
    $password: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`;

export default function Reset({ token }) {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token,
  });

  const [resetPassword, { data, loading, error }] = useMutation(
    RESET_MUTATUION,
    {
      variables: inputs,
    }
  );

  const successfulError = data?.redeemUserPasswordResetToken?.code
    ? {
        code: data.redeemUserPasswordResetToken.code,
        message: data.redeemUserPasswordResetToken.message,
      }
    : undefined;

  async function handleSubmit(e) {
    e.preventDefault();

    await resetPassword().catch(console.error);

    if (!error && !successfulError) {
      resetForm();
    }
  }

  return (
    <Form method="post" onSubmit={handleSubmit}>
      <h2>Request a Password Reset</h2>

      <DisplayError error={error || successfulError} />

      <fieldset disabled={loading} aria-busy={loading}>
        {data?.redeemUserPasswordResetToken === null && (
          <p>Success! You can now sign in.</p>
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

        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Your password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
      </fieldset>
      <button type="submit">Request Reset</button>
    </Form>
  );
}
