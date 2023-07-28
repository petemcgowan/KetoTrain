import React, { useState, memo, useContext, useMemo, useEffect } from 'react'

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
} from './GlycemicUtils'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { ThemeContext } from '../state/ThemeContext'
import { SearchListType } from '../types/SearchListType'
// import { FoodDataType } from '../types/FoodDataType'

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
    searchFoodList,
    setSearchFoodList,
    foodData,
    setFoodData,
    favFoodList,
    setFavFoodList,
  } = useContext<TrackerContextType>(TrackerContext)

  const { userId } = useContext<UserContextProps>(UserContext)
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useContext was used outside of the theme provider')
  }
  const { theme } = context
  const styles = getStyles(theme)

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        listItemContainerStyle: {
          borderColor: theme.tableLineColor,
          borderWidth: 1,
          flexDirection: 'row',
          backgroundColor: carbBackgroundColor,
          alignItems: 'center',
        },
      }),
    [carbBackgroundColor, favFoodList]
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
          userId: number | null
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

  useEffect(() => {
    // console.log(
    //   'useEffect(GlycemicItem), favFoodList:' + JSON.stringify(favFoodList)
    // )
  }, [favFoodList])

  const favouriteFoodItem = () => {
    // get the food facts id for updating
    const matchingFoodFact = foodData.find(
      (item) => item.foodName === descriptionGI
    )
    console.log(
      'favouriteFoodItem, matchingFoodFact:' + JSON.stringify(matchingFoodFact)
    )
    console.log(
      'favouriteFoodItem, itemIsFavourite:' + JSON.stringify(itemIsFavourite)
    )
    console.log('favouriteFoodItem, favFoodList:' + JSON.stringify(favFoodList))
    type FavouriteFood = { foodFactsId: number; isFavourite: boolean }
    const favouriteFoods: FavouriteFood[] = []

    favouriteFoods.push({
      foodFactsId: Number(matchingFoodFact?.foodFactsId),
      isFavourite: !itemIsFavourite,
    })
    setItemIsFavourite(!itemIsFavourite)
    saveFavouriteFoods(favouriteFoods, userId)
    if (itemIsFavourite) {
      // it IS a favourite, so we're unfavouriting
      // remove from the local fav food list
      console.log(
        'REMOVING favourite, matchingFoodFact:' +
          JSON.stringify(matchingFoodFact)
      )

      const newFavFoods = favFoodList.filter(({ foodName }) => {
        return foodName !== matchingFoodFact?.foodName
      })
      setFavFoodList(newFavFoods)
      const updatedFoodData = searchFoodList.map((item) =>
        item.foodName === descriptionGI
          ? { ...item, isFavourite: !item.isFavourite }
          : item
      )
      setSearchFoodList(updatedFoodData)
    } else {
      // add the local favourite
      console.log(
        'ADDING favourite, matchingFoodFact:' + JSON.stringify(matchingFoodFact)
      )
      if (matchingFoodFact) {
        setFavFoodList((prevFavFoodList) => [
          ...prevFavFoodList,
          { ...matchingFoodFact, isFavourite: true },
        ])

        const updatedFoodData = searchFoodList.map((item) =>
          item.foodName === descriptionGI
            ? { ...item, isFavourite: true }
            : item
        )
        setSearchFoodList(updatedFoodData)
      }
    }
  }

  return (
    <TouchableOpacity onPress={addTrackerItem}>
      <View style={dynamicStyles.listItemContainerStyle}>
        <Text style={styles.tableText}>{descriptionGI}</Text>
        <TouchableOpacity onPress={favouriteFoodItem}>
          <FontAwesome5
            name="heart"
            size={29}
            color={theme.iconFill}
            solid={itemIsFavourite ? true : false}
          />
        </TouchableOpacity>
        <View
          style={[
            styles.carbAmtTableCell,
            { backgroundColor: carbBackgroundColor },
          ]}
        >
          <Text style={styles.carbAmtTableText}>{carbAmt}</Text>
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

const getStyles = (theme) =>
  StyleSheet.create({
    tableText: {
      width: width * 0.7,
      textAlign: 'right',
      borderRightColor: theme.tableLineColor,
      borderRightWidth: 1,
      fontSize: 26,
      fontWeight: '300',
      color: theme.buttonText,
    },
    carbAmtTableCell: {
      width: 48,
      height: 48,
      backgroundColor: theme.tableBackground,
      justifyContent: 'center',
      alignItems: 'center',
    },
    carbAmtTableText: {
      color: theme.buttonText,
      fontSize: 26,
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: '200',
    },
  })
