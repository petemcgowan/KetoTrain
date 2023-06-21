import React, { useContext } from 'react'

import { StyleSheet, View, SafeAreaView } from 'react-native'

import DonutFactory from '../charting/DonutFactory'

import LineChartContainer from '../charting/LineChartContainer'

// for reference only, this is the old chart config
const chartConfigs = [
  {
    backgroundColor: 'black',
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#1b3fa0',
    alignItems: 'center',
    justifyContent: 'center',

    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForBackgroundLines: {
      strokeDasharray: '', // solid background lines with no dashes
      strokeLinecap: 'round',
    },
  },
]

interface KetoLimitScreenProps {
  totalCarbsForReals: number
}

const KetoLimitScreen = ({ totalCarbsForReals }: KetoLimitScreenProps) => {
  return (
    <View style={styles.ketoLimitContainer}>
      <SafeAreaView style={styles.root}>
        <DonutFactory />
        <LineChartContainer />
      </SafeAreaView>
    </View>
  )
}

export default KetoLimitScreen

const styles = StyleSheet.create({
  ketoLimitContainer: {
    marginTop: 40,
    backgroundColor: 'pink',
  },
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    color: '#FFF',
    fontFamily: 'Karla-Light',
  },
})
