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

import { TrackerItemProps } from '../types/ItemTypes'
import {
  saveConsumptionLogs,
  formatDateToYYYYMMDD,
  favouriteFoodItem,
} from './GlycemicUtils'

const { width } = Dimensions.get('screen')

const TrackerItem = ({
  item,
  index,
  setTrackerSelected,
  trackerSelected,
  clickNutrientPanel,
  carbBackgroundColor,
}: TrackerItemProps) => {
  const {
    trackerItems,
    itemsForSelectedDate,
    selectedDate,
    setItemsForSelectedDate,
    setTrackerItems,
    setTotalCarbs,
    totalCarbs,
    searchFoodList,
    setSearchFoodList,
    foodData,
    favFoodList,
    setFavFoodList,
  } = useContext(TrackerContext)
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
          backgroundColor: carbBackgroundColor,
        },
      }),
    [trackerItems] // carbBackgroundColor (not needed i assume)
  )

  const pressTrackerItem = () => {
    const dateBasedIndex = itemsForSelectedDate.findIndex(
      ({ description }) => description === item.description
    )
    if (dateBasedIndex > -1) {
      setTrackerSelected(dateBasedIndex)
    }
  }

  const favouriteTrackerItem = () => {
    console.log(
      'TrackerItem, favouriteTrackerItem, itemIsFavourite:' + itemIsFavourite
    )
    favouriteFoodItem(
      item.description,
      itemIsFavourite,
      setItemIsFavourite,
      searchFoodList,
      setSearchFoodList,
      foodData,
      favFoodList,
      setFavFoodList,
      userId,
      trackerItems,
      setTrackerItems
    )
  }

  const deleteTrackerItem = () => {
    const newTrackerItems = trackerItems.filter(({ description }) => {
      return description !== item.description
    })
    setTrackerItems(newTrackerItems)

    const newItemsForSelectedDate = itemsForSelectedDate.filter(
      ({ description }) => {
        return description !== item.description
      }
    )
    setItemsForSelectedDate(newItemsForSelectedDate)

    setTrackerSelected(0)

    let totalCarbs = 0
    newItemsForSelectedDate.forEach((trackerItem) => {
      totalCarbs += trackerItem.carbAmt
    })

    setTotalCarbs(totalCarbs)

    const itemsToSerialize = [
      {
        foodFactsId: Number(item.foodFactsId),
        consumptionDate: formatDateToYYYYMMDD(item.consumptionDate),
        userId: userId,
      },
    ]
    const dayToUpdate = formatDateToYYYYMMDD(selectedDate)

    // save to the database (including the delete)
    saveConsumptionLogs(item, itemsToSerialize, dayToUpdate, true, false)
  }

  return (
    <View style={dynamicStyles.trackerRowContainer}>
      <View style={styles.foodDescriptionContainer}>
        <TouchableOpacity onPress={pressTrackerItem}>
          <Text style={styles.foodDescriptionText}>{item.description}</Text>
        </TouchableOpacity>
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
      width: width * 0.7,
    },
    foodDescriptionText: {
      color: theme.buttonText,
      alignItems: 'center',
      fontSize: RFPercentage(3.3),
      fontWeight: '300',
      marginLeft: 3,
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
    deleteTrackerIcon: {
      borderLeftColor: theme.tableLineColor,
      borderLeftWidth: 1,
      width: width * 0.1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
