import React, { useState, useEffect, useMemo } from 'react'

import { TrackerProvider } from './state/TrackerContext'
import { TimeProvider } from './state/TimeContext'
// import { FavFoodProvider } from './state/FavFoodContext'
// import { SearchFoodProvider } from './state/SearchFoodContext'
import { FoodProvider } from './state/FoodContext'
import { LogBox, Text } from 'react-native'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store'

import SplashScreen from 'react-native-splash-screen'
import { ThemeProvider } from './state/ThemeContext'
import CentralNavigation from './components/CentralNavigation'

export default function App() {
  console.log('App is rendering')
  const [trackerItems, setTrackerItems] = useState([])
  const [totalCarbs, setTotalCarbs] = useState(0)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [itemsForSelectedDate, setItemsForSelectedDate] = useState([])
  const [foodData, setFoodData] = useState()
  // const [searchFoodList, setSearchFoodList] = useState()
  // const [favFoodList, setFavFoodList] = useState()
  // const hasSeenIntro = useSelector((state: State) => state.hasSeenIntro)

  const trackerProviderValue = {
    trackerItems,
    setTrackerItems,
    totalCarbs,
    setTotalCarbs,
  }

  LogBox.ignoreLogs(['Excessive number of pending callbacks'])
  LogBox.ignoreLogs(['Require cycle:'])

  // const favFoodProviderValue = useMemo(
  //   () => ({
  //     favFoodList,
  //     setFavFoodList,
  //   }),
  //   [favFoodList]
  // )

  // const searchFoodProviderValue = useMemo(
  //   () => ({
  //     searchFoodList,
  //     setSearchFoodList,
  //   }),
  //   [searchFoodList]
  // )

  const foodProviderValue = useMemo(
    () => ({
      foodData,
      setFoodData,
    }),
    [foodData]
  )

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
    console.log('handleNextDay has been called')
    setSelectedDate(
      (prevDate) => new Date(prevDate.setDate(prevDate.getDate() + 1))
    )
    getTotalCarbsForSpecificDay()
  }

  const handlePrevDay = () => {
    console.log('handlePrevDay has been called')
    setSelectedDate(
      (prevDate) => new Date(prevDate.setDate(prevDate.getDate() - 1))
    )
    getTotalCarbsForSpecificDay()
  }

  const timeProviderValue = {
    selectedDate,
    setSelectedDate,
    itemsForSelectedDate,
    setItemsForSelectedDate,
    handlePrevDay,
    handleNextDay,
  }

  useEffect(() => {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide()
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <ThemeProvider>
          <TrackerProvider value={trackerProviderValue}>
            <TimeProvider value={timeProviderValue}>
              <FoodProvider value={foodProviderValue}>
                <CentralNavigation />
              </FoodProvider>
            </TimeProvider>
          </TrackerProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}
