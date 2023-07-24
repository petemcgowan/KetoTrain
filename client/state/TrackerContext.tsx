import React from 'react'
import { TrackerContextType } from './TrackerContextType'

// Initial values are not really used, they serve as a "fallback" and for type inference
const defaultValues: TrackerContextType = {
  trackerItems: [],
  setTrackerItems: (value) => {},
  totalCarbs: 0,
  setTotalCarbs: (value) => {},
  selectedDate: new Date(),
  setSelectedDate: (value) => {},
  itemsForSelectedDate: [],
  setItemsForSelectedDate: (value) => {},
  handlePrevDay: () => {},
  handleNextDay: () => {},
  foodData: [],
  setFoodData: (value) => {},
  searchFoodList: [],
  setSearchFoodList: (value) => {},
  favFoodList: [],
  setFavFoodList: (value) => {},
}

const TrackerContext = React.createContext<TrackerContextType>(defaultValues)

export const TrackerProvider = TrackerContext.Provider
export default TrackerContext
