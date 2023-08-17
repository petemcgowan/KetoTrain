import React, { useEffect, useContext } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import {
  VictoryChart,
  VictoryStack,
  VictoryArea,
  VictoryTheme,
} from 'victory-native'
import { ThemeContext } from '../state/ThemeContext'
import { TrackerItemType } from '../types/TrackerItemType'

type Props = {
  trackerItems: TrackerItemType[]
}

const MacroAreaChart: React.FC<Props> = ({ trackerItems }) => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useContext was used outside of the theme provider')
  }
  const { theme } = context
  const styles = getStyles(theme)

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
        dateString: string
      }
    } = {}
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(oneWeekAgo)
      currentDay.setDate(currentDay.getDate() + i)

      const dayString = currentDay.toLocaleString('en-US', { weekday: 'short' })
      const dateString = currentDay.toISOString().split('T')[0]

      data[dateString] = {
        date: dayString,
        protein: 0,
        carb: 0,
        fat: 0,
        dateString: dateString,
      }
    }
    return data
  }

  const dataMap = initializeEmptyData()

  trackerItems.forEach((item) => {
    const dateString = item.consumptionDate.toISOString().split('T')[0]
    if (dataMap[dateString]) {
      dataMap[dateString].protein += item.proteinAmt * item.portionCount
      dataMap[dateString].carb += item.carbAmt * item.portionCount
      dataMap[dateString].fat += item.fatAmt * item.portionCount
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

const getStyles = (theme) =>
  StyleSheet.create({
    whiteSeparator: {
      height: 140,
      backgroundColor: 'white',
      marginVertical: 20,
      width: '90%',
      alignSelf: 'center',
    },
  })
