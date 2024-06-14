import React, { useEffect, useContext } from 'react'
import { View, StyleSheet, Text, Dimensions, Alert } from 'react-native'
import LottieView from 'lottie-react-native'
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
import { RootState } from '../redux/reducers/index'

const { height, width } = Dimensions.get('screen')

export default function LoadingScreen() {
  const navigation = useNavigation()
  const { setTrackerItems, trackerItems, setTotalCarbs, totalCarbs } =
    useContext(TrackerContext)
  const { setFoodData } = useContext(FoodContext)
  const { /*emailAddress,*/ consumptionDate, setUserId } =
    useContext(UserContext)
  const emailAddress = useSelector((state: RootState) => state.emailAddress)

  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useContext was used outside of the theme provider')
  }
  const { theme } = context
  const styles = getStyles(theme)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchDashboardData = async () => {
      // if (emailAddress) {
      console.log(`User ID is ${emailAddress}`)
      // }
      console.log(`Consumption date is ${consumptionDate}`)

      // ************
      // Redux store dispatch purge
      store.dispatch({
        type: PURGE,
        key: 'root',
        result: () => null,
      })

      const getUserDashboardData = async () => {
        try {
          const userDashboardDataResponse = await axios({
            // url: 'http://localhost:4001/keto-graphql',
            url: 'http://ec2-52-23-111-225.compute-1.amazonaws.com:4001/keto-graphql',
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

          // augment the return  with calculated values
          const foodFacts =
            userDashboardDataResponse.data.data.getUserDashboardData.foodFacts
          const processedFoodData = foodFacts.map((item) => ({
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

          const searchFoodList = processedFoodData.map((item) => ({
            foodName: item.foodName,
            foodFactsId: item.foodFactsId,
            publicFoodKey: item.publicFoodKey,
            isFavourite: item.isFavourite,
            carbBackgroundColor: item.carbBackgroundColor,
            carbohydrates: item.carbohydrates,
          }))

          dispatch(initSearchFoodList(searchFoodList))

          const favFoodList = processedFoodData.filter(
            (item) => item.isFavourite
          )
          dispatch(initFavFoodList(favFoodList))
          // Create favourites view array

          setUserId(
            parseInt(
              userDashboardDataResponse.data.data.getUserDashboardData.user
                .userId,
              10
            )
          )
          const consumptionLogWithFoodFacts =
            userDashboardDataResponse.data.data.getUserDashboardData
              .consumptionLogWithFoodFacts

          // add isFavourite values to the tracker items
          const updatedConsumptionLogWithFoodFacts =
            consumptionLogWithFoodFacts.map((consumptionItem) => {
              const correspondingSearchItem = searchFoodList.find(
                (searchItem) =>
                  searchItem.foodName === consumptionItem.food_name
              )

              if (correspondingSearchItem) {
                return {
                  ...consumptionItem,
                  isFavourite: correspondingSearchItem.isFavourite,
                }
              }

              return {
                ...consumptionItem,
                isFavourite: false,
              }
            })

          // set Tracker items (for tracker screen)
          if (Array.isArray(updatedConsumptionLogWithFoodFacts)) {
            setTrackerItems(
              updatedConsumptionLogWithFoodFacts.map((item) => {
                return {
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
                  consumptionDate: new Date(
                    parseInt(item.consumption_date, 10)
                  ),
                  isFavourite: item.isFavourite,
                }
              })
            )

            getTotalCarbsForSpecificDayGU(
              trackerItems,
              new Date(),
              setTotalCarbs
            )
          }
        } catch (error) {
          console.error('Error fetching food facts:', error)
          console.log(
            'Error details:',
            error.config,
            error.request,
            error.message,
            error.response
          )
          return false
        }
        return true
      }

      const returnSuccess = await getUserDashboardData()
      if (returnSuccess) {
        const timeoutId = setTimeout(() => {
          console.log('about to navigate to MainApp')
          navigation.navigate('MainApp')
        }, 1000) // wait

        // cleanup will be executed when the component unmounts
        return () => clearTimeout(timeoutId)
      } else {
        Alert.alert(
          'Oops',
          'Cannot connect to the server!  Try again but contact support if it persists!'
        )
        navigation.navigate('OnboardingDeck')
      }
    }

    fetchDashboardData()
  }, [navigation])

  return (
    <View style={styles.container}>
      <View style={styles.lottieContainer}>
        <LottieView
          ref={(animation) => {
            this.animation = animation
          }}
          source={require('../assets/lottie/97930-loading.json')}
          autoPlay
          loop
          onAnimationFinish={() => {}}
          style={{ width: width * 0.6, height: height * 0.3 }}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.settingUpText}>Setting up your data...</Text>
      </View>
    </View>
  )
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: theme.viewBackground,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textContainer: {
      height: 80,
      backgroundColor: theme.buttonBackground,
      justifyContent: 'center',
      paddingHorizontal: 20,
      borderRadius: 80,
    },
    settingUpText: {
      color: theme.buttonText,
      fontSize: 20,
      fontWeight: '500',
      textAlign: 'center',
    },
    lottieContainer: {
      height: 200,
    },
  })
