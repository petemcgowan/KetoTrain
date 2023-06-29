import * as React from 'react'
import { useEffect, useContext } from 'react'
import { View, SafeAreaView, StyleSheet } from 'react-native'
import CarbDonut from './CarbDonut'
import TrackerContext from '../state/TrackerContext'

// import { getTotalCarbs } from '../utils/GlycemicUtils'
import { getTotalCarbsForSpecificDay } from '../utils/GlycemicUtils'

export default function CarbCircleChart({ focused }) {
  const { totalCarbs } = useContext(TrackerContext)

  // let totalCarbsCapped = getTotalCarbsForSpecificDay()
  let colorOfCarbChart = 'aqua'
  if (totalCarbs > 50) {
    colorOfCarbChart = 'tomato'
  }
  console.log('totalCarbs:' + totalCarbs)

  useEffect(() => {
    console.log('useEffect CarbCircleChart, totalCarbs' + totalCarbs)
  }, [totalCarbs])

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <CarbDonut
          key={1}
          percentage={totalCarbs}
          percentage1={totalCarbs}
          percentage2={totalCarbs}
          color={colorOfCarbChart}
          max={100}
          max1={100}
          max2={100}
          focused={focused}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
  },
  paragraph: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
