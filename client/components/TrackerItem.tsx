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
  formatDateToYYYYMMDD,
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
    [trackerItems] // carbBackgroundColor (not needed i assume)
  )

  // const pressTrackerItem = () => {
  //   const dateBasedIndex = itemsForSelectedDate.findIndex(
  //     ({ description }) => description === item.description
  //   )
  //   if (dateBasedIndex > -1) {
  //     setTrackerSelected(dateBasedIndex)
  //   }
  // }

  const incrementPortionCount = () => {
    const newTrackerItems = [...trackerItems]
    trackerItems.map((mapItem, index) => {
      if (
        item.description === mapItem.description &&
        item.consumptionDate === mapItem.consumptionDate
      ) {
        const newItem = { ...item, portionCount: item.portionCount++ }
        return newItem
      } else {
        return mapItem
      }
    })
    setTrackerItems(newTrackerItems)
    updatePortionAmountApi(
      userId,
      formatDateToISO(item.consumptionDate),
      item.foodFactsId,
      item.portionCount
    )
    getTotalCarbsForSpecificDayGU(trackerItems, selectedDate, setTotalCarbs)
  }

  const decrementPortionCount = () => {
    if (item.portionCount > 1) {
      const newTrackerItems = [...trackerItems]
      trackerItems.map((mapItem, index) => {
        if (
          item.description === mapItem.description &&
          item.consumptionDate === mapItem.consumptionDate
        ) {
          const newItem = { ...item, portionCount: item.portionCount-- }
          return newItem
        } else {
          return mapItem
        }
      })

      setTrackerItems(newTrackerItems)
      updatePortionAmountApi(
        userId,
        formatDateToISO(item.consumptionDate),
        item.foodFactsId,
        item.portionCount
      )
    }
    getTotalCarbsForSpecificDayGU(trackerItems, selectedDate, setTotalCarbs)
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

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    )
  }

  const deleteTrackerItem = () => {
    //give me all the trackeritems that aren't "today" && aren't this description
    const newTrackerItems = trackerItems.filter((trackerItem) => {
      return (
        trackerItem.description !== item.description ||
        !isSameDay(trackerItem.consumptionDate, selectedDate)
      )
    })
    setTrackerItems(newTrackerItems)

    const newItemsForSelectedDate = itemsForSelectedDate.filter(
      (selectedItem) => {
        return (
          selectedItem.description !== item.description &&
          !isSameDay(selectedItem.consumptionDate, selectedDate)
        )
      }
    )

    setItemsForSelectedDate(newItemsForSelectedDate)

    const itemsToSerialize = [
      {
        foodFactsId: Number(item.foodFactsId),
        consumptionDate: formatDateToYYYYMMDD(item.consumptionDate),
        userId: userId,
        defaultFl: false,
        portionCount: 0,
      },
    ]
    const dayToUpdate = formatDateToYYYYMMDD(selectedDate)

    // save to the database (including the delete)
    saveConsumptionLogs(itemsToSerialize, dayToUpdate, true, false)
    getTotalCarbsForSpecificDayGU(trackerItems, selectedDate, setTotalCarbs)
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
        {/* <TouchableOpacity onPress={pressTrackerItem}> */}
        <Text style={styles.foodDescriptionText}>{item.description}</Text>
        {/* </TouchableOpacity> */}
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
      fontSize: RFPercentage(3.5),
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
