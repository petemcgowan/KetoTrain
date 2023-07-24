import * as React from 'react'
import { View, SafeAreaView, StyleSheet } from 'react-native'
import Donut from './Donut'

import { getTotalCarbs } from '../utils/GlycemicUtils'

export default function DonutFactory() {
  let totalCarbsCapped = getTotalCarbs()
  let colorOfCarbChart = 'aqua'
  if (totalCarbsCapped > 50) {
    totalCarbsCapped = 50
    colorOfCarbChart = 'tomato'
  }

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
        <Donut
          key={1}
          percentage={totalCarbsCapped}
          percentage1={totalCarbsCapped}
          percentage2={totalCarbsCapped}
          color={colorOfCarbChart}
          max={50}
          max1={50}
          max2={50}
        />
        {/* <Donut
          key={2}
          percentage={totalGILoadCapped}
          percentage1={totalGILoadCapped}
          percentage2={totalGILoadCapped}
          color={colorOfGILoadChart}
          max={100}
          max1={100}
          max2={100}
        /> */}
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
