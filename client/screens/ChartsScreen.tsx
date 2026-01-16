import React, { useContext } from 'react'
import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native'
import { ThemeContext } from '../state/ThemeContext'
import { RFPercentage } from 'react-native-responsive-fontsize'
import FontAwesome6 from '@react-native-vector-icons/fontawesome6'

import EnergyChart from '../charting/EnergyChart'
import MacroPieChart from '../charting/MacroPieChart'
import MacroAreaChart from '../charting/MacroAreaChart'
import TrackerContext from '../state/TrackerContext'
import GradientBackground from '../components/GradientBackground'
import NutritionItem from '../components/NutritionItem'

const { width, height } = Dimensions.get('window')

const ChartsScreen = () => {
  const { trackerItems } = useContext(TrackerContext)
  const { theme } = useContext(ThemeContext)!
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
    { protein: 0, carb: 0, fat: 0 }
  )

  const hasData = totals.carb > 0 || totals.fat > 0 || totals.protein > 0

  return (
    <GradientBackground>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <FontAwesome6
            name="chart-pie"
            size={RFPercentage(3)}
            color={theme.buttonText}
            iconStyle="solid"
          />
          <Text style={styles.screenTitle}>METABOLIC DATA</Text>
          <Text style={styles.screenSubtitle}>Last 7 Days Analysis</Text>
        </View>

        {!hasData ? (
          <View style={styles.noDataBox}>
            <FontAwesome6
              name="chart-simple"
              size={RFPercentage(5)}
              color="rgba(255,255,255,0.2)"
              iconStyle="solid"
            />
            <Text style={styles.noDataTitle}>No Data Yet</Text>
            <Text style={styles.noDataText}>
              Track some food to see your insights.
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionLabel}>WEEKLY TOTALS</Text>
            </View>
            <View style={styles.totalsGrid}>
              <NutritionItem
                icon="bread-slice"
                name="Total Carbs"
                value={`${Math.round(totals.carb)}g`}
              />
              <NutritionItem
                icon="bottle-droplet"
                name="Total Fat"
                value={`${Math.round(totals.fat)}g`}
              />
              <NutritionItem
                icon="drumstick-bite"
                name="Total Protein"
                value={`${Math.round(totals.protein)}g`}
              />
            </View>

            <View style={styles.glassCard}>
              <View style={styles.cardHeader}>
                <FontAwesome6
                  name="chart-pie"
                  size={14}
                  color={theme.buttonText}
                  iconStyle="solid"
                />
                <Text style={styles.cardTitle}>MACRO RATIOS</Text>
              </View>
              <MacroPieChart trackerItems={trackerItems} />
            </View>

            <View style={styles.glassCard}>
              <View style={styles.cardHeader}>
                <FontAwesome6
                  name="fire"
                  size={14}
                  color={theme.buttonText}
                  iconStyle="solid"
                />
                <Text style={styles.cardTitle}>CALORIC TREND</Text>
              </View>
              <EnergyChart trackerItems={trackerItems} />
            </View>

            <View style={styles.glassCard}>
              <View style={styles.cardHeader}>
                <FontAwesome6
                  name="layer-group"
                  size={14}
                  color={theme.buttonText}
                  iconStyle="solid"
                />
                <Text style={styles.cardTitle}>MACRO STACK</Text>
              </View>
              <MacroAreaChart trackerItems={trackerItems} />
            </View>
          </>
        )}
      </ScrollView>
    </GradientBackground>
  )
}

export default ChartsScreen

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: { flex: 1 },
    scrollContent: { paddingHorizontal: 20, paddingBottom: 50, paddingTop: 60 },
    headerContainer: { alignItems: 'center', marginBottom: 30 },
    screenTitle: {
      fontSize: RFPercentage(3),
      fontWeight: '900',
      color: theme.buttonText,
      marginTop: 10,
      letterSpacing: 1,
    },
    screenSubtitle: {
      fontSize: RFPercentage(1.8),
      color: theme.buttonText,
      opacity: 0.6,
      marginTop: 5,
    },
    sectionHeader: { marginBottom: 10, marginLeft: 5 },
    sectionLabel: {
      color: theme.buttonText,
      fontSize: 10,
      fontWeight: 'bold',
      opacity: 0.7,
      letterSpacing: 1.5,
    },
    totalsGrid: {
      // backgroundColor: 'rgba(255, 255, 255, 0.08)',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 12,
      marginBottom: 10,
    },
    glassCard: {
      // backgroundColor: 'rgba(255, 255, 255, 0.08)',
      borderRadius: 40,
      paddingVertical: 20,
      paddingHorizontal: 10,
      marginBottom: 25,
      borderWidth: 1,
      // borderColor: 'rgba(255, 255, 255, 0.08)',
      alignItems: 'center',
      elevation: 0,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',
      marginLeft: 15,
      marginBottom: 10,
    },
    cardTitle: {
      color: theme.buttonText,
      fontSize: 12,
      fontWeight: 'bold',
      letterSpacing: 1,
      marginLeft: 8,
      opacity: 0.8,
    },
    noDataBox: {
      height: height * 0.4,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.2)',
      borderRadius: 20,
    },
    noDataTitle: {
      color: theme.buttonText,
      fontSize: RFPercentage(2.5),
      fontWeight: 'bold',
      marginTop: 15,
    },
    noDataText: {
      color: theme.buttonText,
      opacity: 0.6,
      marginTop: 5,
      fontSize: RFPercentage(2),
    },
  })
