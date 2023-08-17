import React from 'react'
import { TimeContextType } from '../types/TimeContextType'

const defaultValues = {
  selectedDate: new Date(),
  setSelectedDate: (value) => {},
  itemsForSelectedDate: [],
  setItemsForSelectedDate: (value) => {},
}

const TimeContext = React.createContext<TimeContextType>(defaultValues)
export const TimeProvider = TimeContext.Provider
export default TimeContext
