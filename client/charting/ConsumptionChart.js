import React, { useContext } from 'react'
import { VictoryPie } from 'victory-native'
import { ThemeContext } from '../state/ThemeContext'
import { TrackerItemType } from '../types/TrackerItemType'
import { StyleSheet, View } from 'react-native'

type Props = {
  trackerItems: TrackerItemType[],
}

const MacroPieChart: React.FC<Props> = ({ trackerItems }) => {
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

  const pieData = [
    { x: 'Protein', y: totals.protein },
    { x: 'Carbs', y: totals.carb },
    { x: 'Fats', y: totals.fat },
  ]

  return (
    <View>
      <VictoryPie
        data={pieData}
        colorScale={['#E38627', '#C13C37', '#6A2135']}
        labelRadius={60}
        style={{ labels: { fill: 'white', fontSize: 12, fontWeight: 'bold' } }}
        animate={{ duration: 500 }}
      />
      <View style={styles.whiteSeparator} />
    </View>
  )
}

export default MacroPieChart

const getStyles = (theme) =>
  StyleSheet.create({
    whiteSeparator: {
      height: 2,
      backgroundColor: 'white',
      marginVertical: 20,
      width: '90%',
      alignSelf: 'center',
    },
  })
