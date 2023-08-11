import React from 'react'
import { VictoryPie } from 'victory-native'

type TrackerItemType = {
  id: string,
  foodFactsId: number,
  description: string,
  carbAmt: number,
  fiberAmt: number,
  proteinAmt: number,
  fatAmt: number,
  energyAmt: number,
  sugarsAmt: number,
  sodiumAmt: number,
  carbBackgroundColor: string,
  portionAmount: number,
  consumptionDate: Date,
  isFavourite: boolean,
}

type Props = {
  trackerItems: TrackerItemType[],
}

const MacroPieChart: React.FC<Props> = ({ trackerItems }) => {
  const today = new Date()
  const oneWeekAgo = new Date(today)
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

  const filteredItems = trackerItems.filter(
    (item) => new Date(item.consumptionDate) >= oneWeekAgo
  )

  const totals = filteredItems.reduce(
    (acc, item) => {
      acc.protein += item.proteinAmt
      acc.carb += item.carbAmt
      acc.fat += item.fatAmt
      return acc
    },
    {
      protein: 0,
      carb: 0,
      fat: 0,
    }
  )

  const pieData = [
    { x: 'Protein', y: totals.protein },
    { x: 'Carbs', y: totals.carb },
    { x: 'Fats', y: totals.fat },
  ]

  return (
    <VictoryPie
      data={pieData}
      colorScale={['#E38627', '#C13C37', '#6A2135']}
      labelRadius={60}
      style={{ labels: { fill: 'white', fontSize: 12, fontWeight: 'bold' } }}
      animate={{ duration: 500 }}
    />
  )
}

export default MacroPieChart
