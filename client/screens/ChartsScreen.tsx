import React, { useContext } from 'react'
import { StyleSheet, View, SafeAreaView, Text, ScrollView } from 'react-native'
import { ThemeContext } from '../state/ThemeContext'
import EnergyChart from '../charting/EnergyChart'
import TrackerContext from '../state/TrackerContext'
import MacroPieChart from '../charting/ConsumptionChart'
import MacroAreaChart from '../charting/MacroAreaChart'

const ChartsScreen = () => {
  const { trackerItems } = useContext(TrackerContext)
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useContext was used outside of the theme provider')
  }
  const { theme } = context
  const styles = getStyles(theme)

  return (
    <ScrollView style={styles.tabContainer}>
      <SafeAreaView style={styles.chartContainer}>
        <View style={styles.ketoLimitContainer}>
          <Text style={styles.chartTitle}>
            Nutrient consumption breakdown (last week)
          </Text>
          <MacroPieChart trackerItems={trackerItems} />
          <Text style={styles.chartTitle}>Calories consumed by day</Text>
          <EnergyChart trackerItems={trackerItems} />
          <Text style={styles.chartTitle}>Nutrient breakdown by day</Text>
          <MacroAreaChart trackerItems={trackerItems} />
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
      color: theme.buttonText,
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
    whiteSeparator: {
      height: 160,
      backgroundColor: 'white',
      marginVertical: 20,
      width: '90%',
      alignSelf: 'center',
    },
  })
