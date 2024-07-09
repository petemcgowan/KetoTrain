import React, { useContext } from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native'
import { ThemeContext } from '../state/ThemeContext'
import EnergyChart from '../charting/EnergyChart'
import TrackerContext from '../state/TrackerContext'
import MacroPieChart from '../charting/MacroPieChart.tsx'
import MacroAreaChart from '../charting/MacroAreaChart'
import { RFPercentage } from 'react-native-responsive-fontsize'

const { width, height } = Dimensions.get('screen')

const ChartsScreen = () => {
  const { trackerItems } = useContext(TrackerContext)
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useContext was used outside of the theme provider')
  }
  const { theme } = context
  const styles = getStyles(theme)

  const today = new Date()
  const oneWeekAgo = new Date(today)
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

  const filteredItems = trackerItems.filter(
    (item) => new Date(item.consumptionDate) >= oneWeekAgo
  )

  const totals = filteredItems.reduce(
    (acc, item) => {
      acc.protein += item.proteinAmt * item.portionCount
      acc.carb += item.carbAmt * item.portionCount
      acc.fat += item.fatAmt * item.portionCount
      return acc
    },
    {
      protein: 0,
      carb: 0,
      fat: 0,
    }
  )
  console.log(`totals ${JSON.stringify(totals)}`)

  return (
    <ScrollView style={styles.tabContainer}>
      <SafeAreaView style={styles.chartContainer}>
        <View style={styles.ketoLimitContainer}>
          {totals.carb === 0 && totals.fat === 0 && totals.protein === 0 && (
            <View style={styles.noDataBox}>
              <Text style={styles.noDataText}>
                There is no chart data for the last week
              </Text>
              <Text style={styles.noDataText}>
                Add some data on the Track screen!
              </Text>
            </View>
          )}
          {(totals.carb > 0 || totals.fat > 0 || totals.protein > 0) && (
            <View>
              <Text style={styles.chartTitle}>
                Nutrient consumption breakdown (last week)
              </Text>
              <MacroPieChart trackerItems={trackerItems} />
            </View>
          )}

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
    noDataBox: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      width: width * 0.7,
      height: height * 0.3,
      backgroundColor: theme.viewBackground,
    },
    noDataText: {
      color: theme.buttonText,
      textAlign: 'center',
      fontSize: RFPercentage(2.8),
    },
  })
