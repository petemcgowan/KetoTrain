import { TrackerItemType } from './TrackerItemType'

interface TrackerItemProps {
  item: TrackerItemType
  index: number
  setTrackerSelected: (trackerSelected: number) => void
  trackerSelected: number
  clickNutrientPanel: () => void
  carbBackgroundColor: string
  selectedDate: Date
  itemsForSelectedDate: TrackerItemType[]
  setItemsForSelectedDate: React.Dispatch<
    React.SetStateAction<TrackerItemType[]>
  >
}

export type { TrackerItemProps }
