import * as React from 'react'
import { useEffect, useContext } from 'react'
import { View, SafeAreaView, StyleSheet } from 'react-native'
import CarbDonut from './CarbDonut'
import TrackerContext from '../state/TrackerContext'
import { ThemeContext } from '../state/ThemeContext'

export default function CarbCircleChart({ focused }) {
  const { totalCarbs } = useContext(TrackerContext)
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useContext was used outside of the theme provider')
  }
  const { theme } = context
  const styles = getStyles(theme)

  let colorOfCarbChart = theme.middlingBackground
  if (totalCarbs > 50) {
    colorOfCarbChart = theme.badBackground
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
          color={colorOfCarbChart}
          max={100}
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
