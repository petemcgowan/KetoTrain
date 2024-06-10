import * as React from 'react'
import { useEffect, useContext } from 'react'
import { View, SafeAreaView, StyleSheet } from 'react-native'
import CarbDonut from './CarbDonut'
import TrackerContext from '../state/TrackerContext'
import { ThemeContext } from '../state/ThemeContext'
import { getTotalCarbsForSpecificDayGU } from '../components/GlycemicUtils'

export default function CarbCircleChart({ focused, selectedDate, totalCarbs }) {
  const { trackerItems, setTotalCarbs } = useContext(TrackerContext)
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useContext was used outside of the theme provider')
  }
  const { theme } = context
  const styles = getStyles(theme)

  let colorOfCarbChart = theme.goodText
  if (totalCarbs > 50) {
    colorOfCarbChart = theme.middlingText
  }
  if (totalCarbs > 100) {
    colorOfCarbChart = theme.badText
  }

  useEffect(() => {
    if (trackerItems && trackerItems.length > 0) {
      getTotalCarbsForSpecificDayGU(trackerItems, new Date(), setTotalCarbs)
    }
  }, [trackerItems])

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
          color={colorOfCarbChart}
          max={120}
          // max1={100}
          // max2={100}
          focused={focused}
        />
      </View>
    </SafeAreaView>
  )
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.viewBackground,
    },
  })
