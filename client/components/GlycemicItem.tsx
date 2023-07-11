import React, { useState, memo, useContext } from 'react'

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import axios from 'axios'

import BoxesLayout from './BoxesLayout'

import TrackerContext from '../state/TrackerContext'
import UserContext, { UserContextProps } from '../state/UserContext'
// import GlycemicContext from '../state/GlycemicContext'
import { TrackerItemType } from '../types/TrackerItemType'
import { TrackerContextType } from '../state/TrackerContextType'
import {
  saveConsumptionLogs,
  saveFavouriteFoods,
  formatDateToYYYYMMDD,
} from '../utils/GlycemicUtils'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const { width, height } = Dimensions.get('screen')

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
  isFavourite: boolean
  // animatedOpacitySequence: () => void
  // setSearchItemSelected: (index: number) => void
  // searchItemSelected: number
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
  isFavourite,
  // animatedOpacitySequence,
  // setSearchItemSelected,
  // searchItemSelected,
  // glycemicData,
}) => {
  const [itemIsFavourite, setItemIsFavourite] = useState(isFavourite)

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

  const { userId } = useContext<UserContextProps>(UserContext)

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

  const favouriteTrackerItem = () => {
    console.log('favouriteTrackerItem')

    // Our array is only going to have one item in it.  If they click more than one, that means multiple calls!  Would be too clunky any other way.

    const favouriteFoods = []
    favouriteFoods.push({
      foodFactsId: Number(foodFactsId),
      isFavourite: !itemIsFavourite,
    })
    console.log('favouriteFoods:' + JSON.stringify(favouriteFoods))
    setItemIsFavourite(!itemIsFavourite)

    saveFavouriteFoods(favouriteFoods, userId)
  }

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
        // if (index > -1) {
        //   setSearchItemSelected(index)
        // }

        const logs = []
        logs.push({
          foodFactsId: Number(trackerItem.foodFactsId),
          consumptionDate: formatDateToYYYYMMDD(trackerItem.consumptionDate),
          userId: userId,
        })
        console.log('logs:' + JSON.stringify(logs))
        const dayToUpdate = formatDateToYYYYMMDD(selectedDate)
        console.log('dayToUpdate:' + dayToUpdate) // Output: '2023-06-24'

        saveConsumptionLogs(trackerItem, logs, dayToUpdate, false, true)
      }}
    >
      <View style={dynamicStyles.listItemContainerStyle}>
        <Text style={styles.description}>{descriptionGI}</Text>
        <TouchableOpacity
          onPress={favouriteTrackerItem}
          style={{ width: width * 0.1 }}
        >
          <FontAwesome5
            name="heart"
            size={35}
            color="#2196F3"
            solid={itemIsFavourite ? true : false}
          />
        </TouchableOpacity>
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
  description: {
    width: width * 0.7,
    textAlign: 'right',
    borderRightColor: 'pink',
    borderRightWidth: 1,
    fontSize: 28,
    fontWeight: '300',
    color: 'rgba(201, 189, 187, 1)',
  },
})
