import gql from 'graphql-tag';

export const ANIMALS_QUERY = gql`
  query{
     animals{
    id
    name
    color
    weight
    }
  }
`;