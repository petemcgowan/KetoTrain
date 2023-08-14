import React from 'react'
import { ScrollView } from 'react-native'
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
} from 'victory-native'

import { TrackerItemType } from '../types/TrackerItemType'

type EnergyChartProps = {
  trackerItems: TrackerItemType[]
}

type ChartDataType = {
  x: number
  y: number
}

const EnergyChart: React.FC<EnergyChartProps> = ({ trackerItems }) => {
  // Extract last 7 days of data
  const lastWeekItems = trackerItems.slice(Math.max(trackerItems.length - 7, 0))

  // Prepare data for chart
  const chartData: ChartDataType[] = lastWeekItems.map((item) => ({
    x: new Date(item.consumptionDate).getDay(),
    y: item.energyAmt,
  }))

  return (
    <ScrollView horizontal={true}>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={{ x: 10, y: 5 }}
        width={420} // Width of the chart
      >
        <VictoryAxis dependentAxis tickFormat={(tick) => `${tick}`} />
        <VictoryAxis
          tickFormat={(tick) => {
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            return days[tick]
          }}
        />
        <VictoryBar
          data={chartData}
          barWidth={30} // Width of each bar
          style={{ data: { fill: '#c43a31' } }} // Color of the bars
        />
      </VictoryChart>
    </ScrollView>
  )
}

export default EnergyChart
