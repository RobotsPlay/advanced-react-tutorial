import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';

const SIGNUP_MUTAION = gql`
  mutation SIGNUP_MUTAION($email: String!, $name: String!, $password: String!) {
    createUser(data: { email: $email, name: $name, password: $password }) {
      id
      email
      name
    }
  }
`;

export default function SignUp() {
  const { inputs, handleChange, resetForm } = useForm({
    name: '',
    email: '',
    password: '',
  });

  const [signUp, { data, loading, error }] = useMutation(SIGNUP_MUTAION, {
    variables: inputs,
  });

  async function handleSubmit(e) {
    e.preventDefault();

    await signUp().catch(console.error);

    if (!error) {
      resetForm();
    }
  }

  return (
    <Form method="post" onSubmit={handleSubmit}>
      <h2>Sign Up for an Account</h2>

      <DisplayError error={error} />

      <fieldset disabled={loading} aria-busy={loading}>
        {data?.createUser && (
          <p>
            Signed up with {data.createUser.email}. Please go ahead and sign in.
          </p>
        )}

        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            placeholder="Your name"
            autoComplete="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>

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
      <button type="submit">Sign Up</button>
    </Form>
  );
}
