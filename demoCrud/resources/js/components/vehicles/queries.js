import gql from 'graphql-tag';

export const VEHICLES_QUERY = gql`
  query{
    vehicles{
    id
    brand
    color
    plate
    model
    allTerrain
    }
  }
`;