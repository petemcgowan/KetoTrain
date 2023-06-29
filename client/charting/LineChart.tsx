import React, { FC } from 'react'
import { StyleSheet, SafeAreaView, View, Text } from 'react-native'
// import Animated, {
//   useAnimatedProps,
//   useDerivedValue,
//   useSharedValue,
//   withTiming,
// } from 'react-native-reanimated'
import { G, Line, Path, Rect, Svg, Text as SvgText } from 'react-native-svg'
// import { mixPath, ReText } from 'react-native-redash'

import { GraphData } from './LineChartContainer'
// import ButtonSection from './ButtonSection'
import { serialize } from 'react-native-redash'
import { DataPoint } from './Data'
import { scaleLinear } from 'd3'

const GRAPH_WIDTH = 300
const GRAPH_HEIGHT = 200
const MARGIN = 40

type LineChartProps = {
  height: number
  width: number
  graphData: GraphData[]
  leftPadding: number
  bottomPadding: number
  topPadding: number
  rightPadding: number
  processedData: DataPoint[]
}

const getLast7Dates = () => {
  const result = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    result.push(d)
  }
  return result
}

// const AnimatedPath = Animated.createAnimatedComponent(Path)

const LineChart: FC<LineChartProps> = ({
  height,
  width,
  graphData,
  leftPadding,
  bottomPadding,
  topPadding,
  rightPadding,
  processedData,
}) => {
  // const selectedGraph = useSharedValue(data[0])
  // const previousGraph = useSharedValue({ ...data[0] })
  // const transition = useSharedValue(1)

  const getBarColor = (value) => {
    // // Analogous colors
    // if (value < 25) return 'hsl(180, 80%, 80%)' // Light Teal
    // if (value < 50) return 'hsl(160, 80%, 80%)' // Light Green
    // if (value < 75) return 'hsl(140, 80%, 80%)' // Light Lime
    // if (value < 100) return 'hsl(120, 80%, 80%)' // Light Chartreuse
    // if (value < 150) return 'hsl(100, 80%, 80%)' // Light Yellow
    // if (value < 200) return 'hsl(80, 80%, 80%)' // Light Gold
    // return 'hsl(60, 60%, 80%)' // Light Orange

    // Complementary colors
    // if (value < 25) return 'hsl(240, 80%, 80%)' // Light Blue
    // if (value < 50) return 'hsl(220, 80%, 80%)' // Light Azure
    // if (value < 75) return 'hsl(200, 80%, 80%)' // Light Sky Blue
    // if (value < 100) return 'hsl(180, 80%, 80%)' // Light Teal
    // if (value < 150) return 'hsl(80, 80%, 80%)' // Light Lime
    // if (value < 200) return 'hsl(70, 80%, 80%)' // Light Chartreuse
    // return 'hsl(60, 60%, 80%)' // Light Yellow

    // Triadic colors
    if (value < 25) return 'hsl(240, 80%, 80%)' // Light Blue
    if (value < 50) return 'hsl(200, 80%, 80%)' // Light Sky Blue
    if (value < 75) return 'hsl(160, 80%, 80%)' // Light Sea Green
    if (value < 100) return 'hsl(120, 80%, 80%)' // Light Green
    if (value < 125) return 'hsl(60, 80%, 80%)' // Light Yellow
    if (value < 150) return 'hsl(20, 80%, 80%)' // Light Orange
    return 'hsl(0, 60%, 80%)' // Light Red
  }

  if (!graphData || graphData.length === 0) {
    console.log('data does not contain anything, returning...')
    return null
  }
  // const { curve, max, min } = graphData
  console.log('data[0].curve:' + JSON.stringify(graphData[0].curve))
  // const staticGraphPath = data[0].curve
  // const svgPath = data[0].curve

  // Serialize the SVG path object
  const svgPath = serialize(graphData[0].curve)
  console.log('svgPath:' + svgPath)
  console.log('processedData:' + JSON.stringify(processedData))
  // const animatedProps = useAnimatedProps(() => {
  //   return {
  //     d: mixPath(
  //       transition.value,
  //       previousGraph.value.curve,
  //       selectedGraph.value.curve
  //     ),
  //   }
  // })
  const yAxisValues = [0, 50, 100, 150, 200]
  const maxYValue = Math.max(...processedData.map((d) => d.carbAmt))
  const yScale = scaleLinear()
    .domain([0, maxYValue])
    .range([height - bottomPadding, topPadding]) // Notice the range values have been swapped

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>CARB CONSUMPTION</Text>
      </View>
      <View style={styles.chartContainer}>
        <Svg width={width} height={height} stroke="#6231ff">
          <G y={-bottomPadding}>
            {/* Render bars */}
            {processedData.map((dataPoint, index) => {
              const barWidth =
                (width - (leftPadding + rightPadding + 60)) /
                processedData.length

              const barHeight = yScale(0) - yScale(dataPoint.carbAmt) // Calculate bar height based on scale
              const xPosition =
                leftPadding +
                30 +
                ((width - (leftPadding + rightPadding + 60)) /
                  (processedData.length - 1)) *
                  index

              // Calculate yPosition based on the height of SVG area
              const yPosition = yScale(dataPoint.carbAmt)

              const color = getBarColor(dataPoint.carbAmt)

              return (
                <Rect
                  key={index}
                  x={xPosition}
                  y={yPosition}
                  width={barWidth}
                  height={barHeight}
                  fill={color}
                />
              )
            })}
            {/* Add Y axis labels */}
            {yAxisValues.map((value, index) => {
              const x = leftPadding + 18 // Adjust this to move the labels further left
              const y = yScale(value) // Use the yScale for positioning y-axis labels
              console.log('x:' + x + ', y:' + y)
              return (
                <SvgText
                  key={index}
                  x={x}
                  y={y}
                  fontSize={12}
                  fill="#ffffff"
                  stroke="#ffffff"
                  textAnchor="end"
                >
                  {value}
                </SvgText>
              )
            })}
            {/* Add X axis labels */}
            {getLast7Dates().map((date, index) => {
              const x =
                leftPadding +
                50 +
                ((width - (leftPadding + rightPadding + 60)) /
                  (getLast7Dates().length - 1)) *
                  index
              const y = height - bottomPadding + 20 // Lower position to avoid overlap
              console.log('X-axis: x:' + x + ', y:' + y)
              return (
                <SvgText
                  key={index} // make sure to add unique key
                  x={x}
                  y={y}
                  fontSize={12}
                  stroke={'#d7d7d7'}
                  // fill="#ffffff" // change color as needed
                  textAnchor="middle"
                >
                  {date.toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                  })}
                </SvgText>
              )
            })}

            {/* Horizontal background lines */}
            {[0.2, 0.4, 0.6, 0.8].map((fraction, index) => (
              <Line
                key={index}
                x1={leftPadding + 20} // Start a bit further right
                y1={
                  fraction * (height - topPadding - bottomPadding) + topPadding
                }
                x2={width - rightPadding} // End a bit before the right edge
                y2={
                  fraction * (height - topPadding - bottomPadding) + topPadding
                }
                stroke="#d7d7d7"
                strokeWidth="1"
              />
            ))}
          </G>
        </Svg>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginVertical: 6,
    // marginHorizontal: 30,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'white',
  },
  // priceText: {
  //   fontSize: 20,
  //   marginTop: 10,
  //   fontWeight: 'bold',
  //   color: 'white',
  // },
})

export default LineChart
