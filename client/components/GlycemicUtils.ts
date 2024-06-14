import TrackerContext from '../state/TrackerContext'
import { SetStateAction, useContext } from 'react'
import { TrackerItemType } from '../types/TrackerItemType'
import axios from 'axios'
import { TrackerContextType } from '../types/TrackerContextType'
import UserContext, { UserContextProps } from '../state/UserContext'
import { FoodDataType } from '../types/FoodDataType'
import { SearchListType } from '../types/SearchListType'

export const favouriteFoodItem = (
  descriptionGI: string,
  itemIsFavourite: boolean,
  setItemIsFavourite: {
    (value: SetStateAction<boolean>): void
    (itemIsFavourite: boolean): void
  },
  foodData: FoodDataType[],
  favFoodList,
  updateFavFoodList,
  userId: number | null,
  trackerItems: TrackerItemType[],
  setTrackerItems: React.Dispatch<React.SetStateAction<TrackerItemType[]>>,
  dispatch
) => {
  // get the food facts id for updating
  const matchingFoodFact = foodData.find(
    (item) => item.foodName === descriptionGI
  )
  type FavouriteFood = { foodFactsId: number; isFavourite: boolean }
  const favouriteFoods: FavouriteFood[] = []

  favouriteFoods.push({
    foodFactsId: Number(matchingFoodFact?.foodFactsId),
    isFavourite: !itemIsFavourite,
  })
  setItemIsFavourite(!itemIsFavourite)
  const start = performance.now()
  saveFavouriteFoods(favouriteFoods, userId)
  const end = performance.now()

  if (itemIsFavourite) {
    // it IS a favourite, so we're unfavouriting
    // remove from the local fav food list
    const newFavFoods = favFoodList.filter(({ foodName }) => {
      return foodName !== matchingFoodFact?.foodName
    })
    dispatch(updateFavFoodList(newFavFoods))
    const updatedTrackerItems = trackerItems.map((item) =>
      item.description === descriptionGI
        ? { ...item, isFavourite: !item.isFavourite }
        : item
    )
    setTrackerItems(updatedTrackerItems)
  } else {
    // add the local favourite
    if (matchingFoodFact) {
      // update fav food list
      const newFavFoods = [
        ...favFoodList,
        { ...matchingFoodFact, isFavourite: true },
      ]
      dispatch(updateFavFoodList(newFavFoods))

      let foundTrackerMatch = false
      const updatedTrackerItems = trackerItems.map((item) => {
        if (item.description === descriptionGI) {
          foundTrackerMatch = true
          return { ...item, isFavourite: true }
        }
        return item
      })

      if (foundTrackerMatch) {
        setTrackerItems(updatedTrackerItems)
      }
    }
  }
}

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
  addedItems: {
    foodFactsId: number
    consumptionDate: string
    userId: number | null
  }[],
  dayToUpdate: string,
  toBeDeleted: boolean,
  toBeInserted: boolean
) => {
  try {
    const consumptionResponse = await axios({
      // url: 'http://localhost:4001/keto-graphql',
      url: 'http://ec2-52-23-111-225.compute-1.amazonaws.com:4001/keto-graphql',
      method: 'post',
      data: {
        query: `
          mutation ReplaceConsumptionLogs($addedItems: [ConsumptionLogInput]!, $dayToUpdate: String!, $toBeDeleted: Boolean!, $toBeInserted: Boolean!) {
            replaceConsumptionLogs(addedItems: $addedItems, dayToUpdate: $dayToUpdate, toBeDeleted: $toBeDeleted, toBeInserted: $toBeInserted) {
              consumption_log_id
              food_facts_id
              consumption_date
            }
          }
        `,
        variables: {
          addedItems,
          dayToUpdate,
          toBeDeleted,
          toBeInserted,
        },
      },
    })

    return consumptionResponse.data
  } catch (error) {
    console.error('Error fetching consumption, saveConsumptionLogs:', error)
  }
}

export const getFavouriteFoods = async (userId: number | null, theme) => {
  try {
    const favouriteFoodResponse = await axios({
      // url: 'http://192.168.68.103:4001/keto-graphql',
      // url: 'http://localhost:4001/keto-graphql',
      url: 'http://ec2-52-23-111-225.compute-1.amazonaws.com:4001/keto-graphql',
      method: 'post',
      data: {
        query: `
          query getFavFoods($userId: Int!) {
            getFavFoods(favFoodsInput: { userId: $userId }) {
              favFoodFacts {
                foodFactsId: food_facts_id
                foodName: food_name
                publicFoodKey: public_food_key
                calcium
                carbohydrates
                classification
                energy
                fatTotal: fat_total
                iodine
                magnesium
                potassium
                protein
                saturatedFat: saturated_fat
                sodium
                totalDietaryFibre: total_dietary_fibre
                totalSugars: total_sugars
                isFavourite
              }
            }
          }`,
        variables: {
          userId,
        },
      },
    })

    const favFoods =
      await favouriteFoodResponse.data.data.getFavFoods.favFoodFacts.map(
        (item) => ({
          ...item,
          carbBackgroundColor:
            item.carbohydrates > 22
              ? theme.badBackground
              : item.carbohydrates > 11
              ? theme.middlingBackground
              : theme.tableBackground,
          carbohydrates: Math.round(item.carbohydrates),
        })
      )

    return favFoods
  } catch (error) {
    console.error('Error fetching favourite foods:', error)
  }
}

export const saveFavouriteFoods = async (
  favouriteFoods: { foodFactsId: number; isFavourite: boolean }[],
  userId: number | null
) => {
  try {
    const favouriteFoodResponse = await axios({
      // url: 'http://192.168.68.103:4001/keto-graphql',
      // url: 'http://localhost:4001/keto-graphql',
      url: 'http://ec2-52-23-111-225.compute-1.amazonaws.com:4001/keto-graphql',
      method: 'post',
      data: {
        query: `
          mutation setFavouriteFoods($favouriteFoods: [FavouriteFoodsInput]!, $userId: Int!) {
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

export const getTotalCarbsForSpecificDayGU = (
  trackerItems,
  selectedDate,
  setTotalCarbs
) => {
  let carbsForDayAmt = 0

  trackerItems.forEach((item) => {
    const itemDate = new Date(item.consumptionDate)

    if (
      itemDate.getFullYear() === selectedDate.getFullYear() &&
      itemDate.getMonth() === selectedDate.getMonth() &&
      itemDate.getDate() === selectedDate.getDate()
    ) {
      carbsForDayAmt += item.carbAmt * item.portionCount
    }
  })

  setTotalCarbs(carbsForDayAmt)
  return carbsForDayAmt
}

export function formatDateToISO(date: Date): string {
  return date.toISOString().split('T')[0]
}

export const getGLResult = (carbAmt: number, giAmt: number) => {
  const carbsRatio = +carbAmt / 100
  const unit = 'g'
  const servingFactor = { g: 1, oz: 28.3495231 }[unit]
  const serving = 100

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
