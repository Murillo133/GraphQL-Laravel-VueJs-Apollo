import gql from 'graphql-tag';

export const CREATE_VEHICLE = gql`
mutation ($input:CreateVehicleInput!){
    createVehicle(input:$input){
      brand
    }
}
 `
export const DELETE_VEHICLE = gql`mutation($id: ID!){
  deleteVehicle(id: $id){
    brand
  }
}
 `

export const UPDATE_VEHICLE = gql`
mutation ($input:UpdateVehicleInput!){
  updateVehicle(input:$input){
    brand
  }
}
`