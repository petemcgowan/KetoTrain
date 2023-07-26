import React, { useContext } from 'react'
import { StyleSheet, View, SafeAreaView, Text, Dimensions } from 'react-native'
import DonutFactory from '../charting/DonutFactory'
import LineChartContainer from '../charting/LineChartContainer'
import { ThemeContext } from '../state/ThemeContext'

const { width, height } = Dimensions.get('window')

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

const KetoLimitScreen = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useContext was used outside of the theme provider')
  }
  const { theme } = context
  const styles = getStyles(theme)
  // /*style={{ backgroundColor: 'green', width: width, height: height }}*/

  return (
    <View style={styles.tabContainer}>
      <SafeAreaView style={styles.chartContainer}>
        <View style={styles.ketoLimitContainer}>
          {/* <DonutFactory /> */}
          <LineChartContainer />
        </View>
      </SafeAreaView>
    </View>
  )
}

export default KetoLimitScreen

const getStyles = (theme) =>
  StyleSheet.create({
    tabContainer: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.viewBackground,
    },
    ketoLimitContainer: {
      marginTop: 40,
      backgroundColor: theme.viewBackground,
    },
    chartContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.viewBackground,
      color: theme.buttonText,
      fontFamily: 'Karla-Light',
    },
  })
