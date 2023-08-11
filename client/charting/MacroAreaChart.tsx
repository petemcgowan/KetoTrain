import React from 'react'
import {
  VictoryChart,
  VictoryStack,
  VictoryArea,
  VictoryTheme,
} from 'victory-native'

type TrackerItemType = {
  id: string
  foodFactsId: number
  description: string
  carbAmt: number
  fiberAmt: number
  proteinAmt: number
  fatAmt: number
  energyAmt: number
  sugarsAmt: number
  sodiumAmt: number
  carbBackgroundColor: string
  portionAmount: number
  consumptionDate: Date
  isFavourite: boolean
}

type Props = {
  trackerItems: TrackerItemType[]
}

const MacroAreaChart: React.FC<Props> = ({ trackerItems }) => {
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

  // const filteredItems = trackerItems.filter(
  //   (item) => new Date(item.consumptionDate) >= oneWeekAgo
  // )
  // console.log('filteredItems:' + JSON.stringify(filteredItems))
  // const groupedByDate: { [key: string]: TrackerItemType[] } = {}

  // filteredItems.forEach((item) => {
  //   const date = item.consumptionDate.toISOString().split('T')[0]
  //   if (!groupedByDate[date]) {
  //     groupedByDate[date] = []
  //   }
  //   groupedByDate[date].push(item)
  // })

  // const data = Object.entries(groupedByDate).map(([date, items]) => {
  //   const totals = items.reduce(
  //     (acc, item) => {
  //       acc.protein += item.proteinAmt
  //       acc.carb += item.carbAmt
  //       acc.fat += item.fatAmt
  //       console.log('acc:' + JSON.stringify(acc))

  //       return acc
  //     },
  //     {
  //       protein: 0,
  //       carb: 0,
  //       fat: 0,
  //     }
  //   )
  //   console.log('totals:' + JSON.stringify(totals))
  //   return {
  //     date,
  //     ...totals,
  //   }
  // })
  console.log('data:' + JSON.stringify(data))

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
