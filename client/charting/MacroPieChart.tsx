import React, { useContext } from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import { PolarChart, Pie } from 'victory-native'
import { useFont } from '@shopify/react-native-skia'
import { ThemeContext } from '../state/ThemeContext'
import { TrackerItemType } from '../types/TrackerItemType'

const karlaFont = require('../assets/fonts/Karla-Light.ttf')
const { width } = Dimensions.get('window')

type Props = {
  trackerItems: TrackerItemType[]
}

const MacroPieChart: React.FC<Props> = ({ trackerItems }) => {
  const { theme } = useContext(ThemeContext)!
  const font = useFont(karlaFont, 12)

  const today = new Date()
  const oneWeekAgo = new Date(today)
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

  // Filter Data
  const filteredItems = trackerItems.filter((item) => {
    const d = new Date(item.consumptionDate)
    return !isNaN(d.getTime()) && d >= oneWeekAgo
  })

  // Sum Totals
  const totals = filteredItems.reduce(
    (acc, item) => {
      acc.protein += item.proteinAmt * item.portionCount
      acc.carb += item.carbAmt * item.portionCount
      acc.fat += item.fatAmt * item.portionCount
      return acc
    },
    { protein: 0, carb: 0, fat: 0 }
  )

  // Format for Victory Skia
  const pieData = [
    { label: 'Protein', value: totals.protein, color: '#E38627' }, // Orange
    { label: 'Carbs', value: totals.carb, color: '#C13C37' }, // Red
    { label: 'Fats', value: totals.fat, color: '#6A2135' }, // Dark Red/Brown
  ].filter((d) => d.value > 0)

  if (pieData.length === 0) {
    return (
      <View style={[styles.chartContainer, { justifyContent: 'center' }]}>
        <Text style={{ color: theme.buttonText, textAlign: 'center' }}>
          No data for this week
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.chartContainer}>
      <PolarChart
        data={pieData}
        labelKey="label"
        valueKey="value"
        colorKey="color"
      >
        <Pie.Chart>{({ slice }) => <Pie.Slice />}</Pie.Chart>
      </PolarChart>
    </View>
  )
}

export default MacroPieChart

const styles = StyleSheet.create({
  chartContainer: {
    height: 250,
    width: width * 0.8,
    alignSelf: 'center',
    marginVertical: 10,
    justifyContent: 'center',
  },
})
