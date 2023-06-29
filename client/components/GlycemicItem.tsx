import React, { useState, memo, useContext } from 'react'

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import axios from 'axios'

import BoxesLayout from './BoxesLayout'

import TrackerContext from '../state/TrackerContext'
// import GlycemicContext from '../state/GlycemicContext'
import { TrackerItemType } from '../types/TrackerItemType'
import { TrackerContextType } from '../state/TrackerContextType'
import {
  saveConsumptionLogs,
  formatDateToYYYYMMDD,
} from '../utils/GlycemicUtils'

interface GlycemicItemProps {
  descriptionGI: string
  foodFactsId: string
  carbAmt: number
  giAmt: number
  glAmt: number
  fiberAmt: number
  proteinAmt: number
  fatAmt: number
  energyAmt: number
  sugarsAmt: number
  sodiumAmt: number
  // animatedOpacitySequence: () => void
  setSearchItemSelected: (index: number) => void
  searchItemSelected: number
  // glycemicData: Array<any> // replace 'any' with appropriate type for your data
}

const GlycemicItem: React.FC<GlycemicItemProps> = ({
  descriptionGI,
  foodFactsId,
  carbAmt,
  giAmt,
  glAmt,
  fiberAmt,
  proteinAmt,
  fatAmt,
  energyAmt,
  sugarsAmt,
  sodiumAmt,
  // animatedOpacitySequence,
  setSearchItemSelected,
  searchItemSelected,
  // glycemicData,
}) => {
  const {
    trackerItems,
    setTrackerItems,
    itemsForSelectedDate,
    selectedDate,
    setItemsForSelectedDate,
    setTotalCarbs,
    setTotalGILoad,
    foodData,
  } = useContext<TrackerContextType>(TrackerContext)

  let giBackgroundColor = '#350244'
  if (glAmt > 60) {
    giBackgroundColor = '#1A0546'
  } else if (glAmt > 30) {
    giBackgroundColor = '#5C6500'
  }

  let glBackgroundColor = '#350244'
  if (glAmt > 19) {
    glBackgroundColor = '#1A0546'
  } else if (glAmt > 10) {
    glBackgroundColor = '#5C6500'
  }

  // Carb ranges (keto watch outs)
  let carbBackgroundColor = '#350244'
  if (carbAmt > 22) {
    carbBackgroundColor = '#1A0546'
  } else if (carbAmt > 11) {
    carbBackgroundColor = '#5C6500'
  }

  const dynamicStyles = StyleSheet.create({
    listItemContainerStyle: {
      borderColor: 'white',
      borderWidth: 1,
      flexDirection: 'row',
      backgroundColor: carbBackgroundColor,
      alignItems: 'center',
    },
  })

  return (
    <TouchableOpacity
      onPress={() => {
        const trackerClicked = trackerItems.find(
          (item: TrackerItemType) => item.description === descriptionGI
        )
        const trackerItem = {
          id: descriptionGI,
          foodFactsId: foodFactsId,
          description: descriptionGI,
          carbAmt: carbAmt,
          giAmt: giAmt,
          glAmt: glAmt,
          fiberAmt: fiberAmt,
          proteinAmt: proteinAmt,
          fatAmt: fatAmt,
          energyAmt: energyAmt,
          sugarsAmt: sugarsAmt,
          sodiumAmt: sodiumAmt,
          giBackgroundColor: giBackgroundColor,
          glBackgroundColor: glBackgroundColor,
          carbBackgroundColor: carbBackgroundColor,
          portionAmount: 1,
          consumptionDate: selectedDate,
        }

        if (trackerClicked) {
          trackerClicked.portionAmount++
          console.log('trackerClicked, increasing portion amount')
        } else {
          console.log(
            'trackerItem(before setTrackerItems): ' +
              JSON.stringify(trackerItem)
          )

          setTrackerItems([...trackerItems, trackerItem])
          setItemsForSelectedDate([...itemsForSelectedDate, trackerItem])
        } // if
        let totalCarbs = 0
        let totalGILoad = 0
        // let logs = [
        //   { food_facts_id: 516, consumption_date: '2023-06-24' },
        //   { food_facts_id: 517, consumption_date: '2023-06-24' },
        // ]
        // you know food_facts_id and date, delete everything for that, don't delete everything.  For search screen, you don't have to delete anything.  For delete, you do.  So add a delete flag, which we send over.

        itemsForSelectedDate.map((trackerItem: TrackerItemType) => {
          totalCarbs += trackerItem.carbAmt
          totalGILoad += trackerItem.glAmt
        })

        setTotalCarbs(totalCarbs)
        setTotalGILoad(totalGILoad)
        // const index = glycemicData.findIndex(
        //   ({ description }) => description === descriptionGI
        // )
        const index = foodData.findIndex(
          ({ foodName }) => foodName === descriptionGI
        )
        if (index > -1) {
          setSearchItemSelected(index)
        }

        const logs = []
        logs.push({
          food_facts_id: Number(trackerItem.foodFactsId),
          consumption_date: formatDateToYYYYMMDD(trackerItem.consumptionDate),
        })
        console.log('logs:' + JSON.stringify(logs))
        const dayToUpdate = formatDateToYYYYMMDD(selectedDate)
        console.log('dayToUpdate:' + dayToUpdate) // Output: '2023-06-24'

        saveConsumptionLogs(trackerItem, logs, dayToUpdate, false, true)
      }}
    >
      <View style={dynamicStyles.listItemContainerStyle}>
        <Text style={styles.listItemStyle}>{descriptionGI}</Text>
        <BoxesLayout
          giAmt={giAmt}
          glAmt={glAmt}
          carbAmt={carbAmt}
          giBackgroundColor={giBackgroundColor}
          glBackgroundColor={glBackgroundColor}
          carbBackgroundColor={carbBackgroundColor}
          boxWidth={48}
          boxHeight={48}
          textFontSize={30}
        />
      </View>
    </TouchableOpacity>
  )
}

function arePropsEqual(
  prevProps: GlycemicItemProps,
  nextProps: GlycemicItemProps
): boolean {
  return prevProps.descriptionGI === nextProps.descriptionGI
}
export default memo(GlycemicItem, arePropsEqual)

const styles = StyleSheet.create({
  listItemStyle: {
    width: '63%',
    textAlign: 'right',
    borderRightColor: 'pink',
    borderRightWidth: 1,
    fontSize: 30,
    fontWeight: '200',
    color: 'rgba(201, 189, 187, 1)',
  },
})
