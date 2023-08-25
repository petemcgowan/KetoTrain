import { gql } from '@apollo/client'

const DELETE_USER = gql`
  mutation DeleteUser($userId: Int!) {
    deleteUser(userId: $userId)
  }
`

export default DELETE_USER
