import React, { useContext, useMemo, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import TrackerContext from '../state/TrackerContext'
import UserContext from '../state/UserContext'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { ThemeContext } from '../state/ThemeContext'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { updatePortionAmountApi } from './updatePortionAmount'
import { TrackerItemProps } from '../types/ItemTypes'
import {
  saveConsumptionLogs,
  formatDateToISO,
  favouriteFoodItem,
  getTotalCarbsForSpecificDayGU,
} from './GlycemicUtils'
import { TrackerContextType } from '../types/TrackerContextType'

import FoodContext from '../state/FoodContext'
import { FoodContextType } from '../types/FoodContextType'
import { useDispatch, useSelector } from 'react-redux'
import { updateFavFoodList } from '../redux/action-creators'
import { RootState } from '../redux/reducers'
import {
  normalizeDate,
  isSameDay,
  formatDateToYYYYMMDD,
} from '../utils/DateUtils'

const { width } = Dimensions.get('screen')

const TrackerItem = ({
  item,
  index,
  setTrackerSelected,
  trackerSelected,
  clickNutrientPanel,
  carbBackgroundColor,
  selectedDate,
  itemsForSelectedDate,
  setItemsForSelectedDate,
}: TrackerItemProps) => {
  const { trackerItems, setTrackerItems, setTotalCarbs, totalCarbs } =
    useContext<TrackerContextType>(TrackerContext)
  const dispatch = useDispatch()
  const favFoodList = useSelector((state: RootState) => state.favFoodList)

  const { foodData } = useContext<FoodContextType>(FoodContext)
  const { userId } = useContext(UserContext)
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useContext was used outside of the theme provider')
  }
  const { theme } = context
  const styles = getStyles(theme)
  const [itemIsFavourite, setItemIsFavourite] = useState(item.isFavourite)

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        trackerRowContainer: {
          flexDirection: 'row',
          width: width,
          alignItems: 'center',
          borderColor: theme.tableLineColor,
          borderWidth: 1,
          backgroundColor:
            item.carbAmt > 22
              ? theme.badBackground
              : item.carbAmt > 11
              ? theme.middlingBackground
              : theme.tableBackground,
        },
      }),
    [trackerItems]
  )

  const incrementPortionCount = () => {
    const newTrackerItems = trackerItems.map((mapItem) => {
      if (
        item.description === mapItem.description &&
        isSameDay(
          new Date(mapItem.consumptionDate),
          new Date(item.consumptionDate)
        )
      ) {
        // Increment the portionCount here
        const updatedItem = { ...item, portionCount: item.portionCount + 1 }

        // Update the portion amount in the database
        updatePortionAmountApi(
          userId,
          formatDateToISO(new Date(item.consumptionDate)),
          item.foodFactsId,
          updatedItem.portionCount
        )

        return updatedItem
      } else {
        return mapItem
      }
    })
    // Update state with newTrackerItems
    setTrackerItems((prevTrackerItems) => {
      // Update totalCarbs after updating trackerItems
      getTotalCarbsForSpecificDayGU(
        newTrackerItems,
        selectedDate,
        setTotalCarbs
      )

      return newTrackerItems
    })
  }

  const decrementPortionCount = () => {
    if (item.portionCount > 1) {
      // Map over trackerItems and update the portionCount for the matching item
      const newTrackerItems = trackerItems.map((mapItem) => {
        if (
          item.description === mapItem.description &&
          isSameDay(
            new Date(mapItem.consumptionDate),
            new Date(item.consumptionDate)
          )
        ) {
          // Decrement the portionCount here
          const updatedItem = { ...item, portionCount: item.portionCount - 1 }

          // Update the portion amount in the database
          updatePortionAmountApi(
            userId,
            formatDateToISO(new Date(item.consumptionDate)),
            item.foodFactsId,
            updatedItem.portionCount
          )

          return updatedItem
        } else {
          return mapItem
        }
      })

      // Update state with newTrackerItems
      setTrackerItems((prevTrackerItems) => {
        // Update totalCarbs after updating trackerItems
        getTotalCarbsForSpecificDayGU(
          newTrackerItems,
          selectedDate,
          setTotalCarbs
        )

        return newTrackerItems
      })
    } else if (item.portionCount === 1) {
      deleteTrackerItem()
    }
  }

  const favouriteTrackerItem = () => {
    favouriteFoodItem(
      item.description,
      itemIsFavourite,
      setItemIsFavourite,
      foodData,
      favFoodList,
      updateFavFoodList,
      userId,
      trackerItems,
      setTrackerItems,
      dispatch
    )
  }

  // const isSameDay = (date1: Date, date2: Date) => {
  //   return (
  //     date1.getFullYear() === date2.getFullYear() &&
  //     date1.getMonth() === date2.getMonth() &&
  //     date1.getDate() === date2.getDate()
  //   )
  // }

  const deleteTrackerItem = () => {
    const normalizedSelectedDate = normalizeDate(selectedDate)

    // Filter out the item to be deleted from trackerItems
    const newTrackerItems = trackerItems.filter((trackerItem) => {
      const normalizedTrackerItemDate = normalizeDate(
        new Date(trackerItem.consumptionDate)
      )

      return (
        trackerItem.description !== item.description ||
        !isSameDay(normalizedTrackerItemDate, normalizedSelectedDate)
      )
    })

    // Update trackerItems with a callback to ensure the latest state
    setTrackerItems((prevTrackerItems) => {
      const updatedTrackerItems = newTrackerItems

      // Update totalCarbs after updating trackerItems
      getTotalCarbsForSpecificDayGU(
        updatedTrackerItems,
        normalizedSelectedDate,
        setTotalCarbs
      )

      return updatedTrackerItems
    })

    // Filter out the item to be deleted from itemsForSelectedDate
    const newItemsForSelectedDate = itemsForSelectedDate.filter(
      (selectedItem) => {
        const normalizedSelectedItemDate = normalizeDate(
          new Date(selectedItem.consumptionDate)
        )
        return (
          selectedItem.description !== item.description &&
          !isSameDay(normalizedSelectedItemDate, normalizedSelectedDate)
        )
      }
    )

    // Update itemsForSelectedDate
    setItemsForSelectedDate(newItemsForSelectedDate)

    // Prepare the item to be deleted for saving to the database
    const itemsToSerialize = [
      {
        foodFactsId: Number(item.foodFactsId),
        consumptionDate: formatDateToYYYYMMDD(
          normalizeDate(new Date(item.consumptionDate))
        ),
        userId: userId,
        defaultFl: false,
        portionCount: 0,
      },
    ]
    const dayToUpdate = formatDateToYYYYMMDD(selectedDate)
    console.log('dayToUpdate:' + dayToUpdate)
    // Save to the database (including the delete)
    saveConsumptionLogs(itemsToSerialize, dayToUpdate, true, false)
  }

  return (
    <View style={dynamicStyles.trackerRowContainer}>
      <View style={styles.portionTrackerIcon}>
        <TouchableOpacity onPress={incrementPortionCount}>
          <FontAwesome5
            name="plus"
            size={RFPercentage(3.3)}
            color={theme.iconFill}
            solid={itemIsFavourite ? true : false}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.portionContainer}>
        <Text style={styles.foodDescriptionText}>{item.portionCount}</Text>
      </View>
      <View style={styles.portionTrackerIcon}>
        <TouchableOpacity onPress={decrementPortionCount}>
          <FontAwesome5
            name="minus"
            size={RFPercentage(3.3)}
            color={theme.iconFill}
            solid={itemIsFavourite ? true : false}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.foodDescriptionContainer}>
        <Text style={styles.foodDescriptionText}>{item.description}</Text>
      </View>
      <View style={styles.nutTrackerIcon}>
        <TouchableOpacity onPress={() => clickNutrientPanel(item, index)}>
          <FontAwesome5
            name="info-circle"
            size={RFPercentage(3.9)}
            color={theme.iconFill}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.favTrackerIcon}>
        <TouchableOpacity onPress={favouriteTrackerItem}>
          <FontAwesome5
            name="heart"
            size={RFPercentage(3.9)}
            color={theme.iconFill}
            solid={itemIsFavourite ? true : false}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.deleteTrackerIcon}>
        <TouchableOpacity onPress={deleteTrackerItem}>
          <FontAwesome5
            name="trash"
            size={RFPercentage(3.9)}
            color={theme.iconFill}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default TrackerItem

const getStyles = (theme) =>
  StyleSheet.create({
    foodDescriptionContainer: {
      width: width * 0.5,
    },
    portionContainer: {
      width: width * 0.06,
    },
    foodDescriptionText: {
      color: theme.buttonText,
      alignItems: 'center',
      fontSize: RFPercentage(3.0),
      fontWeight: '300',
      marginLeft: 3,
    },
    portionText: {
      color: theme.buttonText,
      alignItems: 'center',
      fontSize: RFPercentage(3.5),
      fontWeight: '300',
    },
    nutTrackerIcon: {
      width: width * 0.1,
      borderLeftColor: theme.tableLineColor,
      borderLeftWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    favTrackerIcon: {
      width: width * 0.1,
      borderLeftColor: theme.tableLineColor,
      borderLeftWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    portionTrackerIcon: {
      width: width * 0.07,
      borderLeftColor: theme.tableLineColor,
      borderLeftWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    deleteTrackerIcon: {
      borderLeftColor: theme.tableLineColor,
      borderLeftWidth: 1,
      width: width * 0.1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
