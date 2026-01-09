import React, { useState, useContext, useMemo, useEffect } from 'react'
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
import FontAwesome6 from '@react-native-vector-icons/fontawesome6'
import { ThemeContext } from '../state/ThemeContext'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { favouriteFoodItem } from './GlycemicUtils'
import { FoodContextType } from '../types/FoodContextType'
import FoodContext from '../state/FoodContext'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { updateFavFoodList } from '../redux/action-creators'

const { width, height } = Dimensions.get('window')

export const ROW_HEIGHT = Math.round(height * 0.07)
export const ROW_MARGIN = 2
export const TOTAL_ITEM_HEIGHT = ROW_HEIGHT + ROW_MARGIN

interface GlycemicItemProps {
  descriptionGI: string
  carbAmt: number
  carbBackgroundColor: string
  isFavourite: boolean
  onPressDetail: () => void
}

const GlycemicItem: React.FC<GlycemicItemProps> = ({
  descriptionGI,
  carbAmt,
  carbBackgroundColor,
  isFavourite,
  onPressDetail,
}) => {
  const { trackerItems, setTrackerItems } =
    useContext<TrackerContextType>(TrackerContext)
  const dispatch = useDispatch()
  const { foodData } = useContext<FoodContextType>(FoodContext)

  const [localIsFavourite, setLocalIsFavourite] = useState(isFavourite)

  useEffect(() => {
    setLocalIsFavourite(isFavourite)
  }, [isFavourite])

  const favFoodList = useSelector((state: RootState) => state.favFoodList)
  const { userId } = useContext<UserContextProps>(UserContext)
  const context = useContext(ThemeContext)
  if (!context) throw new Error('No Theme Context')
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
          height: ROW_HEIGHT,
          marginBottom: ROW_MARGIN,
          paddingVertical: 0, // Ensure no padding interferes with fixed height
        },
      }),
    [carbBackgroundColor, carbAmt, theme]
  )

  return (
    <View style={dynamicStyles.foodRowContainer}>
      {/* Left Clickable Area */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
          height: '100%',
        }}
        onPress={onPressDetail}
      >
        <View style={styles.foodContainer}>
          <Text style={styles.foodText} numberOfLines={1} ellipsizeMode="tail">
            {descriptionGI}
          </Text>
        </View>
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
      </TouchableOpacity>

      <View style={styles.verticalDivider} />

      {/* Right Fav Button */}
      <View style={styles.favIconContainer}>
        <TouchableOpacity
          onPress={() => {
            favouriteFoodItem(
              descriptionGI,
              localIsFavourite,
              setLocalIsFavourite,
              foodData,
              favFoodList,
              updateFavFoodList,
              userId,
              trackerItems,
              setTrackerItems,
              dispatch
            )
          }}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={styles.favTouchArea}
        >
          <FontAwesome6
            name="heart"
            size={RFPercentage(2.5)}
            color={theme.iconFill}
            iconStyle={localIsFavourite ? 'solid' : 'regular'}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

function arePropsEqual(prevProps: any, nextProps: any) {
  return (
    prevProps.descriptionGI === nextProps.descriptionGI &&
    prevProps.isFavourite === nextProps.isFavourite &&
    prevProps.carbBackgroundColor === nextProps.carbBackgroundColor
  )
}
export default React.memo(GlycemicItem, arePropsEqual)

const getStyles = (theme: any) =>
  StyleSheet.create({
    foodContainer: {
      flex: 1,
      paddingLeft: 15,
      justifyContent: 'center',
    },
    carbAmtContainer: {
      width: width * 0.12,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    verticalDivider: {
      width: 1,
      height: '60%',
      backgroundColor: theme.tableLineColor,
      opacity: 0.5,
    },
    favIconContainer: {
      width: width * 0.12,
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
    favTouchArea: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    foodText: {
      fontSize: RFPercentage(2.0),
      fontWeight: '400',
      color: theme.buttonText,
    },
    carbAmtText: {
      color: 'white',
      fontSize: RFPercentage(2.2),
      textAlign: 'center',
      fontWeight: 'bold',
    },
  })
