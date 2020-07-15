import gql from 'graphql-tag';

export const CREATE_ANIMAL = gql`
mutation ($input:CreateAnimalInput!){
    createAnimal(input:$input){
      name
    }
}
 `
export const DELETE_ANIMAL = gql`mutation($id: ID!){
  deleteAnimal(id: $id){
    name
  }
}
 `

export const UPDATE_ANIMAL = gql`
mutation ($input:UpdateAnimalInput!){
  updateAnimal(input:$input){
    name
  }
}
`