import React, { useContext } from 'react'
import { LogBox } from 'react-native'

import { curveBasis, line, scaleLinear, scaleTime } from 'd3'
import { Dimensions, StyleSheet } from 'react-native'
import TrackerContext from '../state/TrackerContext'

import { parse, Path as RePath } from 'react-native-redash'
import { DataPoint } from '../utils/GlycemicUtils'

import Animated from 'react-native-reanimated'

import LineChart from './LineChart'
import { aggregateCarbAmtByDay } from './ChartUtils'

const { width } = Dimensions.get('screen')

const CARD_WIDTH = width - 20
const GRAPH_WIDTH = CARD_WIDTH - 60
const CARD_HEIGHT = 325
const GRAPH_HEIGHT = 200
const bottomPadding = 30
const leftPadding = 3 // position Y axis labels
const topPadding = 40
const rightPadding = 20

// this is a internal d3 library issue, so can be ignored
LogBox.ignoreLogs(['Require cycle:'])

export type GraphData = {
  max: number
  min: number
  curve: RePath
  mostRecent: number
}

const makeGraph = (data: DataPoint[]) => {
  const max = Math.max(...data.map((val) => val.carbAmt))
  const min = Math.min(...data.map((val) => val.carbAmt))
  const y = scaleLinear().domain([0, max]).range([GRAPH_HEIGHT, 35])

  // Find min + max date in the data
  const minDate = new Date(data[0].date)
  const maxDate = new Date(data[data.length - 1].date)

  const x = scaleTime()
    .domain([minDate, maxDate])
    .range([leftPadding + 30, GRAPH_WIDTH - rightPadding - 30])

  const curvedLine = line<DataPoint>()
    .x((d) => x(new Date(d.date)))
    .y((d) => y(d.carbAmt))
    .curve(curveBasis)(data)

  return {
    max,
    min,
    curve: parse(curvedLine!),
    mostRecent: data[data.length - 1].carbAmt,
  }
}

const LineChartContainer = () => {
  const { trackerItems } = useContext(TrackerContext)

  const processedData = aggregateCarbAmtByDay(trackerItems)
  // Sort processedData by date in ascending order
  processedData.sort((a, b) => a.date.localeCompare(b.date))
  console.log('processedData:' + JSON.stringify(processedData))

  const graphData = [makeGraph(processedData)]

  return (
    <Animated.View style={styles.graphCard}>
      <LineChart
        height={GRAPH_HEIGHT + 50}
        width={GRAPH_WIDTH + 50}
        graphData={graphData}
        leftPadding={leftPadding}
        bottomPadding={bottomPadding}
        topPadding={topPadding}
        rightPadding={rightPadding}
        processedData={processedData}
      />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },
  graphCard: {
    elevation: 5,
    borderRadius: 20,
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
})

export default LineChartContainer
