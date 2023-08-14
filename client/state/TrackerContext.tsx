import React from 'react'
import { TrackerContextType } from '../types/TrackerContextType'

// Initial values are not really used, they serve as a "fallback" and for type inference
const defaultValues: TrackerContextType = {
  trackerItems: [],
  setTrackerItems: (value) => {},
  totalCarbs: 0,
  setTotalCarbs: (value) => {},
}

const TrackerContext = React.createContext<TrackerContextType>(defaultValues)

export const TrackerProvider = TrackerContext.Provider
export default TrackerContext
