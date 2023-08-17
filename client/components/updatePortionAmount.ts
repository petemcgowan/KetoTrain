import axios from 'axios'

import { REACT_APP_BACKEND_HOST, REACT_APP_BACKEND_PORT } from '@env'

const ENDPOINT = `${REACT_APP_BACKEND_HOST}:${REACT_APP_BACKEND_PORT}/keto-graphql`

export async function updatePortionAmountApi(
  userId: string,
  consumptionDate: string,
  foodFactsId: number,
  portionAmount: number
): Promise<boolean> {
  const query = `
    mutation UpdatePortion($userId: Int!, $consumptionDate: String!, $foodFactsId: Int!, $portionAmount: Int!) {
      updatePortionAmount(userId: $userId, consumptionDate: $consumptionDate, foodFactsId: $foodFactsId, portionAmount: $portionAmount)
    }
  `

  // const variables = {
  //   userId,
  //   consumptionDate,
  //   parseInt(foodFactsId, 10),
  //   portionAmount,
  // }

  try {
    const response = await axios({
      url: `${REACT_APP_BACKEND_HOST}:${REACT_APP_BACKEND_PORT}/keto-graphql`,
      method: 'post',
      data: {
        query: `
          mutation UpdatePortion($userId: Int!, $consumptionDate: String!, $foodFactsId: Int!, $portionAmount: Int!) {
            updatePortionAmount(userId: $userId, consumptionDate: $consumptionDate, foodFactsId: $foodFactsId, portionAmount: $portionAmount)
          }
        `,
        variables: {
          userId: userId,
          consumptionDate: consumptionDate,
          foodFactsId: parseInt(foodFactsId, 10), // or directly parseInt(foodFactsId, 10)
          portionAmount: portionAmount,
        },
      },
    })

    // const response = await axios.post(ENDPOINT, {
    //   query,
    //   variables,
    // })

    return response.data?.data?.updatePortionAmount || false
  } catch (error) {
    console.error('Failed to update portion amount:', error)
    return false
  }
}
