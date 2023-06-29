import { TrackerItemType } from './TrackerItemType'

interface TrackerItemProps {
  item: TrackerItemType
  index: number
  setTrackerSelected: (trackerSelected: number) => void
  trackerSelected: number
  clickNutrientPanel: () => void
}

export type { TrackerItemProps }
