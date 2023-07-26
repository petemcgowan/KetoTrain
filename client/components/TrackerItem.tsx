import React, { useContext } from 'react'
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

import { TrackerItemProps } from '../types/ItemTypes'
import {
  saveConsumptionLogs,
  formatDateToYYYYMMDD,
} from '../utils/GlycemicUtils'

const { width } = Dimensions.get('screen')

const TrackerItem = ({
  item,
  index,
  setTrackerSelected,
  trackerSelected,
  clickNutrientPanel,
}: TrackerItemProps) => {
  const {
    trackerItems,
    itemsForSelectedDate,
    selectedDate,
    setItemsForSelectedDate,
    setTrackerItems,
    setTotalCarbs,
    totalCarbs,
  } = useContext(TrackerContext)
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useContext was used outside of the theme provider')
  }
  const { theme } = context
  const styles = getStyles(theme)

  const { userId } = useContext(UserContext)

  const pressTrackerItem = () => {
    const dateBasedIndex = itemsForSelectedDate.findIndex(
      ({ description }) => description === item.description
    )
    if (dateBasedIndex > -1) {
      setTrackerSelected(dateBasedIndex)
    }
  }

  const favouriteTrackerItem = () => {
    console.log('favouriteTrackerItem')
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
    <View
      style={{
        flexDirection: 'row',
        width: width,
        alignItems: 'center',
      }}
    >
      <TouchableOpacity onPress={() => clickNutrientPanel(item, index)}>
        <View style={{ width: width * 0.1 }}>
          <FontAwesome5 name="info-circle" size={35} color={theme.iconFill} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={pressTrackerItem}
        style={{ width: width * 0.7 }}
      >
        <Text style={styles.description}>{item.description}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={favouriteTrackerItem}
        style={{ width: width * 0.1 }}
      >
        <FontAwesome5 name="heart" size={35} color={theme.iconFill} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={deleteTrackerItem}
        style={{ width: width * 0.1 }}
      >
        <FontAwesome5 name="trash" size={35} color={theme.iconFill} />
      </TouchableOpacity>
    </View>
  )
}

export default TrackerItem

const getStyles = (theme) =>
  StyleSheet.create({
    description: {
      color: 'rgb(124, 131, 134)',
      alignItems: 'center',
      fontSize: 28,
      fontWeight: '300',
    },
  })
