import React, { useState, useEffect, useMemo } from 'react'
import { View, Text, LogBox } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import RNBootSplash from 'react-native-bootsplash'
import * as Sentry from '@sentry/react-native'

// Redux
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store'

// Contexts
import { ThemeProvider } from './state/ThemeContext'
import { UserProvider } from './state/UserContext'
import { TrackerProvider } from './state/TrackerContext'
import { FoodProvider } from './state/FoodContext'

// Apollo
import { ApolloProvider } from '@apollo/client/react'
import client from './components/apolloClient'

// Navigation
import CentralNavigation from './components/CentralNavigation'

// Initialize Sentry
Sentry.init({
  dsn: 'https://dace27d747c0279d2669064bca3ad664@o4507403879317504.ingest.us.sentry.io/4507403881611264',
  tracesSampleRate: 1.0,
  _experiments: {
    profilesSampleRate: 1.0,
  },
})

function App() {
  const [trackerItems, setTrackerItems] = useState([])
  const [totalCarbs, setTotalCarbs] = useState(0)
  const [foodData, setFoodData] = useState()

  //  Provider Values
  const trackerProviderValue = useMemo(
    () => ({
      trackerItems,
      setTrackerItems,
      totalCarbs,
      setTotalCarbs,
    }),
    [trackerItems, totalCarbs]
  )

  const foodProviderValue = useMemo(
    () => ({
      foodData,
      setFoodData,
    }),
    [foodData]
  )

  useEffect(() => {
    LogBox.ignoreLogs([
      'Require cycle:',
      'Excessive number of pending callbacks',
    ])
    const init = async () => {
      // …do multiple sync or async tasks
    }

    init().finally(async () => {
      await RNBootSplash.hide({ fade: true })
      console.log('BootSplash has been hidden successfully')
    })
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ApolloProvider client={client}>
          <Provider store={store}>
            <PersistGate
              loading={
                <View>
                  <Text>Loading State...</Text>
                </View>
              }
              persistor={persistor}
            >
              <ThemeProvider>
                <UserProvider>
                  <TrackerProvider value={trackerProviderValue}>
                    <FoodProvider value={foodProviderValue}>
                      <CentralNavigation />
                    </FoodProvider>
                  </TrackerProvider>
                </UserProvider>
              </ThemeProvider>
            </PersistGate>
          </Provider>
        </ApolloProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

export default Sentry.wrap(App)
