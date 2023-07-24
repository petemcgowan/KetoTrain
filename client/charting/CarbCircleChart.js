import * as React from 'react'
import { useEffect, useContext } from 'react'
import { View, SafeAreaView, StyleSheet } from 'react-native'
import CarbDonut from './CarbDonut'
import TrackerContext from '../state/TrackerContext'

export default function CarbCircleChart({ focused }) {
  const { totalCarbs } = useContext(TrackerContext)

  let colorOfCarbChart = 'aqua'
  if (totalCarbs > 50) {
    colorOfCarbChart = 'tomato'
  }

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
})
