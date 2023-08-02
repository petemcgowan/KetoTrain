import React, { FC } from 'react'
import { StyleSheet, SafeAreaView, View, Text } from 'react-native'
import { G, Line, Rect, Svg, Text as SvgText } from 'react-native-svg'
import { getBarColor, getLast7Dates } from './ChartUtils'
import { GraphData } from './LineChartContainer'
import { DataPoint } from './Data'
import { scaleLinear } from 'd3'
import { RFPercentage } from 'react-native-responsive-fontsize'

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
  if (!graphData || graphData.length === 0) {
    console.log('data does not contain anything, returning...')
    return null
  }

  const maxYValue = Math.max(...processedData.map((d) => d.carbAmt))

  // Determine y-axis labels based on maxYValue
  let yAxisStep
  if (maxYValue <= 50) {
    yAxisStep = 10
  } else if (maxYValue <= 100) {
    yAxisStep = 20
  } else if (maxYValue <= 200) {
    yAxisStep = 40
  } else {
    yAxisStep = Math.ceil(maxYValue / 5)
  }

  const yAxisValues = []
  for (let i = 0; i <= maxYValue; i += yAxisStep) {
    yAxisValues.push(i)
  }

  const yScale = scaleLinear()
    .domain([0, maxYValue])
    .range([height - bottomPadding, topPadding])

  const last7Dates = getLast7Dates()

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

              return (
                <SvgText
                  key={index}
                  x={x}
                  y={y}
                  fontSize={RFPercentage(1.7)}
                  fill="#ffffff"
                  stroke="#ffffff"
                  textAnchor="end"
                >
                  {value}
                </SvgText>
              )
            })}
            {/* X axis labels */}
            {last7Dates.map((date, index) => {
              const x =
                leftPadding +
                50 +
                ((width - (leftPadding + rightPadding + 60)) /
                  (last7Dates.length - 1)) *
                  index
              const y = height - bottomPadding + 20 // lower position to avoid overlap

              return (
                <SvgText
                  key={index}
                  x={x}
                  y={y}
                  fontSize={RFPercentage(1.7)}
                  stroke={'#d7d7d7'}
                  fill={'#d7d7d7'}
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
                x1={leftPadding + 20}
                y1={
                  fraction * (height - topPadding - bottomPadding) + topPadding
                }
                x2={width - rightPadding}
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
    marginVertical: 6,
  },
  titleText: {
    fontSize: RFPercentage(2.6),
    fontWeight: 'bold',
    marginTop: 10,
    color: 'white',
  },
})

export default LineChart
