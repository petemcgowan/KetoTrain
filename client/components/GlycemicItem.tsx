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
import { TrackerContextType } from '../types/TrackerContextType'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { ThemeContext } from '../state/ThemeContext'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { favouriteFoodItem } from './GlycemicUtils'
import { FoodContextType } from '../types/FoodContextType'
import FoodContext from '../state/FoodContext'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/reducers'
import { updateFavFoodList } from '../redux/action-creators'

const { width } = Dimensions.get('screen')

interface GlycemicItemProps {
  descriptionGI: string
  carbAmt: number
  carbBackgroundColor: string
}

const GlycemicItem: React.FC<GlycemicItemProps> = ({
  descriptionGI,
  carbAmt,
  carbBackgroundColor,
}) => {
  const { trackerItems, setTrackerItems, setTotalCarbs } =
    useContext<TrackerContextType>(TrackerContext)
  const dispatch = useDispatch()

  const { foodData, setFoodData } = useContext<FoodContextType>(FoodContext)
  const favFoodList = useSelector((state: RootState) => state.favFoodList) || []
  const itemIsAlreadyFavourite = favFoodList.some(
    (item) => item.foodName === descriptionGI
  )
  const [itemIsFavourite, setItemIsFavourite] = useState(itemIsAlreadyFavourite)

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
          backgroundColor:
            carbAmt > 22
              ? theme.badBackground
              : carbAmt > 11
              ? theme.middlingBackground
              : theme.tableBackground,
          alignItems: 'center',
        },
      }),
    [carbBackgroundColor, favFoodList]
  )

  return (
    <View style={dynamicStyles.foodRowContainer}>
      {/* <TouchableOpacity onPress={addTrackerItem}> */}
      <View style={styles.foodContainer}>
        <Text style={styles.foodText}>{descriptionGI}</Text>
      </View>
      {/* </TouchableOpacity> */}
      <View
        style={[
          styles.carbAmtContainer,
          {
            backgroundColor:
              carbAmt > 22
                ? theme.badBackground
                : carbAmt > 11
                ? theme.middlingBackground
                : theme.tableBackground,
          },
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
              foodData,
              favFoodList,
              updateFavFoodList,
              userId,
              trackerItems,
              setTrackerItems,
              dispatch
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
      fontSize: RFPercentage(3.5),
      fontWeight: '300',
      marginLeft: 3,
      color: theme.buttonText,
    },
    carbAmtText: {
      color: 'white',
      fontSize: RFPercentage(3.5),
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: '300',
    },
  })
