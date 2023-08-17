import React from 'react'
import { TrackerItemType } from './TrackerItemType'

export type TimeContextType = {
  selectedDate: Date
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>
  itemsForSelectedDate: TrackerItemType[]
  setItemsForSelectedDate: React.Dispatch<
    React.SetStateAction<TrackerItemType[]>
  >
  // handlePrevDay: () => void
  // handleNextDay: () => void
}
