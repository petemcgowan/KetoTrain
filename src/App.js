import React, { useState, useMemo, useContext, useEffect } from 'react'
import { StyleSheet, Dimensions, SafeAreaView, View, Text } from 'react-native'

// import {ApolloProvider} from "@apollo/react-hooks";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useQuery,
} from '@apollo/client'
import type { Node } from 'react'

import SearchScreen from './screens/SearchScreen'
import KetoTrackerScreen from './screens/KetoTrackerScreen'
import KetoLimitScreen from './screens/KetoLimitScreen'
import HelpScreen from './screens/HelpScreen'

// import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";
import usdaNutrition from './data/usdaNutrition.json'
import GlycemicContext, { GlycemicProvider } from './state/GlycemicContext'
import TrackerContext, { TrackerProvider } from './state/TrackerContext'
// import {FontAwesome} from '@expo/vector-icons';
// import {FontAwesomeIcon} from '@fortawesome/free-solid-svg-icons';

import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ThemeContextProvider } from './ThemeContextProvider'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import SplashScreen from 'react-native-splash-screen'

const { width, height } = Dimensions.get('screen')
const APP_WIDTH = width
const APP_HEIGHT = height

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // primary: "rgb(255, 45, 85)",
    // background: "rgb(34, 34, 34)",
    background: 'black',
    notification: 'blue',
  },
}
const Tab = createBottomTabNavigator()

function AppTabs() {
  return (
    <Tab.Navigator
      // style={styles.container}
      screenOptions={{
        cardStyle: {
          backgroundColor: 'black',
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Food Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="search" size={36} color="orange" />
          ),
          headerTitleStyle: {
            color: 'rgb(124, 131, 134)', // "#fff",
            fontSize: 44,
            fontWeight: '200',
          },
          headerStyle: {
            backgroundColor: '#1A0546', // "rgb(69,55,73)", // // "rgba(138, 149, 143, 1)", // "#f4511e",
          },
          tabBarItemStyle: {
            backgroundColor: 'rgba(59, 73, 55, 1)', // "#1b1344",
            // backgroundColor: "#ff15",
          },
        }}
      />
      <Tab.Screen
        name="Keto Tracker"
        component={KetoTrackerScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="utensils" size={36} color="orange" />
          ),
          tabBarBadge: trackerItems.length,
          headerTitleStyle: {
            color: 'rgb(124, 131, 134)', // "#fff",
            fontSize: 44,
            fontWeight: '200',
          },
          // headerTintColor: {
          //   color: "#fff",
          // },
          headerStyle: {
            backgroundColor: '#350244', //  "rgb(69,55,73)", // // "rgba(138, 149, 143, 1)", // "#f4511e",
          },
          tabBarItemStyle: {
            backgroundColor: 'rgba(59, 73, 55, 1)', //"#1b1344",
            // backgroundColor: "#1344",
          },
          tabBarBadgeStyle: {
            backgroundColor: '#453749', // rgb(69,55,73)  (comp to dark green)
            color: '#BBBccc',
            fontSize: 17,
          },
        }}
      />
      <Tab.Screen
        name="Keto Limit"
        component={KetoLimitScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="ban" size={36} color="orange" />
          ),
          tabBarBadge: totalCarbs,
          headerStyle: {
            opacity: 0.9,
            backgroundColor: 'aqua', // "rgb(69,55,73)", // // "rgba(138, 149, 143, 1)", // "#f4511e",
          },
          headerTitleStyle: {
            color: 'rgb(124, 131, 134)', // "#fff",
            fontSize: 44,
            fontWeight: '200',
          },
          tabBarItemStyle: {
            backgroundColor: 'rgba(59, 73, 55, 1)', //"#1b1344",
            color: '#BBBccc',
          },
          tabBarBadgeStyle: {
            backgroundColor: '#2196F3', // rgb(69,55,73)  (comp to dark green)

            color: '#BBBccc',
            fontSize: 17,
          },
        }}
      />
      <Tab.Screen
        name="Learn 🧐"
        component={HelpScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="book" size={36} color="orange" />
          ),
          headerTitle: {
            paddingHorizontal: 20,
            paddingBottom: 20,
            padding: 10,
          },
          // headerTitleContainerStyle: {
          //   paddingHorizontal: 20,
          //   paddingBottom: 20,
          //   // marginBottom: 5,
          // },
          headerTitleStyle: {
            color: 'rgb(124, 131, 134)', // "#fff",
            fontSize: 44,
            fontWeight: '200',
          },
          headerStyle: {
            backgroundColor: '#5C6500', // "rgb(69,55,73)", // // "rgba(138, 149, 143, 1)", // "#f4511e",
          },
          tabBarItemStyle: {
            backgroundColor: 'rgba(59, 73, 55, 1)', // "#1b1344",
          },
        }}
      />
    </Tab.Navigator>
  )
}

const GET_ALL_FOOD_NUTRITIONS = gql`
  query {
    foodnutritions {
      foodCode
      description
      fiberAmt
      giAmt
      glAmt
      carbAmt
      protein
      fatAmt
      satFatAmt
      monoFatAmt
      polyFatAmt
      energyAmt
      sugarsAmt
      sodiumAmt
    }
  }
`

// const App: () => Node = () => {
export default function AppGlycemic() {
  const [trackerItems, setTrackerItems] = useState([])
  const [totalCarbs, setTotalCarbs] = useState(0)
  const [totalGILoad, setTotalGILoad] = useState(0)
  // const {trackerItems, totalCarbs} = useContext(TrackerContext);

  // const [graphGlycemicData, setGraphGlycemicData] = useState([]);

  const { loading, error, data } = useQuery(GET_ALL_FOOD_NUTRITIONS)
  // const {loading, error, data} = useQuery(GET_ALL_FOOD_NUTRITIONS);

  const [glycemicData, setGlycemicData] = useState(usdaNutrition) // local copy
  // const [graphGlycemicData, setGraphGlycemicData] = useState(data); // graphql copy which is undefined if it's in a state variable ? 🧐
  console.log('loading:' + JSON.stringify(loading))
  // const [glycemicData, setGlycemicData] = useState(
  //   usdaNutrition.foodNutritions,
  // ); // graphql copy
  // const glycemicData = data.foodnutritions;
  // the memoization is here to prevent is re-rendering needlessly
  const value = useMemo(
    () => ({
      trackerItems,
      setTrackerItems,
      totalCarbs,
      setTotalCarbs,
      totalGILoad,
      setTotalGILoad,
    }),
    [trackerItems, totalCarbs, totalGILoad]
  )

  const glycemicValue = useMemo(
    () => ({
      glycemicData,
      // data,
      // setGlycemicData,
      // graphGlycemicData,
      // setGraphGlycemicData,
    }),
    [glycemicData, loading]
  )
  console.log('App Render, glycemicData:' + JSON.stringify(glycemicData))

  useEffect(() => {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide()
  }, [])

  return (
    <>
      {!loading && glycemicData && (
        <ThemeContextProvider>
          <View style={{ width: APP_WIDTH, height: APP_HEIGHT }}>
            <GlycemicProvider value={glycemicValue}>
              <TrackerProvider value={value}>
                {/* <NavigationContainer theme={MyTheme} style={styles.container}>
                  <View>
                    <AppTabs style={styles.container} />
                  </View>
                </NavigationContainer> */}
                <NavigationContainer>
                  <Tab.Navigator
                    theme={MyTheme}
                    style={styles.container}
                    screenOptions={{
                      // tabBarIcon: true,
                      // tabBarShowIcon: true,
                      // showIcon: true,
                      // tabBarStyle: [{display: "flex"}, null],
                      cardStyle: {
                        backgroundColor: 'black',
                      },
                      tabBarShowLabel: false,
                      // tabBarShowLabel: true,
                    }}
                  >
                    <Tab.Screen
                      name="Food Search"
                      component={SearchScreen}
                      options={{
                        tabBarIcon: ({ color, size }) => (
                          <FontAwesome5
                            name="search"
                            size={36}
                            color="orange"
                          />
                        ),
                        headerTitleStyle: {
                          color: 'rgb(124, 131, 134)', // "#fff",
                          fontSize: 44,
                          fontWeight: '200',
                        },
                        headerStyle: {
                          backgroundColor: '#1A0546', // "rgb(69,55,73)", // // "rgba(138, 149, 143, 1)", // "#f4511e",
                        },
                        tabBarItemStyle: {
                          backgroundColor: 'rgba(59, 73, 55, 1)', // "#1b1344",
                          // backgroundColor: "#ff15",
                        },
                      }}
                    />
                    <Tab.Screen
                      name="Keto Tracker"
                      component={KetoTrackerScreen}
                      options={{
                        tabBarIcon: ({ color, size }) => (
                          <FontAwesome5
                            name="utensils"
                            size={36}
                            color="orange"
                          />
                        ),
                        tabBarBadge: trackerItems.length,
                        headerTitleStyle: {
                          color: 'rgb(124, 131, 134)', // "#fff",
                          fontSize: 44,
                          fontWeight: '200',
                        },
                        // headerTintColor: {
                        //   color: "#fff",
                        // },
                        headerStyle: {
                          backgroundColor: '#350244', //  "rgb(69,55,73)", // // "rgba(138, 149, 143, 1)", // "#f4511e",
                        },
                        tabBarItemStyle: {
                          backgroundColor: 'rgba(59, 73, 55, 1)', //"#1b1344",
                          // backgroundColor: "#1344",
                        },
                        tabBarBadgeStyle: {
                          backgroundColor: '#453749', // rgb(69,55,73)  (comp to dark green)
                          color: '#BBBccc',
                          fontSize: 17,
                        },
                      }}
                    />
                    <Tab.Screen
                      name="Keto Limit"
                      component={KetoLimitScreen}
                      options={{
                        tabBarIcon: ({ color, size }) => (
                          <FontAwesome5 name="ban" size={36} color="orange" />
                        ),
                        tabBarBadge: totalCarbs,
                        headerStyle: {
                          opacity: 0.9,
                          backgroundColor: 'aqua', // "rgb(69,55,73)", // // "rgba(138, 149, 143, 1)", // "#f4511e",
                        },
                        headerTitleStyle: {
                          color: 'rgb(124, 131, 134)', // "#fff",
                          fontSize: 44,
                          fontWeight: '200',
                        },
                        tabBarItemStyle: {
                          backgroundColor: 'rgba(59, 73, 55, 1)', //"#1b1344",
                          color: '#BBBccc',
                        },
                        tabBarBadgeStyle: {
                          backgroundColor: '#2196F3', // rgb(69,55,73)  (comp to dark green)

                          color: '#BBBccc',
                          fontSize: 17,
                        },
                      }}
                    />
                    <Tab.Screen
                      name="Help"
                      component={HelpScreen}
                      options={{
                        tabBarIcon: ({ color, size }) => (
                          <FontAwesome5 name="book" size={36} color="orange" />
                        ),
                        headerTitle: {
                          paddingHorizontal: 20,
                          paddingBottom: 20,
                          padding: 10,
                        },
                        // headerTitleContainerStyle: {
                        //   paddingHorizontal: 20,
                        //   paddingBottom: 20,
                        //   // marginBottom: 5,
                        // },
                        headerTitleStyle: {
                          color: 'rgb(124, 131, 134)', // "#fff",
                          fontSize: 44,
                          fontWeight: '200',
                        },
                        headerStyle: {
                          backgroundColor: '#5C6500', // "rgb(69,55,73)", // // "rgba(138, 149, 143, 1)", // "#f4511e",
                        },
                        tabBarItemStyle: {
                          backgroundColor: 'rgba(59, 73, 55, 1)', // "#1b1344",
                        },
                      }}
                    />
                  </Tab.Navigator>
                </NavigationContainer>
              </TrackerProvider>
            </GlycemicProvider>
          </View>
        </ThemeContextProvider>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "black",
    // color: "#FFF",
    // fontFamily: "Karla-Light",
  },
})

// export default App;
