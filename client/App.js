import React, { useState, useEffect } from 'react'

import { TrackerProvider } from './state/TrackerContext'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import BottomTabNavigator from './screens/BottomTabNavigator'
import SplashScreen from 'react-native-splash-screen'
import OnboardingDeck from './onboarding/OnboardingDeck'
import LoadingScreen from './onboarding/LoadingScreen'
import { ThemeProvider } from './state/ThemeContext'

const Stack = createStackNavigator()

export default function App() {
  const [trackerItems, setTrackerItems] = useState([])
  const [totalCarbs, setTotalCarbs] = useState(0)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [itemsForSelectedDate, setItemsForSelectedDate] = useState([])
  const [foodData, setFoodData] = useState()
  const [searchFoodList, setSearchFoodList] = useState()
  const [favFoodList, setFavFoodList] = useState()

  const getTotalCarbsForSpecificDay = () => {
    let carbsForDayAmt = 0

    trackerItems.map((item) => {
      const itemDate = new Date(item.consumptionDate)

      if (
        itemDate.getFullYear() === selectedDate.getFullYear() &&
        itemDate.getMonth() === selectedDate.getMonth() &&
        itemDate.getDate() === selectedDate.getDate()
      ) {
        carbsForDayAmt = carbsForDayAmt + item.carbAmt
      }
    })
    setTotalCarbs(carbsForDayAmt)
    return carbsForDayAmt
  }

  const handleNextDay = () => {
    setSelectedDate(
      (prevDate) => new Date(prevDate.setDate(prevDate.getDate() + 1))
    )
    getTotalCarbsForSpecificDay()
  }

  const handlePrevDay = () => {
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
    selectedDate,
    setSelectedDate,
    itemsForSelectedDate,
    setItemsForSelectedDate,
    handlePrevDay,
    handleNextDay,
    foodData,
    setFoodData,
    searchFoodList,
    setSearchFoodList,
    favFoodList,
    setFavFoodList,
  }

  useEffect(() => {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide()
  }, [])

  return (
    <ThemeProvider>
      <TrackerProvider value={value}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="OnboardingDeck"
            screenOptions={{ headerShown: false }}
          >
            {/* <Stack.Screen name="Login" component={LoginPage} /> */}
            <Stack.Screen name="OnboardingDeck" component={OnboardingDeck} />
            <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
            <Stack.Screen name="MainApp" component={BottomTabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </TrackerProvider>
    </ThemeProvider>
  )
}
