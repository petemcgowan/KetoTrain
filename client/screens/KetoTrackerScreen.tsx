import React, { useContext, useState, useEffect, useRef } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  Button,
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
import { TimeContextType } from '../types/TimeContextType'
import TimeContext from '../state/TimeContext'
import { FoodDataType } from '../types/FoodDataType'
import FavFoodModal from './FavFoodModal'

type TrackerItemProps = {
  item: TrackerItemType
}

const KetoTrackerScreen = () => {
  console.log('KetoTrackerScreen is rendering')
  const { trackerItems, totalCarbs, setTotalCarbs, setTrackerItems } =
    useContext<TrackerContextType>(TrackerContext)
  const [modalVisible, setModalVisible] = useState(false)

  const {
    itemsForSelectedDate,
    selectedDate,
    setSelectedDate,
    setItemsForSelectedDate,
    // handlePrevDay,
    // handleNextDay,
  } = useContext<TimeContextType>(TimeContext)

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
    const newTrackerItems = selectedFoods.map((food) => ({
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
      carbBackgroundColor: 'blue', // Assign as needed
      portionAmount: 1,
      consumptionDate: new Date(),
      isFavourite: food.isFavourite,
    }))
    setTrackerItems([...trackerItems, ...newTrackerItems])
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
      />
    )
  }

  const getTotalCarbsForSpecificDayTrack = () => {
    let carbsForDayAmt = 0

    trackerItems.map((item) => {
      const itemDate = new Date(item.consumptionDate)

      if (
        itemDate.getFullYear() === selectedDate.getFullYear() &&
        itemDate.getMonth() === selectedDate.getMonth() &&
        itemDate.getDate() === selectedDate.getDate()
      ) {
        carbsForDayAmt = carbsForDayAmt + item.carbAmt
      }
    })
    setTotalCarbs(carbsForDayAmt)
    return carbsForDayAmt
  }

  const handleNextDayTrack = () => {
    console.log('handleNextDayTrack has been called')
    setSelectedDate(
      (prevDate) => new Date(prevDate.setDate(prevDate.getDate() + 1))
    )
    getTotalCarbsForSpecificDayTrack()
  }

  const handlePrevDayTrack = () => {
    console.log('handlePrevDayTrack has been called')
    setSelectedDate(
      (prevDate) => new Date(prevDate.setDate(prevDate.getDate() - 1))
    )
    getTotalCarbsForSpecificDayTrack()
  }

  const clickNutrientPanel = (item: TrackerItemType, index: number) => {
    console.log('clickNutrientPanel, index:' + index)
    if (index > -1) {
      setTrackerSelected(index)
    }
    console.log('clickNutrientPanel, item.carbAmt:' + item.carbAmt)
    if (isSheetOpen) {
      sheetRef.current?.snapTo(0)
    } else {
      sheetRef.current?.snapTo(1)
    }
    setIsSheetOpen(!isSheetOpen)
  }

  useEffect(() => {
    console.log('KetoTrackerScreen, useEffect')
    const unsubscribeFocus = navigation.addListener('focus', () => {
      setFocused(true)
    })
    const unsubscribeBlur = navigation.addListener('blur', () => {
      setFocused(false)
    })

    setItemsForSelectedDate(
      trackerItems.filter((item) => {
        const itemDate = new Date(item.consumptionDate)
        const selected = new Date(selectedDate)
        return (
          itemDate.getFullYear() === selected.getFullYear() &&
          itemDate.getMonth() === selected.getMonth() &&
          itemDate.getDate() === selected.getDate()
        )
      })
    )

    return () => {
      unsubscribeFocus()
      unsubscribeBlur()
    }
  }, [navigation, trackerItems, totalCarbs, selectedDate])

  return (
    <SafeAreaView style={styles.trackerContainer}>
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
            {selectedDate.toDateString()}
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
      <FlatList
        data={itemsForSelectedDate}
        renderItem={renderTrackerItem}
        keyExtractor={(item) => item.id}
      />
      <Button
        title="Add Food"
        onPress={() => {
          setModalVisible(true)
          console.log('trackerItems:' + JSON.stringify(trackerItems))
        }}
      />
      <FavFoodModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
      />
      <CarbCircleChart focused={focused} />
      <View style={{ flex: 1 }}>
        <NutrientBottomSheet
          sheetRef={sheetRef}
          clickNutrientPanel={clickNutrientPanel}
          trackerSelected={trackerSelected}
        />
      </View>
    </SafeAreaView>
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
