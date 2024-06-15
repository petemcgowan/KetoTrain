import React, { useState, useEffect, useMemo } from 'react'

import { TrackerProvider } from './state/TrackerContext'
import { FoodProvider } from './state/FoodContext'
import { LogBox, Text } from 'react-native'
import { TrackerItemType } from '../types/TrackerItemType'
import { ApolloProvider } from '@apollo/client'
import client from './components/apolloClient'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store'

import SplashScreen from 'react-native-splash-screen'
import { ThemeProvider } from './state/ThemeContext'
import CentralNavigation from './components/CentralNavigation'
import { useNavigationState } from '@react-navigation/native'
import * as Sentry from '@sentry/react-native'

function App() {
  console.info('App is rendering')
  const [trackerItems, setTrackerItems] = useState([])
  const [totalCarbs, setTotalCarbs] = useState(0)
  const [foodData, setFoodData] = useState()

  const trackerProviderValue = {
    trackerItems,
    setTrackerItems,
    totalCarbs,
    setTotalCarbs,
  }

  const foodProviderValue = useMemo(
    () => ({
      foodData,
      setFoodData,
    }),
    [foodData]
  )

  Sentry.init({
    dsn: 'https://dace27d747c0279d2669064bca3ad664@o4507403879317504.ingest.us.sentry.io/4507403881611264',
    // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
    tracesSampleRate: 1.0,
    _experiments: {
      // profilesSampleRate is relative to tracesSampleRate. 1 is 100%
      profilesSampleRate: 1.0,
    },
  })

  // LogBox.ignoreLogs(['Excessive number of pending callbacks'])
  LogBox.ignoreLogs(['Require cycle:'])
  LogBox.ignoreLogs([
    'Sending `onAnimatedValueUpdate` with no listeners registered.',
  ])

  useEffect(() => {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide()
  }, [])

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
          <ThemeProvider>
            <TrackerProvider value={trackerProviderValue}>
              <FoodProvider value={foodProviderValue}>
                <CentralNavigation />
              </FoodProvider>
            </TrackerProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  )
}

export default Sentry.wrap(App)
