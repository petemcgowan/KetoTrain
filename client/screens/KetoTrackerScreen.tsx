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

type TrackerItemProps = {
  item: TrackerItemType
}

const KetoTrackerScreen = () => {
  const {
    trackerItems,
    totalCarbs,
    selectedDate,
    handlePrevDay,
    handleNextDay,
    setSelectedDate,
    setTotalCarbs,
    itemsForSelectedDate,
    setItemsForSelectedDate,
    foodData,
  } = useContext(TrackerContext)
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

  const renderTrackerItem = ({ item, index }: TrackerItemProps) => {
    console.log(
      'KetoTrackerScreen, item.carbBackgroundColor:' + item.carbBackgroundColor
    )
    // const matchingFoodFact = foodData.find(
    //   (foodItem) => foodItem.foodName === item.description
    // )

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
    // console.log('KetoTrackerScreen, useEffect')
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
        <TouchableOpacity style={styles.dateButton} onPress={handlePrevDay}>
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
        <TouchableOpacity style={styles.dateButton} onPress={handleNextDay}>
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
