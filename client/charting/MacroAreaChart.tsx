import React, { useEffect } from 'react'
import {
  VictoryChart,
  VictoryStack,
  VictoryArea,
  VictoryTheme,
} from 'victory-native'

import { TrackerItemType } from '../types/TrackerItemType'

type Props = {
  trackerItems: TrackerItemType[]
}

const MacroAreaChart: React.FC<Props> = ({ trackerItems }) => {
  console.log('MacroAreaChart is rendering')
  const today = new Date()
  const oneWeekAgo = new Date(today)
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

  const initializeEmptyData = () => {
    const data: {
      [key: string]: {
        date: string
        protein: number
        carb: number
        fat: number
      }
    } = {}
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(oneWeekAgo)
      currentDay.setDate(currentDay.getDate() + i)
      const dateString = currentDay.toISOString().split('T')[0]
      data[dateString] = { date: dateString, protein: 0, carb: 0, fat: 0 }
    }
    return data
  }

  const dataMap = initializeEmptyData()

  trackerItems.forEach((item) => {
    const date = item.consumptionDate.toISOString().split('T')[0]
    if (dataMap[date]) {
      dataMap[date].protein += item.proteinAmt
      dataMap[date].carb += item.carbAmt
      dataMap[date].fat += item.fatAmt
    }
  })

  const data = Object.values(dataMap)

  return (
    <VictoryChart theme={VictoryTheme.material}>
      <VictoryStack>
        <VictoryArea
          data={data}
          x="date"
          y="protein"
          style={{ data: { fill: '#E38627' } }} // Color for Protein
        />
        <VictoryArea
          data={data}
          x="date"
          y="carb"
          style={{ data: { fill: '#C13C37' } }} // Color for Carbs
        />
        <VictoryArea
          data={data}
          x="date"
          y="fat"
          style={{ data: { fill: '#6A2135' } }} // Color for Fats
        />
      </VictoryStack>
    </VictoryChart>
  )
}

export default MacroAreaChart
