import TrackerContext from '../state/TrackerContext'
import { useContext } from 'react'
import { TrackerItemType } from '../types/TrackerItemType'
import axios from 'axios'

export function formatDateToYYYYMMDD(date: Date): string {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}

export type DataPoint = {
  date: string
  carbAmt: number
}

export const saveConsumptionLogs = async (
  trackerItem: TrackerItemType,
  logs: { food_facts_id: number; consumption_date: string }[],
  dayToUpdate: string,
  toBeDeleted: boolean,
  toBeInserted: boolean
) => {
  try {
    console.log(
      'saveConsumptionLogs, trackerItem:',
      JSON.stringify(trackerItem) + ', dayToUpdate:' + dayToUpdate
    )
    const consumptionResponse = await axios({
      url: 'http://localhost:4001/pete-graphql',
      method: 'post',
      data: {
        query: `
          mutation ReplaceConsumptionLogs($logs: [ConsumptionLogInput]!, $dayToUpdate: String!, $toBeDeleted: Boolean!, $toBeInserted: Boolean!) {
            replaceConsumptionLogs(logs: $logs, dayToUpdate: $dayToUpdate, toBeDeleted: $toBeDeleted, toBeInserted: $toBeInserted) {
              consumption_log_id
              food_facts_id
              consumption_date
            }
          }
        `,
        variables: {
          logs,
          dayToUpdate,
          toBeDeleted,
          toBeInserted,
        },
      },
    })

    return consumptionResponse.data
  } catch (error) {
    console.error('Error fetching consumption:', error)
  }
}

export const saveFavouriteFoods = async (
  favouriteFoods: { food_facts_id: number }[],
  userId: string
) => {
  try {
    console.log('saveFavouriteFoods, userId:' + userId)
    const favouriteFoodResponse = await axios({
      url: 'http://localhost:4001/pete-graphql',
      method: 'post',
      data: {
        query: `
          mutation setFavouriteFoods($favouriteFoods: [FavouriteFoodsInput]!, $userId: String!) {
            setFavouriteFoods(favouriteFoods: $favouriteFoods, userId: $userId) {
              food_facts_id
            }
          }
        `,
        variables: {
          favouriteFoods,
          userId,
        },
      },
    })

    return favouriteFoodResponse.data
  } catch (error) {
    console.error('Error fetching favourite foods:', error)
  }
}

export const getTotalCarbsForSpecificDay = () => {
  const { trackerItems, setTotalCarbs, selectedDate } =
    useContext(TrackerContext)
  let carbsForDayAmt = 0
  console.log('GlycemicUtils, getTotalCarbsForSpecificDay called:')

  trackerItems.map((item) => {
    const itemDate = new Date(item.consumptionDate)

    if (
      itemDate.getFullYear() === selectedDate.getFullYear() &&
      itemDate.getMonth() === selectedDate.getMonth() &&
      itemDate.getDate() === selectedDate.getDate()
    ) {
      carbsForDayAmt = carbsForDayAmt + item.carbAmt
      console.log('GlycemicUtils, carbsForDayAmt:' + carbsForDayAmt)
    }
  })
  setTotalCarbs(carbsForDayAmt)
  return carbsForDayAmt
}

export const getGLResult = (carbAmt: number, giAmt: number) => {
  const carbsRatio = +carbAmt / 100
  const unit = 'g' // hard coding for now
  const servingFactor = { g: 1, oz: 28.3495231 }[unit]
  const serving = 100 // hard coding for now

  let glAmt = (giAmt * serving * carbsRatio * servingFactor) / 100
  glAmt = Math.round(glAmt * 100) / 100 //round 2 decimals

  return glAmt
}

// Total Carbs: calculated
export const getTotalCarbs = () => {
  const { trackerItems } = useContext(TrackerContext)
  let totalCarbs = 0
  trackerItems.map((trackerItem) => {
    totalCarbs += trackerItem.carbAmt
  })

  return totalCarbs
}

export const getTotalGILoad = () => {
  const { trackerItems } = useContext(TrackerContext)
  let totalGILoad = 0
  trackerItems.map((trackerItem) => {
    totalGILoad += trackerItem.glAmt
  })

  return totalGILoad
}
