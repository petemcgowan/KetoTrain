import * as React from 'react'

import { View, SafeAreaView, StyleSheet } from 'react-native'
import CarbDonut from './CarbDonut'

import { getTotalCarbs } from '../utils/GlycemicUtils'

export default function CarbCircleChart({ focused }) {
  let totalCarbsCapped = getTotalCarbs()
  let colorOfCarbChart = 'aqua'
  if (totalCarbsCapped > 50) {
    totalCarbsCapped = 50
    colorOfCarbChart = 'tomato'
  }
  console.log('totalCarbsCapped:' + totalCarbsCapped)

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
          percentage={totalCarbsCapped}
          percentage1={totalCarbsCapped}
          percentage2={totalCarbsCapped}
          color={colorOfCarbChart}
          max={50}
          max1={50}
          max2={50}
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
