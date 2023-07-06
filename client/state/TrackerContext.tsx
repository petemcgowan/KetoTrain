import React from 'react'
import { TrackerContextType } from './TrackerContextType' // adjust the path to your actual file

// Initial values are not really used, they serve as a "fallback" and for type inference
const defaultValues: TrackerContextType = {
  trackerItems: [],
  setTrackerItems: () => {},
  totalCarbs: 0,
  setTotalCarbs: () => {},
  totalGILoad: 0,
  setTotalGILoad: () => {},
  selectedDate: new Date(),
  setSelectedDate: () => {},
  itemsForSelectedDate: [],
  setItemsForSelectedDate: () => {},
  handlePrevDay: () => {},
  handleNextDay: () => {},
  foodData: [],
  userId: null,
  setUserId: () => {},
}

const TrackerContext = React.createContext<TrackerContextType>(defaultValues)

export const TrackerProvider = TrackerContext.Provider
export default TrackerContext
