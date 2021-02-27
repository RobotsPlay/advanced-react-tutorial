import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

function updateCache(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteProduct));
}

export default function DeleteProduct({ id, children }) {
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { id },
    update: updateCache,
  });

  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => {
        if (window.confirm('Are you sure you want to delete this item?')) {
          deleteProduct().catch((err) => {
            alert('Unexpected Error');
          });
        }
      }}
    >
      {children}
    </button>
  );
}
