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

const { height } = Dimensions.get('screen')

export default function NutrientBottomSheet({
  sheetRef,
  clickNutrientPanel,
  trackerSelected,
}) {
  const {
    itemsForSelectedDate,
    // itemsForSelectedDate,
  } = useContext(TrackerContext)
  console.log('NutrientBottomSheet, trackerSelected:' + trackerSelected)
  const currentItem: TrackerItem = itemsForSelectedDate[trackerSelected]
  console.log('NutrientBottomSheet, currentItem:' + currentItem)

  useEffect(() => {
    console.log('NutrientBottomSheet, useEffect')
  }, [])

  const renderContent = () => {
    return (
      <View style={styles.panel}>
        {currentItem && (
          <View style={styles.panelHeader}>
            <Text style={styles.panelTitle}>Nutritional Information</Text>
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
          <View style={styles.panelFooter}>
            {/* <TouchableOpacity
            style={styles.button}
            onPress={() => sheetRef.current.snapTo(1)}
          >
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.button}
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
      // snapPoints={[0, '40%']}
      snapPoints={[0, height * 0.5]}
      borderRadius={10}
      renderContent={renderContent}
    />
  )
}

const styles = StyleSheet.create({
  panel: {
    // backgroundColor: 'green', //temp
    backgroundColor: 'rgb(32, 32, 32)',
    height: height * 0.5,
    padding: 20,
  },
  panelHeader: {
    // backgroundColor: 'yellow', //temp

    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  panelTitle: {
    fontSize: 20,
    color: 'rgb(2, 158, 147)',
    textAlign: 'center',
  },
  panelContent: {
    // backgroundColor: 'red', //temp
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  panelFooter: {
    // backgroundColor: 'pink', //temp
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    // backgroundColor: 'blue', //temp
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgb(27, 46, 46)',
    backgroundColor: 'rgb(34, 34, 34)',
    padding: 10,
    marginHorizontal: 10,

    // Shadow properties for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    // Elevation for Android
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    textTransform: 'uppercase',
  },
})
