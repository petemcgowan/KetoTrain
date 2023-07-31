import React, { useContext, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native'

import BottomSheet from 'reanimated-bottom-sheet'
import NutritionItem from './NutritionItem'
import TrackerContext from '../state/TrackerContext'
import TrackerItem from '../components/TrackerItem'
import { ThemeContext } from '../state/ThemeContext'

const { width, height } = Dimensions.get('screen')

export default function NutrientBottomSheet({
  sheetRef,
  clickNutrientPanel,
  trackerSelected,
}) {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useContext was used outside of the theme provider')
  }
  const { theme } = context
  const styles = getStyles(theme)

  const {
    itemsForSelectedDate,
    // itemsForSelectedDate,
  } = useContext(TrackerContext)
  const currentItem: TrackerItem = itemsForSelectedDate[trackerSelected]

  useEffect(() => {
    console.log('NutrientBottomSheet, useEffect')
  }, [])

  const renderContent = () => {
    return (
      <View style={styles.panel}>
        {currentItem && (
          <View style={styles.panelHeader}>
            <Text style={styles.panelTitle}>Nutritional Information for</Text>
            <Text style={styles.panelTitle}>{currentItem.description}</Text>
          </View>
        )}
        {currentItem && (
          <View style={styles.panelContent}>
            <NutritionItem
              icon={'bread-slice'}
              name="Carbs"
              value={currentItem.carbAmt}
            />
            <NutritionItem
              icon={'balance-scale'}
              name="Glycemic Load"
              value="4"
            />
            <NutritionItem
              icon={'seedling'}
              name="Fiber"
              value={currentItem.fiberAmt}
            />
            <NutritionItem
              icon={'drumstick-bite'}
              name="Protein"
              value={currentItem.proteinAmt}
            />
            <NutritionItem
              icon={'oil-can'}
              name="Fat"
              value={currentItem.fatAmt}
            />
            <NutritionItem
              icon={'battery-full'}
              name="Energy (kcal)"
              value={currentItem.energyAmt}
            />
            <NutritionItem
              icon={'candy-cane'}
              name="Sugars"
              value={currentItem.sugarsAmt}
            />
            <NutritionItem
              icon={'trash-alt'}
              name="Sodium"
              value={currentItem.sodiumAmt}
            />
          </View>
        )}
        {currentItem && (
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={clickNutrientPanel}
            >
              <Text style={styles.buttonText}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    )
  }

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={[0, height * 0.5]}
      borderRadius={10}
      renderContent={renderContent}
    />
  )
}

const getStyles = (theme) =>
  StyleSheet.create({
    panel: {
      backgroundColor: theme.tableBackground,
      height: height * 0.5,
    },
    panelHeader: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    panelTitle: {
      fontSize: 22,
      color: theme.buttonText,
      textAlign: 'center',
    },
    panelContent: {
      flex: 1,
      flexDirection: 'column',
      // flexWrap: 'wrap',
      justifyContent: 'center',
      // justifyContent: 'space-between',
      alignItems: 'center',
    },
    closeButtonContainer: {
      width: width * 0.6,
      height: height * 0.05,
      // flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: theme.buttonBackground,
      // paddingBottom: 10,
      marginBottom: 10,
      // height: height * 0.05,
      // width: width * 0.8,
    },
    closeButton: {
      // width: width * 0.6,
      // height: height * 0.05,
      // alignSelf: 'center',
      // justifyContent: 'center',
      // paddingTop: 10,
      // paddingBottom: 20,
      // alignItems: 'center',

      // Shadow properties for iOS
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      // Elevation for Android
      elevation: 5,
    },
    buttonText: {
      alignSelf: 'center',
      justifyContent: 'center',
      fontSize: 18,
      color: theme.buttonText,
      textTransform: 'uppercase',
    },
  })
