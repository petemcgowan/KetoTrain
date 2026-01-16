import React, { useMemo, useContext } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import NutritionItem from '../components/NutritionItem'
import { TrackerItemType } from '../types/TrackerItemType'
import { ThemeContext } from '../state/ThemeContext'
import { RFPercentage } from 'react-native-responsive-fontsize'

const { width, height } = Dimensions.get('window')

interface NutrientBottomSheetProps {
  sheetRef: React.RefObject<BottomSheet>
  trackerSelected: number
  itemsForSelectedDate: TrackerItemType | null[]
  clickNutrientPanel: (item?: any, index?: number) => void
}

export default function NutrientBottomSheet({
  sheetRef,
  trackerSelected,
  itemsForSelectedDate,
  clickNutrientPanel,
}: NutrientBottomSheetProps) {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('No Theme Context')
  const { theme } = context
  const styles = getStyles(theme)

  const snapPoints = useMemo(() => ['60%'], [])

  const currentItem =
    itemsForSelectedDate && itemsForSelectedDate[trackerSelected]
      ? itemsForSelectedDate[trackerSelected]
      : null

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backgroundStyle={styles.sheetBackground}
      handleIndicatorStyle={{
        backgroundColor: theme.buttonText,
        opacity: 0.3,
        width: width * 0.1,
      }}
    >
      <BottomSheetScrollView contentContainerStyle={styles.scrollContent}>
        {currentItem ? (
          <View>
            <View style={styles.headerContainer}>
              <Text style={styles.headerLabel}>NUTRITION FACTS</Text>
              <Text style={styles.headerTitle} numberOfLines={1}>
                {currentItem.description}
              </Text>
            </View>

            <View style={styles.gridContainer}>
              <NutritionItem
                icon={'bread-slice'}
                name="Carbs"
                value={currentItem.carbAmt}
              />
              <NutritionItem
                icon={'bolt'}
                name="Energy"
                value={currentItem.energyAmt}
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
                icon={'seedling'}
                name="Fiber"
                value={currentItem.fiberAmt}
              />
              <NutritionItem
                icon={'candy-cane'}
                name="Sugars"
                value={currentItem.sugarsAmt}
              />
              <NutritionItem icon={'scale-balanced'} name="G. Load" value="4" />
              <NutritionItem
                icon={'trash-can'}
                name="Sodium"
                value={currentItem.sodiumAmt}
              />
            </View>

            <View style={styles.footerContainer}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => clickNutrientPanel(null, -1)}
              >
                <Text style={styles.buttonText}>Dismiss</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.placeholderContainer}>
            <Text style={styles.headerTitle}>Select an Item</Text>
          </View>
        )}
      </BottomSheetScrollView>
    </BottomSheet>
  )
}

const getStyles = (theme: any) =>
  StyleSheet.create({
    sheetBackground: {
      backgroundColor: theme.tableBackground,
      borderTopLeftRadius: width * 0.08,
      borderTopRightRadius: width * 0.08,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.05)',
    },
    scrollContent: {
      paddingHorizontal: width * 0.05,
      paddingBottom: height * 0.05,
    },
    headerContainer: {
      alignItems: 'center',
      marginBottom: height * 0.025,
      marginTop: height * 0.015,
    },
    headerLabel: {
      color: theme.buttonText,
      opacity: 0.5,
      fontSize: RFPercentage(1.4),
      fontWeight: 'bold',
      letterSpacing: 1,
      marginBottom: height * 0.005,
    },
    headerTitle: {
      color: theme.buttonText,
      fontSize: RFPercentage(2.8),
      fontWeight: 'bold',
      textAlign: 'center',
    },
    gridContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    footerContainer: {
      marginTop: height * 0.03,
      alignItems: 'center',
    },
    closeButton: {
      backgroundColor: theme.buttonBackground,
      paddingVertical: height * 0.015,
      paddingHorizontal: width * 0.12,
      borderRadius: 30,
      elevation: 6,
    },
    buttonText: {
      fontSize: RFPercentage(2.0),
      color: 'white',
      fontWeight: 'bold',
      letterSpacing: 1,
      textTransform: 'uppercase',
    },
    placeholderContainer: {
      height: height * 0.3,
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
