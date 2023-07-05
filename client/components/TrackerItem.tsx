import React, { useContext, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import TrackerContext from '../state/TrackerContext'
import PortionLayout from './PortionLayout'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import { TrackerItemProps } from '../types/ItemTypes'
import {
  saveConsumptionLogs,
  formatDateToYYYYMMDD,
} from '../utils/GlycemicUtils'

const { width, height } = Dimensions.get('screen')

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
    setTotalGILoad,
    totalCarbs,
  } = useContext(TrackerContext)

  const pressTrackerItem = () => {
    // const index = itemsForSelectedDate.findIndex(
    //   ({ description }) => description === item.description
    // )
    // if (index > -1) {
    //   setTrackerSelected(index)
    // }
    const dateBasedIndex = itemsForSelectedDate.findIndex(
      ({ description }) => description === item.description
    )
    if (dateBasedIndex > -1) {
      setTrackerSelected(dateBasedIndex)
    }
  }

  const deleteTrackerItem = () => {
    const newTrackerItems = trackerItems.filter(
      ({ description, consumptionDate }) => {
        return description !== item.description
      }
    )
    setTrackerItems(newTrackerItems)

    const newItemsForSelectedDate = itemsForSelectedDate.filter(
      ({ description, consumptionDate }) => {
        return description !== item.description
      }
    )
    setItemsForSelectedDate(newItemsForSelectedDate)

    setTrackerSelected(0)

    let totalCarbs = 0
    let totalGILoad = 0
    newItemsForSelectedDate.forEach((trackerItem) => {
      totalCarbs += trackerItem.carbAmt
      totalGILoad += trackerItem.giAmt
    })

    setTotalCarbs(totalCarbs)
    setTotalGILoad(totalGILoad)

    const logs = [
      {
        food_facts_id: Number(item.foodFactsId),
        consumption_date: formatDateToYYYYMMDD(item.consumptionDate),
      },
    ]

    const dayToUpdate = formatDateToYYYYMMDD(selectedDate)

    // save to the database (including the delete)
    saveConsumptionLogs(item, logs, dayToUpdate, true, false)
  }

  useEffect(() => {
    // }
  }, [item.portionAmount, totalCarbs])

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <TouchableOpacity onPress={() => clickNutrientPanel(item, index)}>
          <View style={{ width: width * 0.1 }}>
            <FontAwesome5 name="heartbeat" size={40} color="#2196F3" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={pressTrackerItem}>
          <View
            style={{
              flexDirection: 'row',
              width: width * 0.8,
            }}
          >
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteTrackerItem}>
          <View style={{ width: width * 0.1 }}>
            <FontAwesome5 name="trash" size={40} color="#2196F3" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default TrackerItem

const styles = StyleSheet.create({
  description: {
    color: 'rgb(124, 131, 134)',
    alignItems: 'center',
    fontSize: 32,
    fontWeight: '200',
  },
})