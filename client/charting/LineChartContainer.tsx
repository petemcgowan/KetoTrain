import React, { useContext } from 'react'
import { LogBox } from 'react-native'

import { curveBasis, line, scaleLinear, scaleTime } from 'd3'
import { Dimensions, StyleSheet } from 'react-native'
import TrackerContext from '../state/TrackerContext'

import { parse, Path as RePath } from 'react-native-redash'

import Animated from 'react-native-reanimated'
import { day1Data, day2Data, day3Data, day4Data, DataPoint } from './Data'
import LineChart from './LineChart'

const { width } = Dimensions.get('screen')

const CARD_WIDTH = width - 20
const GRAPH_WIDTH = CARD_WIDTH - 60
const CARD_HEIGHT = 325
const GRAPH_HEIGHT = 200

export type GraphData = {
  max: number
  min: number
  curve: RePath
  mostRecent: number
}

// this is a internal d3 library issue, so can be ignored
LogBox.ignoreLogs(['Require cycle:'])

const makeGraph = (data: DataPoint[]) => {
  const max = Math.max(...data.map((val) => val.carbAmt))
  const min = Math.min(...data.map((val) => val.carbAmt))
  const y = scaleLinear().domain([0, max]).range([GRAPH_HEIGHT, 35])

  const x = scaleTime()
    .domain([new Date(2000, 1, 1), new Date(2000, 1, 15)])
    .range([10, GRAPH_WIDTH - 10])

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

// const makeGraphKetoInfo = (data: DataPoint[], trackerItems: any) => {

//   data.forEach((element: DataPoint, index: number, array: any) => {

//     //replacing dummy value with real value
//     const trackerObj = trackerItems[index]
//     if (trackerObj !== undefined && index < trackerItems.length) {
//       element.carbAmt = trackerObj.carbAmt
//       array[index] = element
//     } else {
//       //zero it out
//       element.carbAmt = 0
//       array[index] = element
//     }
//   })

//   return makeGraph(data)
// }

let graphData: GraphData[] = []

const LineChartContainer = () => {
  const { trackerItems } = useContext(TrackerContext)

  graphData = [
    // makeGraphKetoInfo(day1Data, trackerItems),
    // makeGraph(originalData),
    makeGraph(day2Data),
    makeGraph(day3Data),
    makeGraph(day4Data),
    // makeGraphKetoInfo(day1Data, trackerItems),
  ]

  return (
    <Animated.View style={styles.graphCard}>
      <LineChart
        height={GRAPH_HEIGHT + 50}
        width={GRAPH_WIDTH + 50}
        data={graphData}
        bottomPadding={10}
        leftPadding={0}
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
