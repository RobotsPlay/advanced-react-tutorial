import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from './User';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';

const SIGNIN_MUTAION = gql`
  mutation SIGNIN_MUTAION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }

      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

export default function SignIn() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });

  const [signIn, { data, loading }] = useMutation(SIGNIN_MUTAION, {
    variables: inputs,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const error =
    data?.authenticateUserWithPassword.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined;

  async function handleSubmit(e) {
    e.preventDefault();

    await signIn();

    if (!error) {
      resetForm();
    }
  }

  return (
    <Form method="post" onSubmit={handleSubmit}>
      <h2>Sign In to Your Account</h2>

      <DisplayError error={error} />

      <fieldset disabled={loading} aria-busy={loading}>
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
      <button type="submit">Sign In</button>
    </Form>
  );
}
