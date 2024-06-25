import React, { useContext, useState, useEffect, useRef } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { useNavigation } from '@react-navigation/native'
import TrackerContext from '../state/TrackerContext'
import TrackerItem from '../components/TrackerItem'
import CarbCircleChart from '../charting/CarbCircleChart'
import NutrientBottomSheet from './NutrientBottomSheet'
import BottomSheet from 'reanimated-bottom-sheet'
import { TrackerItemType } from '../types/TrackerItemType'
import { ThemeContext } from '../state/ThemeContext'
import { TrackerContextType } from '../types/TrackerContextType'
import { FoodDataType } from '../types/FoodDataType'
import FavFoodModal from './FavFoodModal'
import {
  saveConsumptionLogs,
  getTotalCarbsForSpecificDayGU,
} from '../components/GlycemicUtils'
import UserContext, { UserContextProps } from '../state/UserContext'
import {
  normalizeDate,
  isSameDay,
  formatDateToYYYYMMDD,
} from '../utils/DateUtils'

type TrackerItemProps = {
  item: TrackerItemType
}

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
  if (!context) {
    throw new Error('useContext was used outside of the theme provider')
  }
  const { theme } = context
  const styles = getStyles(theme)

  const handleSave = (selectedFoods: FoodDataType[]) => {
    const updatedItemsForSelectedDate = [...itemsForSelectedDate]
    const newTrackerItems: TrackerItemType[] = []
    const normalizedSelectedDate = normalizeDate(selectedDate)

    selectedFoods.forEach((food) => {
      // Check if the food is already in itemsForSelectedDate for the selected date
      const existingItemIndex = updatedItemsForSelectedDate.findIndex(
        (item) =>
          item.foodFactsId === food.foodFactsId &&
          normalizeDate(new Date(item.consumptionDate)).getTime() ===
            normalizedSelectedDate.getTime()
      )
      if (existingItemIndex > -1) {
        // Increment the portionCount of the existing item
        updatedItemsForSelectedDate[existingItemIndex].portionCount++
      } else {
        // Create a new tracker item for the food
        const newItem = {
          id: Date.now().toString(),
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
    // Update trackerItems with a callback to ensure the latest state
    setTrackerItems((prevTrackerItems) => {
      const updatedTrackerItems = [
        ...prevTrackerItems,
        ...uniqueNewTrackerItems,
      ]

      // Update totalCarbs after updating trackerItems
      getTotalCarbsForSpecificDayGU(
        updatedTrackerItems,
        normalizedSelectedDate,
        setTotalCarbs
      )

      return updatedTrackerItems
    })

    // Update itemsForSelectedDate
    setItemsForSelectedDate([...itemsForSelectedDate, ...uniqueNewTrackerItems])

    // Save the new tracker items
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

  const renderTrackerItem = ({ item, index }: TrackerItemProps) => {
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

  const handlePrevDayTrack = () => {
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate)
      newDate.setDate(prevDate.getDate() - 1)
      const normalizedNewDate = normalizeDate(newDate)

      console.log('Previous Date:', prevDate)
      console.log('Selected Date (Previous Day):', normalizedNewDate)

      getTotalCarbsForSpecificDayGU(
        trackerItems,
        normalizedNewDate,
        setTotalCarbs
      )

      return normalizedNewDate
    })
  }

  const handleNextDayTrack = () => {
    console.log('trackerItems:' + JSON.stringify(trackerItems))
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate)
      newDate.setDate(prevDate.getDate() + 1)
      const normalizedNewDate = normalizeDate(newDate)

      console.log('Previous Date:', prevDate)
      console.log('Selected Date (Next Day):', normalizedNewDate)

      getTotalCarbsForSpecificDayGU(
        trackerItems,
        normalizedNewDate,
        setTotalCarbs
      )

      return normalizedNewDate
    })
  }

  const clickNutrientPanel = (item: TrackerItemType, index: number) => {
    if (index > -1) {
      setTrackerSelected(index)
    }

    if (isSheetOpen) {
      sheetRef.current?.snapTo(0)
    } else {
      sheetRef.current?.snapTo(1)
    }
    setIsSheetOpen(!isSheetOpen)
  }

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => {
      setFocused(true)
    })
    const unsubscribeBlur = navigation.addListener('blur', () => {
      setFocused(false)
    })

    // Normalize selected date before comparison
    const normalizedSelectedDate = normalizeDate(selectedDate)
    console.log('Normalized Selected Date:', normalizedSelectedDate)

    // trackerItems.forEach((item, index) => {
    //   const itemDate = new Date(item.consumptionDate)
    //   const normalizedItemDate = normalizeDate(itemDate)
    //   console.log(`Tracker Item ${index}:`, {
    //     description: item.description,
    //     originalDate: item.consumptionDate,
    //     normalizedDate: normalizedItemDate,
    //   })
    // })

    // Update items for selected date
    setItemsForSelectedDate(
      trackerItems.filter((item) => {
        const itemDate = normalizeDate(new Date(item.consumptionDate))
        return isSameDay(itemDate, normalizedSelectedDate)
      })
    )

    // setItemsForSelectedDate(
    //   trackerItems.filter((item) => {
    //     const itemDate = new Date(item.consumptionDate)
    //     const selected = new Date(selectedDate)
    //     return (
    //       itemDate.getFullYear() === selected.getFullYear() &&
    //       itemDate.getMonth() === selected.getMonth() &&
    //       itemDate.getDate() === selected.getDate()
    //     )
    //   })
    // )

    return () => {
      unsubscribeFocus()
      unsubscribeBlur()
    }
  }, [navigation, trackerItems, totalCarbs, selectedDate])

  return (
    <View style={styles.trackerContainer}>
      <View style={styles.dateHeader}>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={handlePrevDayTrack}
        >
          <FontAwesome5
            name="chevron-left"
            size={RFPercentage(3.2)}
            color={theme.buttonText}
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
          <FontAwesome5
            name="chevron-right"
            size={RFPercentage(3.2)}
            color={theme.buttonText}
          />
        </TouchableOpacity>
      </View>
      <FavFoodModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
      />
      <CarbCircleChart
        focused={focused}
        selectedDate={selectedDate}
        totalCarbs={totalCarbs}
      />
      <View
        style={{
          width: width,
          height: height * 0.05,
          backgroundColor: theme.buttonBackground,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 35,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true)
          }}
        >
          <Text style={{ color: 'white', fontSize: RFPercentage(3.1) }}>
            Add Food
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={itemsForSelectedDate}
        renderItem={renderTrackerItem}
        keyExtractor={(item) => item.description}
      />
      <View style={{ flex: 1 }}>
        <NutrientBottomSheet
          sheetRef={sheetRef}
          clickNutrientPanel={clickNutrientPanel}
          trackerSelected={trackerSelected}
          itemsForSelectedDate={itemsForSelectedDate}
        />
      </View>
    </View>
  )
}

export default KetoTrackerScreen

const getStyles = (theme) =>
  StyleSheet.create({
    trackerContainer: {
      flex: 1,
      backgroundColor: theme.viewBackground,
      color: theme.buttonText,
    },
    dateHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 5,
      backgroundColor: theme.viewBackground,
    },
    dateButton: {
      backgroundColor: theme.buttonBackground,
      paddingVertical: 10,
      paddingHorizontal: 18,
      borderRadius: 20,
    },
    dateButtonText: {
      color: theme.buttonText,
      fontSize: RFPercentage(3.3),
      fontWeight: 'bold',
    },
    dateDisplayContainer: {
      flex: 1,
      alignItems: 'center',
    },
    dateDisplayText: {
      color: theme.buttonText,
      fontSize: RFPercentage(3.3),
    },
  })
