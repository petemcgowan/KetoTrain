import React, { useContext, useState, useEffect, useRef } from 'react'
import {
  StyleSheet,
  FlatList,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native'
import FontAwesome6 from '@react-native-vector-icons/fontawesome6'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { useNavigation } from '@react-navigation/native'
import BottomSheet from '@gorhom/bottom-sheet'

// State & contexts
import TrackerContext from '../state/TrackerContext'
import UserContext, { UserContextProps } from '../state/UserContext'
import { ThemeContext } from '../state/ThemeContext'
import { TrackerContextType } from '../types/TrackerContextType'
import { TrackerItemType } from '../types/TrackerItemType'
import { FoodDataType } from '../types/FoodDataType'

// components
import TrackerItem from '../components/TrackerItem'
import CarbCircleChart from '../charting/CarbCircleChart'
import NutrientBottomSheet from '../components/NutrientBottomSheet'
import FavFoodModal from './FavFoodModal'
import GradientBackground from '../components/GradientBackground'

// utils
import {
  saveConsumptionLogs,
  getTotalCarbsForSpecificDayGU,
} from '../components/GlycemicUtils'
import {
  normalizeDate,
  isSameDay,
  formatDateToYYYYMMDD,
} from '../utils/DateUtils'

const { width, height } = Dimensions.get('screen')

const KetoTrackerScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [itemsForSelectedDate, setItemsForSelectedDate] = useState<
    TrackerItemType[]
  >([])

  const { userId } = useContext<UserContextProps>(UserContext)
  const { trackerItems, totalCarbs, setTotalCarbs, setTrackerItems } =
    useContext<TrackerContextType>(TrackerContext)

  const [modalVisible, setModalVisible] = useState(false)
  const [trackerSelected, setTrackerSelected] = useState(0)
  const sheetRef = useRef<BottomSheet>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [focused, setFocused] = useState(false)

  const navigation = useNavigation()
  const context = useContext(ThemeContext)
  if (!context) throw new Error('No Theme Context')
  const { theme } = context
  const styles = getStyles(theme)

  // --- HANDLERS ---

  const handleSave = (selectedFoods: FoodDataType[]) => {
    const updatedItemsForSelectedDate = [...itemsForSelectedDate]
    const newTrackerItems: TrackerItemType[] = []
    const normalizedSelectedDate = normalizeDate(selectedDate)

    selectedFoods.forEach((food) => {
      // Check for existing item to increment count
      const existingItemIndex = updatedItemsForSelectedDate.findIndex(
        (item) =>
          item.foodFactsId === food.foodFactsId &&
          normalizeDate(new Date(item.consumptionDate)).getTime() ===
            normalizedSelectedDate.getTime()
      )

      if (existingItemIndex > -1) {
        updatedItemsForSelectedDate[existingItemIndex].portionCount++
      } else {
        const newItem = {
          id: Date.now().toString() + Math.random(), // Unique ID
          foodFactsId: food.foodFactsId,
          description: food.foodName,
          carbAmt: food.carbohydrates,
          fiberAmt: food.totalDietaryFibre,
          proteinAmt: food.protein,
          fatAmt: food.fatTotal,
          energyAmt: food.energy,
          sugarsAmt: food.totalSugars,
          sodiumAmt: food.sodium,
          carbBackgroundColor: theme.tableBackground,
          portionCount: 1,
          consumptionDate: normalizedSelectedDate,
          isFavourite: food.isFavourite,
        }
        newTrackerItems.push(newItem)
        updatedItemsForSelectedDate.push(newItem)
      }
    })

    const existingFoodFactsIds = itemsForSelectedDate.map(
      (item) => item.foodFactsId
    )
    const uniqueNewTrackerItems = newTrackerItems.filter(
      (item) => !existingFoodFactsIds.includes(item.foodFactsId)
    )

    // Update Context
    setTrackerItems((prevTrackerItems) => {
      const updatedTrackerItems = [
        ...prevTrackerItems,
        ...uniqueNewTrackerItems,
      ]
      // Calc totals immediately for responsiveness
      getTotalCarbsForSpecificDayGU(
        updatedTrackerItems,
        normalizedSelectedDate,
        setTotalCarbs
      )
      return updatedTrackerItems
    })

    setItemsForSelectedDate([...itemsForSelectedDate, ...uniqueNewTrackerItems])

    // Save to DB
    const addedItems = updatedItemsForSelectedDate.map((item) => ({
      foodFactsId: item.foodFactsId,
      consumptionDate: formatDateToYYYYMMDD(item.consumptionDate),
      userId: userId,
      defaultFl: false,
      portionCount: item.portionCount,
    }))

    const dayToUpdate = formatDateToYYYYMMDD(selectedDate)
    saveConsumptionLogs(addedItems, dayToUpdate, true, true)
  }

  const renderTrackerItem = ({
    item,
    index,
  }: {
    item: TrackerItemType
    index: number
  }) => {
    return (
      <TrackerItem
        item={item}
        index={index}
        setTrackerSelected={setTrackerSelected}
        trackerSelected={trackerSelected}
        clickNutrientPanel={clickNutrientPanel}
        carbBackgroundColor={item.carbBackgroundColor}
        itemsForSelectedDate={itemsForSelectedDate}
        setItemsForSelectedDate={setItemsForSelectedDate}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    )
  }

  // --- NAVIGATION & DATE LOGIC ---

  const handlePrevDayTrack = () => {
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate)
      newDate.setDate(prevDate.getDate() - 1)
      return normalizeDate(newDate)
    })
  }

  const handleNextDayTrack = () => {
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate)
      newDate.setDate(prevDate.getDate() + 1)
      return normalizeDate(newDate)
    })
  }

  const clickNutrientPanel = (item: TrackerItemType, index: number) => {
    if (index > -1) {
      setTrackerSelected(index)
    }
    if (isSheetOpen) {
      sheetRef.current?.close()
    } else {
      sheetRef.current?.expand()
    }
    setIsSheetOpen(!isSheetOpen)
  }

  // --- EFFECTS ---

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () =>
      setFocused(true)
    )
    const unsubscribeBlur = navigation.addListener('blur', () =>
      setFocused(false)
    )

    // DATE CHANGED: Recalculate everything here safely
    const normalizedSelectedDate = normalizeDate(selectedDate)

    // 1. Filter List
    setItemsForSelectedDate(
      trackerItems.filter((item) => {
        const itemDate = normalizeDate(new Date(item.consumptionDate))
        return isSameDay(itemDate, normalizedSelectedDate)
      })
    )

    // 2. Update Totals (Fixes the crash)
    getTotalCarbsForSpecificDayGU(
      trackerItems,
      normalizedSelectedDate,
      setTotalCarbs
    )

    return () => {
      unsubscribeFocus()
      unsubscribeBlur()
    }
  }, [navigation, trackerItems, selectedDate, setTotalCarbs])

  return (
    <GradientBackground>
      <View style={styles.trackerContainer}>
        {/* Main Content */}
        <View style={{ flex: 1 }}>
          {/* Date Header */}
          <View style={styles.dateHeader}>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={handlePrevDayTrack}
            >
              <FontAwesome6
                name="chevron-left"
                size={RFPercentage(3.2)}
                color={theme.buttonText}
                iconStyle="solid"
              />
            </TouchableOpacity>
            <View style={styles.dateDisplayContainer}>
              <Text style={styles.dateDisplayText}>
                {selectedDate.toUTCString().split(' ').slice(0, 4).join(' ')}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={handleNextDayTrack}
            >
              <FontAwesome6
                name="chevron-right"
                size={RFPercentage(3.2)}
                color={theme.buttonText}
                iconStyle="solid"
              />
            </TouchableOpacity>
          </View>

          {/* Modals */}
          <FavFoodModal
            isVisible={modalVisible}
            onClose={() => setModalVisible(false)}
            onSave={handleSave}
          />

          {/* Chart (Passes totalCarbs directly) */}
          <CarbCircleChart
            focused={focused}
            selectedDate={selectedDate}
            totalCarbs={totalCarbs}
          />

          {/* Add Button */}
          <View style={styles.addButtonContainer}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text style={styles.addButtonText}>Add Food</Text>
            </TouchableOpacity>
          </View>

          {/* List */}
          <FlatList
            data={itemsForSelectedDate}
            renderItem={renderTrackerItem}
            keyExtractor={(item) => item.description + item.id} // Ensure uniqueness
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        </View>

        {/* Bottom Sheet (Sibling, not nested) */}
        <NutrientBottomSheet
          sheetRef={sheetRef}
          clickNutrientPanel={clickNutrientPanel}
          trackerSelected={trackerSelected}
          itemsForSelectedDate={itemsForSelectedDate}
        />
      </View>
    </GradientBackground>
  )
}

export default KetoTrackerScreen

const getStyles = (theme: any) =>
  StyleSheet.create({
    trackerContainer: {
      flex: 1,
    },
    dateHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 5,
      marginBottom: 10,
    },
    dateButton: {
      backgroundColor: theme.buttonBackground,
      paddingVertical: 10,
      paddingHorizontal: 18,
      borderRadius: 20,
    },
    dateDisplayContainer: {
      flex: 1,
      alignItems: 'center',
    },
    dateDisplayText: {
      color: theme.buttonText,
      fontSize: RFPercentage(3.3),
    },
    addButtonContainer: {
      width: width,
      height: height * 0.05,
      backgroundColor: theme.buttonBackground,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 35,
      marginVertical: 10,
    },
    addButtonText: {
      color: 'white',
      fontSize: RFPercentage(3.1),
    },
  })
