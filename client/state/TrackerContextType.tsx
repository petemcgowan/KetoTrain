import React from 'react'
import { TrackerItemType } from '../types/TrackerItemType'
import { FoodDataType } from '../types/FoodDataType'
import { SearchListType } from '../types/SearchListType'

export type TrackerContextType = {
  trackerItems: TrackerItemType[]
  setTrackerItems: React.Dispatch<React.SetStateAction<TrackerItemType[]>>
  totalCarbs: number
  setTotalCarbs: React.Dispatch<React.SetStateAction<number>>
  selectedDate: Date
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>
  itemsForSelectedDate: TrackerItemType[]
  setItemsForSelectedDate: React.Dispatch<
    React.SetStateAction<TrackerItemType[]>
  >
  handlePrevDay: () => void
  handleNextDay: () => void
  foodData: FoodDataType[]
  setFoodData: React.Dispatch<React.SetStateAction<FoodDataType[]>>
  searchFoodList: SearchListType[]
  setSearchFoodList: React.Dispatch<React.SetStateAction<SearchListType[]>>
  favFoodList: SearchListType[]
  setFavFoodList: React.Dispatch<React.SetStateAction<SearchListType[]>>
}
