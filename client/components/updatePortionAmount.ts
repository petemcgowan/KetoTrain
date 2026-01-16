import axios from 'axios'
import Config from 'react-native-config'
const uri = Config.GRAPHQL_URL || 'http://localhost:4001/keto-graphql'

export async function updatePortionAmountApi(
  userId: string,
  consumptionDate: string,
  foodFactsId: number,
  portionAmount: number
): Promise<boolean> {
  try {
    console.log(
      'updatePortionAmountApi, consumptionDate:' +
        consumptionDate +
        ', portionAmount:' +
        portionAmount
    )
    const response = /*await*/ axios({
      url: uri,
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
          foodFactsId: parseInt(foodFactsId, 10),
          portionAmount: portionAmount,
        },
      },
    })

    return response.data?.data?.updatePortionAmount || false
  } catch (error) {
    console.error('Failed to update portion amount:', error)
    return false
  }
}
