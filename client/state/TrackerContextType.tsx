import React from 'react'
import { TrackerItemType } from '../types/TrackerItemType'
import { FoodDataType } from '../types/FoodDataType'
// import glycemicData from "./data/usdaNutrition.json";
export type TrackerContextType = {
  trackerItems: TrackerItemType[]
  setTrackerItems: React.Dispatch<React.SetStateAction<TrackerItemType[]>>
  totalCarbs: number
  setTotalCarbs: React.Dispatch<React.SetStateAction<number>>
  totalGILoad: number
  setTotalGILoad: React.Dispatch<React.SetStateAction<number>>
  selectedDate: Date
  setSelectedDate: React.Dispatch<React.SetStateAction<number>>
  itemsForSelectedDate: TrackerItemType[]
  setItemsForSelectedDate: React.Dispatch<
    React.SetStateAction<TrackerItemType[]>
  >
  handlePrevDay: () => void
  handleNextDay: () => void
  foodData: FoodDataType[]
}
