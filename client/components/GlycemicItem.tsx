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
import { saveConsumptionLogs, formatDateToYYYYMMDD } from './GlycemicUtils'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { ThemeContext } from '../state/ThemeContext'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { favouriteFoodItem } from './GlycemicUtils'

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
        foodRowContainer: {
          borderColor: theme.tableLineColor,
          borderWidth: 1,
          flexDirection: 'row',
          backgroundColor: carbBackgroundColor,
          alignItems: 'center',
          // width: width * 0.7,
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
        isFavourite: matchingFoodFact.isFavourite,
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

  return (
    <TouchableOpacity onPress={addTrackerItem}>
      <View style={dynamicStyles.foodRowContainer}>
        <View style={styles.foodContainer}>
          <Text style={styles.foodText}>{descriptionGI}</Text>
        </View>
        <View
          style={[
            styles.carbAmtContainer,
            { backgroundColor: carbBackgroundColor },
          ]}
        >
          <Text style={styles.carbAmtText}>{carbAmt}</Text>
        </View>
        <View style={styles.favIconContainer}>
          <TouchableOpacity
            onPress={() => {
              favouriteFoodItem(
                descriptionGI,
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
            }}
          >
            <FontAwesome5
              name="heart"
              size={RFPercentage(3.9)}
              color={theme.iconFill}
              style={styles.favIcon}
              solid={itemIsFavourite ? true : false}
            />
          </TouchableOpacity>
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
    foodContainer: {
      width: width * 0.74,
    },
    carbAmtContainer: {
      width: width * 0.13,
      borderLeftColor: theme.tableLineColor,
      borderLeftWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    favIconContainer: {
      borderLeftColor: theme.tableLineColor,
      borderLeftWidth: 1,
      width: width * 0.13,
      justifyContent: 'center',
      alignItems: 'center',
    },
    favIcon: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    foodText: {
      fontSize: RFPercentage(3.3),
      fontWeight: '300',
      marginLeft: 3,
      color: theme.buttonText,
    },
    carbAmtText: {
      color: 'white',
      fontSize: RFPercentage(3.3),
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: '300',
    },
  })
