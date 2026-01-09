import React, { useEffect, useContext, useState } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Alert,
  Platform,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import TrackerContext from '../state/TrackerContext'
import UserContext from '../state/UserContext'
import axios from 'axios'
import { ThemeContext } from '../state/ThemeContext'
import FoodContext from '../state/FoodContext'
import { useDispatch, useSelector } from 'react-redux'
import { initSearchFoodList, initFavFoodList } from '../redux/action-creators'
import { PURGE } from 'redux-persist'
import { store } from '../redux/store'
import { getTotalCarbsForSpecificDayGU } from '../components/GlycemicUtils'
import { RootState } from '../redux/store'
import Config from 'react-native-config'
import GradientBackground from '../components/GradientBackground'
import { BioLoader } from '../components/BioLoader'
import { RFPercentage } from 'react-native-responsive-fontsize'

export default function LoadingScreen() {
  const navigation = useNavigation<any>()

  // Contexts
  const { setTrackerItems, setTotalCarbs } = useContext(TrackerContext)
  const { setFoodData } = useContext(FoodContext)
  const { consumptionDate, setUserId } = useContext(UserContext)

  // Redux
  const emailAddress = useSelector((state: RootState) => state.emailAddress)
  const dispatch = useDispatch()

  const { theme } = useContext(ThemeContext)!
  const styles = getStyles(theme)

  const [statusText, setStatusText] = useState('Connecting to server...')

  useEffect(() => {
    const fetchDashboardData = async () => {
      console.log(
        `[Loading] Fetching for: ${emailAddress} at ${Config.GRAPHQL_URL}`
      )

      // Purge to prevent stale state conflicts
      store.dispatch({ type: PURGE, key: 'root', result: () => null })

      const getUserDashboardData = async () => {
        try {
          setStatusText('Syncing profile data...')

          const response = await axios({
            url: Config.GRAPHQL_URL,
            method: 'post',
            data: {
              query: `
              query {
                getUserDashboardData(
                  userDashboardInput: {
                    emailAddress: "${emailAddress}",
                    consumptionDate: "${consumptionDate}"
                  }
                ) {
                  user {
                    userId: user_id
                    userName: user_name
                    lastLoginDate: last_login_date
                  }
                  foodFacts {
                    foodFactsId: food_facts_id
                    foodName: food_name
                    publicFoodKey: public_food_key
                    calcium
                    carbohydrates
                    classification
                    energy
                    fatTotal: fat_total
                    iodine
                    magnesium
                    potassium
                    protein
                    saturatedFat: saturated_fat
                    sodium
                    totalDietaryFibre: total_dietary_fibre
                    totalSugars: total_sugars
                    isFavourite
                  }
                  consumptionLogWithFoodFacts {
                    consumption_log_id
                    consumption_date
                    food_facts_id
                    food_name
                    public_food_key
                    carbohydrates
                    energy
                    fat_total
                    protein
                    sodium
                    total_dietary_fibre
                    total_sugars
                    default_fl
                    portion_count
                  }
                }
              }
            `,
            },
          })

          if (response.data.errors) {
            console.error('GraphQL Errors:', response.data.errors)
            return false
          }

          setStatusText('Processing database...')
          const data = response.data.data.getUserDashboardData
          const foodFacts = data.foodFacts

          // Process Food Facts & Colors
          const processedFoodData = foodFacts.map((item: any) => ({
            ...item,
            carbBackgroundColor:
              item.carbohydrates > 22
                ? theme.badBackground
                : item.carbohydrates > 11
                ? theme.middlingBackground
                : theme.tableBackground,
            carbohydrates: Math.round(item.carbohydrates),
          }))
          setFoodData(processedFoodData)

          // Redux Lists
          const searchFoodList = processedFoodData.map((item: any) => ({
            foodName: item.foodName,
            foodFactsId: item.foodFactsId,
            publicFoodKey: item.publicFoodKey,
            isFavourite: item.isFavourite,
            carbBackgroundColor: item.carbBackgroundColor,
            carbohydrates: item.carbohydrates,
          }))
          dispatch(initSearchFoodList(searchFoodList))

          const favFoodList = processedFoodData.filter(
            (item: any) => item.isFavourite
          )
          dispatch(initFavFoodList(favFoodList))

          // User ID
          setUserId(parseInt(data.user.userId, 10))

          // Tracker Logs
          const consumptionLog = data.consumptionLogWithFoodFacts
          const favSet = new Set(favFoodList.map((f: any) => f.foodName))

          if (Array.isArray(consumptionLog)) {
            const newTrackerItems = consumptionLog.map((item: any) => ({
              id: item.consumption_log_id.toString(),
              foodFactsId: item.food_facts_id,
              description: item.food_name,
              carbAmt: item.carbohydrates,
              fiberAmt: item.total_dietary_fibre,
              proteinAmt: item.protein,
              fatAmt: item.fat_total,
              energyAmt: item.energy,
              sugarsAmt: item.total_sugars,
              sodiumAmt: item.sodium,
              carbBackgroundColor:
                item.carbohydrates > 22
                  ? theme.badBackground
                  : item.carbohydrates > 11
                  ? theme.middlingBackground
                  : theme.tableBackground,
              portionCount: item.portion_count,
              defaultFl: item.default_fl,
              consumptionDate: new Date(parseInt(item.consumption_date, 10)),
              isFavourite: favSet.has(item.food_name),
            }))

            setTrackerItems(newTrackerItems)
            getTotalCarbsForSpecificDayGU(
              newTrackerItems,
              new Date(),
              setTotalCarbs
            )
          }
          return true
        } catch (error: any) {
          console.error('Error fetching data:', error)
          return false
        }
      }

      const returnSuccess = await getUserDashboardData()

      if (returnSuccess) {
        setStatusText('Ready!')
        setTimeout(() => navigation.navigate('MainApp'), 500)
      } else {
        Alert.alert('Connection Error', 'Cannot reach the metabolic server.', [
          { text: 'Retry', onPress: () => fetchDashboardData() },
        ])
      }
    }

    setTimeout(() => fetchDashboardData(), 100)
  }, [navigation])

  return (
    <GradientBackground>
      <View style={styles.container}>
        <View style={{ marginBottom: 40 }}>
          <BioLoader />
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.titleText}>SYNCING</Text>
          <Text style={styles.statusText}>{statusText}</Text>
        </View>
      </View>
    </GradientBackground>
  )
}

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    titleText: {
      color: theme.buttonText,
      fontSize: RFPercentage(2.5),
      fontWeight: '900',
      letterSpacing: 4,
      marginBottom: 10,
    },
    statusText: {
      color: theme.buttonText,
      opacity: 0.6,
      fontSize: RFPercentage(1.8),
      fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    },
  })
