import React from 'react'
import { TrackerItemType } from './TrackerItemType'

export type TrackerContextType = {
  trackerItems: TrackerItemType[]
  setTrackerItems: React.Dispatch<React.SetStateAction<TrackerItemType[]>>
  totalCarbs: number
  setTotalCarbs: React.Dispatch<React.SetStateAction<number>>
}
