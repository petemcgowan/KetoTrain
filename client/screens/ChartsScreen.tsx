import React, { useContext } from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Dimensions,
  ScrollView,
} from 'react-native'
// import DonutFactory from '../charting/DonutFactory'
// import LineChartContainer from '../charting/LineChartContainer'
import { ThemeContext } from '../state/ThemeContext'
import EnergyChart from '../charting/EnergyChart'
import TrackerContext from '../state/TrackerContext'
import MacroPieChart from '../charting/ConsumptionChart'
import MacroAreaChart from '../charting/MacroAreaChart'

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

const ChartsScreen = () => {
  const context = useContext(ThemeContext)
  const { trackerItems } = useContext(TrackerContext)

  if (!context) {
    throw new Error('useContext was used outside of the theme provider')
  }
  const { theme } = context
  const styles = getStyles(theme)
  // /*style={{ backgroundColor: 'green', width: width, height: height }}*/

  return (
    <ScrollView style={styles.tabContainer}>
      <SafeAreaView style={styles.chartContainer}>
        <View style={styles.ketoLimitContainer}>
          {/* <DonutFactory /> */}
          <Text style={styles.chartTitle}>
            Nutrient consumption breakdown (last week)
          </Text>
          <MacroPieChart trackerItems={trackerItems} />
          <Text style={styles.chartTitle}>Calories consumed by day</Text>
          <EnergyChart trackerItems={trackerItems} />
          <Text style={styles.chartTitle}>Nutrient breakdown by day</Text>
          <MacroAreaChart trackerItems={trackerItems} />
          {/* <LineChartContainer /> */}
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

export default ChartsScreen

const getStyles = (theme) =>
  StyleSheet.create({
    tabContainer: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.viewBackground,
    },
    chartTitle: {
      fontSize: 18,
      // fontWeight: 'bold',
      color: theme.buttonText,
      // marginBottom: 10,
      textAlign: 'center',
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
