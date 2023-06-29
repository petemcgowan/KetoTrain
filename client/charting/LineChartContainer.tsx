import React, { useContext } from 'react'
import { LogBox } from 'react-native'

import { curveBasis, line, scaleLinear, scaleTime } from 'd3'
import { Dimensions, StyleSheet } from 'react-native'
import TrackerContext from '../state/TrackerContext'

import { parse, Path as RePath } from 'react-native-redash'

import Animated from 'react-native-reanimated'
import { day1Data, day2Data, day3Data, day4Data, DataPoint } from './Data'
import LineChart from './LineChart'
import TrackerItem from '../components/TrackerItem'
import { TrackerItemType } from '../types/TrackerItemType'

const { width } = Dimensions.get('screen')

const CARD_WIDTH = width - 20
const GRAPH_WIDTH = CARD_WIDTH - 60
const CARD_HEIGHT = 325
const GRAPH_HEIGHT = 200
const bottomPadding = 30
const leftPadding = 3 // Use this to position the Y axis labels
const topPadding = 40 // Increase this value
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

  // Finding the minimum and maximum date in the data
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
    curve: parse(curvedLine!), // Use parse from 'react-native-redash'
    mostRecent: data[data.length - 1].carbAmt,
  }
}
// const makeGraph = (data: DataPoint[]) => {
//   const max = Math.max(...data.map((val) => val.carbAmt))
//   const min = Math.min(...data.map((val) => val.carbAmt))
//   const y = scaleLinear().domain([0, max]).range([GRAPH_HEIGHT, 35])

//   const x = scaleTime()
//     .domain([new Date(2000, 1, 1), new Date(2000, 1, 15)])
//     .range([10, GRAPH_WIDTH - 10])

//   const curvedLine = line<DataPoint>()
//     .x((d) => x(new Date(d.date)))
//     .y((d) => y(d.carbAmt))
//     .curve(curveBasis)(data)

//   return {
//     max,
//     min,
//     curve: curvedLine, // Directly storing the curvedLine without parsing
//     mostRecent: data[data.length - 1].carbAmt,
//   }
// }

// let graphData: GraphData[] = []

const LineChartContainer = () => {
  const { trackerItems } = useContext(TrackerContext)

  const aggregateCarbAmtByDay = (
    trackerItems: TrackerItemType[]
  ): DataPoint[] => {
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Set to midnight

    // Create a Map to store the sum of carbAmt by date.
    const carbSumByDay = new Map<string, number>()

    // Initialize the map with the last 7 days (including today), set initial values to 0
    for (let i = 0; i < 7; i++) {
      const day = new Date(today.getTime() - i * 24 * 60 * 60 * 1000)
      const dateString = day.toISOString().split('T')[0] // Format as YYYY-MM-DD
      carbSumByDay.set(dateString, 0)
    }

    // Iterate over the trackerItems array.
    trackerItems.forEach((item) => {
      const consumptionDate = new Date(item.consumptionDate)
      const dateString = consumptionDate.toISOString().split('T')[0] // Format as YYYY-MM-DD

      // Sum the carbAmt for each day.
      if (carbSumByDay.has(dateString)) {
        carbSumByDay.set(
          dateString,
          carbSumByDay.get(dateString)! + item.carbAmt
        )
      }
    })

    // Convert the Map into an array of data points.
    const dataPoints: DataPoint[] = Array.from(carbSumByDay).map(
      ([date, carbAmt]) => ({
        date,
        carbAmt,
      })
    )

    return dataPoints
  }

  const processedData = aggregateCarbAmtByDay(trackerItems)
  // Sort the processedData array by date in ascending order
  processedData.sort((a, b) => a.date.localeCompare(b.date))
  console.log('processedData:' + JSON.stringify(processedData))
  // graphData = [makeGraph(day2Data), makeGraph(day3Data), makeGraph(day4Data)]

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
