import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { TrackerProvider } from './state/TrackerContext'

import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginPage from './screens/LoginPage'
import BottomTabNavigator from './screens/BottomTabNavigator'
import SplashScreen from 'react-native-splash-screen'
import OnboardingDeck from './onboarding/OnboardingDeck'

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'black',
    notification: 'blue',
  },
}
const Stack = createStackNavigator()

export default function App() {
  const [trackerItems, setTrackerItems] = useState([])
  const [totalCarbs, setTotalCarbs] = useState(0)
  const [totalGILoad, setTotalGILoad] = useState(0)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [userId, setUserId] = useState(null)
  const [itemsForSelectedDate, setItemsForSelectedDate] = useState([])
  const [foodData, setFoodData] = useState()

  const getTotalCarbsForSpecificDay = () => {
    // const { trackerItems, setTotalCarbs, selectedDate } =
    //   useContext(TrackerContext)
    let carbsForDayAmt = 0

    trackerItems.map((item) => {
      const itemDate = new Date(item.consumptionDate)

      if (
        itemDate.getFullYear() === selectedDate.getFullYear() &&
        itemDate.getMonth() === selectedDate.getMonth() &&
        itemDate.getDate() === selectedDate.getDate()
      ) {
        carbsForDayAmt = carbsForDayAmt + item.carbAmt
        console.log(
          'getTotalCarbsForSpecificDay, carbsForDayAmt:' + carbsForDayAmt
        )
      }
    })
    setTotalCarbs(carbsForDayAmt)
    // setFocused(!focused)
    return carbsForDayAmt
  }

  const handleNextDay = () => {
    console.log('handleNextDay, selectedDate:' + selectedDate.toDateString())
    setSelectedDate(
      (prevDate) => new Date(prevDate.setDate(prevDate.getDate() + 1))
    )
    getTotalCarbsForSpecificDay()
  }

  const handlePrevDay = () => {
    console.log('handlePrevDay, selectedDate:' + selectedDate.toDateString())
    setSelectedDate(
      (prevDate) => new Date(prevDate.setDate(prevDate.getDate() - 1))
    )
    getTotalCarbsForSpecificDay()
  }

  const value = {
    trackerItems,
    setTrackerItems,
    totalCarbs,
    setTotalCarbs,
    totalGILoad,
    setTotalGILoad,
    selectedDate,
    setSelectedDate,
    itemsForSelectedDate,
    setItemsForSelectedDate,
    handlePrevDay,
    handleNextDay,
    foodData,
    setFoodData,
    userId,
  }

  useEffect(() => {
    console.log('App, useEffect')
    const userId = 'peteburquette@gmail.com'
    const consumptionDate = '2023-07-07'
    // TODO Pete: This should be set by the Google login
    setUserId('peteburquette@gmail.com')

    const getFoodFacts = async () => {
      try {
        const foodFactsResponse = await axios({
          url: 'http://localhost:4001/pete-graphql',
          method: 'post',
          data: {
            query: `
              query {
                allFoodFacts(
                  userId: "${userId}",
                ) {
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
                  creationTs: creation_ts
                  lastModifiedTs: last_modified_ts
                  isFavourite
                }
              }
            `,
          },
        })
        console.log(
          'foodFactsResponse.data.data.allFoodFacts:' +
            JSON.stringify(foodFactsResponse.data.data.allFoodFacts)
        )
        setFoodData(foodFactsResponse.data.data.allFoodFacts)
        return foodFactsResponse.data.data.allFoodFacts
      } catch (error) {
        console.error('Error fetching food facts:', error)
      }
    }

    getFoodFacts()

    const getConsumptionLogs = async () => {
      try {
        const consumptionResponse = await axios({
          url: 'http://localhost:4001/pete-graphql',
          method: 'post',
          data: {
            query: `
            query {
              consumptionLogWithFoodFacts(
                consumptioninput: {
                  userId: "${userId}",
                  consumptionDate: "${consumptionDate}"
                }
              ) {
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
              }
            }
            `,
          },
        })

        if (
          consumptionResponse &&
          consumptionResponse.data &&
          consumptionResponse.data.data
        ) {
          const consumptionLogWithFoodFacts =
            consumptionResponse.data.data.consumptionLogWithFoodFacts

          if (Array.isArray(consumptionLogWithFoodFacts)) {
            setTrackerItems(
              consumptionLogWithFoodFacts.map((item) => {
                return {
                  id: item.consumption_log_id.toString(),
                  foodFactsId: item.food_facts_id.toString(),
                  description: item.food_name,
                  carbAmt: item.carbohydrates,
                  giAmt: 30, // Placeholder value as giAmt is not available in the response
                  glAmt: 30, // Placeholder value as glAmt is not available in the response
                  fiberAmt: item.total_dietary_fibre,
                  proteinAmt: item.protein,
                  fatAmt: item.fat_total,
                  energyAmt: item.energy,
                  sugarsAmt: item.total_sugars,
                  sodiumAmt: item.sodium,
                  giBackgroundColor: '#350244', // Placeholder value as giBackgroundColor is not available in the response
                  glBackgroundColor: '#350244', // Placeholder value as glBackgroundColor is not available in the response
                  carbBackgroundColor:
                    item.carbohydrates > 22
                      ? '#1A0546'
                      : item.carbohydrates > 11
                      ? '#5C6500'
                      : '#350244',
                  portionAmount: 0, // Placeholder value as portionAmount is not available in the response
                  consumptionDate: new Date(
                    parseInt(item.consumption_date, 10)
                  ),
                }
              })
            )
          }
        }

        return consumptionResponse.data
      } catch (error) {
        console.error('Error fetching consumption:', error)
      }
    }

    getConsumptionLogs()

    const getUserDashboardData = async () => {
      try {
        const userDashboardDataResponse = await axios({
          url: 'http://localhost:4001/pete-graphql',
          method: 'post',
          data: {
            query: `
              query {
                getUserDashboardData(
                  userId: "${userId}",
                ) {
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
                    creationTs: creation_ts
                    lastModifiedTs: last_modified_ts
                    isFavourite
                  }
                  waterConsumptions {
                    water_consumption_id
                    userId
                    consumptionDate
                    litreAmount
                  }
                  weightLogs {
                    weight_logs_id
                    userId
                    weighInTimestamp
                    kgAmount
                  }
                }
              }
            `,
          },
        })
        // console.log(
        //   'foodFactsResponse.data.data.allFoodFacts:' +
        //     JSON.stringify(userDashboardDataResponse.data.data.allFoodFacts)
        // )
        console.log(
          'foodFactsResponse.data.data:' +
            JSON.stringify(userDashboardDataResponse.data.data)
        )
        // setFoodData(userDashboardDataResponse.data.data.allFoodFacts)
        return userDashboardDataResponse.data.data.allFoodFacts
      } catch (error) {
        console.error('Error fetching food facts:', error)
      }
    }

    getUserDashboardData()
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide()
  }, []) //selectedDate

  return (
    <TrackerProvider value={value}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="OnboardingDeck"
          screenOptions={{ headerShown: false }}
        >
          {/* <Stack.Screen name="Login" component={LoginPage} /> */}
          <Stack.Screen name="OnboardingDeck" component={OnboardingDeck} />
          <Stack.Screen name="MainApp" component={BottomTabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </TrackerProvider>
  )
}
