import React, { useContext } from 'react'
import { ScrollView, View, StyleSheet, Text } from 'react-native'
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
} from 'victory-native'

import { TrackerItemType } from '../types/TrackerItemType'
import { ThemeContext } from '../state/ThemeContext'

type EnergyChartProps = {
  trackerItems: TrackerItemType[]
}

type ChartDataType = {
  x: number
  y: number
}

const EnergyChart: React.FC<EnergyChartProps> = ({ trackerItems }) => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useContext was used outside of the theme provider')
  }
  const { theme } = context
  const styles = getStyles(theme)

  // Get date without time for grouping
  function getDateString(date: Date): string {
    return date.toISOString().split('T')[0]
  }

  // Group by consumptionDate
  const groupedByDate: { [date: string]: number } = {}
  trackerItems.forEach((item) => {
    const dateStr = getDateString(new Date(item.consumptionDate))
    if (!groupedByDate[dateStr]) {
      groupedByDate[dateStr] = 0
    }
    groupedByDate[dateStr] += item.energyAmt
  })

  // Get the last 7 days of data
  const last7Dates: string[] = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    last7Dates.push(getDateString(d))
  }

  const lastWeekItems = last7Dates.map((dateStr) => {
    return {
      consumptionDate: dateStr,
      energyAmt: groupedByDate[dateStr] || 0, // default to 0 if no data for that day
    }
  })

  // Prepare data for chart
  const chartData: ChartDataType[] = lastWeekItems.map((item) => ({
    x: new Date(item.consumptionDate).getDay(), // Use the day of the week as x
    y: item.energyAmt,
  }))

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  // Start with the correct day of the week
  const firstDayOfWeek = new Date(lastWeekItems[0].consumptionDate).getDay()

  const adjustedDays = days
    .slice(firstDayOfWeek)
    .concat(days.slice(0, firstDayOfWeek))

  return (
    <ScrollView horizontal={true}>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={{ x: 10, y: 5 }}
        width={420} // Width of the chart
      >
        <VictoryAxis dependentAxis tickFormat={(tick) => `${tick}`} />
        <VictoryAxis
          tickValues={chartData.map((data) => data.x)} // Specify which ticks to display
          tickFormat={(tick) => days[tick]}
        />
        <VictoryBar
          data={chartData}
          barWidth={30} // Width of each bar
          style={{ data: { fill: '#c43a31' } }} // Color of the bars
        />
      </VictoryChart>
      <View style={styles.whiteSeparator}>
        <Text>Test</Text>
      </View>
    </ScrollView>
  )
}

export default EnergyChart

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
