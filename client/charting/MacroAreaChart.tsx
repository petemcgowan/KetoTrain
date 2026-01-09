import React, { useContext } from 'react'
import { View, StyleSheet, Text, Dimensions } from 'react-native'
import { CartesianChart, Area } from 'victory-native'
import { useFont } from '@shopify/react-native-skia'
import { ThemeContext } from '../state/ThemeContext'
import { TrackerItemType } from '../types/TrackerItemType'

const karlaFont = require('../assets/fonts/Karla-Light.ttf')
const { width } = Dimensions.get('window')

type Props = {
  trackerItems: TrackerItemType[]
}

const MacroAreaChart: React.FC<Props> = ({ trackerItems }) => {
  const { theme } = useContext(ThemeContext)!
  const font = useFont(karlaFont, 12)

  const today = new Date()
  const oneWeekAgo = new Date(today)
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

  // Data Prep
  const initializeEmptyData = () => {
    const data: any = {}
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(oneWeekAgo)
      currentDay.setDate(currentDay.getDate() + i)
      const dateString = currentDay.toISOString().split('T')[0]
      const dayLabel = currentDay.toLocaleString('en-US', { weekday: 'short' })

      data[dateString] = {
        date: dayLabel,
        rawProtein: 0,
        rawCarb: 0,
        rawFat: 0,
        xIndex: i,
      }
    }
    return data
  }

  const dataMap = initializeEmptyData()

  // Aggregate
  trackerItems.forEach((item) => {
    const d = new Date(item.consumptionDate)
    if (isNaN(d.getTime())) return
    const dateString = d.toISOString().split('T')[0]

    if (dataMap[dateString]) {
      dataMap[dateString].rawProtein += item.proteinAmt * item.portionCount
      dataMap[dateString].rawCarb += item.carbAmt * item.portionCount
      dataMap[dateString].rawFat += item.fatAmt * item.portionCount
    }
  })

  // Stack Data (Cumulative for Area overlap)
  const chartData = Object.values(dataMap)
    .map((d: any) => {
      const fat = d.rawFat
      const carbStack = d.rawFat + d.rawCarb
      const proteinStack = d.rawFat + d.rawCarb + d.rawProtein

      return {
        date: d.date,
        xIndex: d.xIndex,
        fat,
        carbStack,
        proteinStack,
      }
    })
    .sort((a: any, b: any) => a.xIndex - b.xIndex)

  if (!font)
    return (
      <View style={{ height: 250 }}>
        <Text style={{ color: 'white' }}>Loading...</Text>
      </View>
    )

  return (
    <View style={styles.chartContainer}>
      <CartesianChart
        data={chartData}
        xKey="xIndex"
        yKeys={['proteinStack', 'carbStack', 'fat']}
        domainPadding={{ top: 20, left: 10, right: 10 }}
        axisOptions={{
          font,
          lineColor: theme.buttonText,
          labelColor: theme.buttonText,
          tickCount: 7,
          formatXLabel: (value) => {
            const index = Math.round(value)
            return chartData[index]?.date || ''
          },
        }}
      >
        {({ points, chartBounds }) => (
          <>
            {/* Protein (Total) - Orange */}
            <Area
              points={points.proteinStack}
              y0={chartBounds.bottom}
              color="#E38627"
              animate={{ type: 'spring' }}
            />
            {/* Carb (Fat + Carb) - Red */}
            <Area
              points={points.carbStack}
              y0={chartBounds.bottom}
              color="#C13C37"
              animate={{ type: 'spring' }}
            />
            {/* Fat (Bottom) - Dark Red/Brown */}
            <Area
              points={points.fat}
              y0={chartBounds.bottom}
              color="#6A2135"
              animate={{ type: 'spring' }}
            />
          </>
        )}
      </CartesianChart>
    </View>
  )
}

export default MacroAreaChart

const styles = StyleSheet.create({
  chartContainer: {
    height: 250,
    width: width * 0.85,
    alignSelf: 'center',
    marginVertical: 10,
  },
})
