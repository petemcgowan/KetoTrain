import { RefObject, View } from 'react'
import { ItemProps } from './ItemProps'

interface TrackerItemProps {
  item: ItemProps
  setTrackerSelected: (trackerSelected: number) => void
  trackerSelected: number
  clickNutrientPanel: () => void
}

export type { ItemProps, TrackerItemProps }
