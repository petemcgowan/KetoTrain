interface ItemProps {
  id: string
  description: string
  carbAmt: number
  giAmt: number
  glAmt: number
  fiberAmt: number
  fatAmt: number
  energyAmt: number
  sugarsAmt: number
  sodiumAmt: number
  giBackgroundColor: string
  glBackgroundColor: string
  carbBackgroundColor: string
  portionAmount: number
}

interface TrackerItemProps {
  item: ItemProps
  setTrackerSelected: (trackerSelected: number) => void
  trackerSelected: number
}

export type { ItemProps, TrackerItemProps }
