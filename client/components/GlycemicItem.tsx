import React, { useState, memo, useContext, useMemo } from 'react'

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native'

import TrackerContext from '../state/TrackerContext'
import UserContext, { UserContextProps } from '../state/UserContext'
import { TrackerItemType } from '../types/TrackerItemType'
import { TrackerContextType } from '../state/TrackerContextType'
import {
  saveConsumptionLogs,
  saveFavouriteFoods,
  formatDateToYYYYMMDD,
} from '../utils/GlycemicUtils'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const { width } = Dimensions.get('screen')

interface GlycemicItemProps {
  descriptionGI: string
  carbAmt: number
  isFavourite: boolean
  carbBackgroundColor: string
}

const GlycemicItem: React.FC<GlycemicItemProps> = ({
  descriptionGI,
  carbAmt,
  isFavourite,
  carbBackgroundColor,
}) => {
  const [itemIsFavourite, setItemIsFavourite] = useState(isFavourite)

  const {
    trackerItems,
    setTrackerItems,
    itemsForSelectedDate,
    selectedDate,
    setItemsForSelectedDate,
    setTotalCarbs,
    foodData,
  } = useContext<TrackerContextType>(TrackerContext)

  const { userId } = useContext<UserContextProps>(UserContext)

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        listItemContainerStyle: {
          borderColor: 'white',
          borderWidth: 1,
          flexDirection: 'row',
          backgroundColor: carbBackgroundColor,
          alignItems: 'center',
        },
      }),
    [carbBackgroundColor]
  )

  const addTrackerItem = () => {
    // get the food facts item for setting up tracker
    const matchingFoodFact = foodData.find(
      (item) => item.foodName === descriptionGI
    )
    console.log('matchingFoodFact:' + JSON.stringify(matchingFoodFact))
    let trackerItem: TrackerItemType

    if (matchingFoodFact) {
      trackerItem = {
        id: descriptionGI,
        foodFactsId: matchingFoodFact.foodFactsId,
        description: descriptionGI,
        carbAmt: carbAmt,
        fiberAmt: matchingFoodFact.totalDietaryFibre,
        proteinAmt: matchingFoodFact.protein,
        fatAmt: matchingFoodFact.fatTotal,
        energyAmt: matchingFoodFact.energy,
        sugarsAmt: matchingFoodFact.totalSugars,
        sodiumAmt: matchingFoodFact.sodium,
        carbBackgroundColor: carbBackgroundColor,
        portionAmount: 1,
        consumptionDate: selectedDate,
      }
      console.log('trackerItem:' + JSON.stringify(trackerItem))
      if (trackerItem != null) {
        setTrackerItems([...trackerItems, trackerItem])
        setItemsForSelectedDate([...itemsForSelectedDate, trackerItem])
        let totalCarbs = 0

        itemsForSelectedDate.map((trackerItem: TrackerItemType) => {
          totalCarbs += trackerItem.carbAmt
        })

        setTotalCarbs(totalCarbs)

        type AddItem = {
          foodFactsId: number
          consumptionDate: string
          userId: string | null
        }
        const addedItems: AddItem[] = []

        addedItems.push({
          foodFactsId: trackerItem.foodFactsId,
          consumptionDate: formatDateToYYYYMMDD(trackerItem.consumptionDate),
          userId: userId,
        })
        const dayToUpdate = formatDateToYYYYMMDD(selectedDate)

        saveConsumptionLogs(trackerItem, addedItems, dayToUpdate, false, true)
      }
    }
  }

  const favouriteFoodItem = () => {
    // get the food facts id for updating
    console.log('descriptionGI' + descriptionGI)
    const matchingFoodFact = foodData.find(
      (item) => item.foodName === descriptionGI
    )
    console.log('matchingFoodFact:' + JSON.stringify(matchingFoodFact))
    type FavouriteFood = { foodFactsId: number; isFavourite: boolean }
    const favouriteFoods: FavouriteFood[] = []

    favouriteFoods.push({
      foodFactsId: Number(matchingFoodFact?.foodFactsId),
      isFavourite: !itemIsFavourite,
    })
    setItemIsFavourite(!itemIsFavourite)

    saveFavouriteFoods(favouriteFoods, userId)
  }

  return (
    <TouchableOpacity onPress={addTrackerItem}>
      <View style={dynamicStyles.listItemContainerStyle}>
        <Text style={styles.description}>{descriptionGI}</Text>
        <TouchableOpacity onPress={favouriteFoodItem}>
          <FontAwesome5
            name="heart"
            size={35}
            color="#2196F3"
            solid={itemIsFavourite ? true : false}
          />
        </TouchableOpacity>
        <View style={[styles.box, { backgroundColor: carbBackgroundColor }]}>
          <Text style={styles.text}>{carbAmt}</Text>
        </View>
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
  box: {
    width: 48,
    height: 48,
  },
  text: {
    color: 'rgba(201, 189, 187, 1)',
    fontSize: 30,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '200',
  },
})
