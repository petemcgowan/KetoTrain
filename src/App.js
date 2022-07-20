import React, {useState, useMemo, useContext} from "react";
import {StyleSheet, SafeAreaView, View, Text} from "react-native";
// import {ApolloProvider} from "@apollo/react-hooks";
// import {
//   ApolloClient,
//   InMemoryCache,
//   ApolloProvider,
//   gql,
//   useQuery,
// } from "@apollo/client";
import type {Node} from "react";

import SearchScreen from "./screens/SearchScreen";
import KetoTrackerScreen from "./screens/KetoTrackerScreen";
import KetoLimitScreen from "./screens/KetoLimitScreen";
import HelpScreen from "./screens/HelpScreen";

import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";

// import {FontAwesome} from '@expo/vector-icons';
// import {FontAwesomeIcon} from '@fortawesome/free-solid-svg-icons';

import {NavigationContainer, DefaultTheme} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import TrackerContext, {TrackerProvider} from "./TrackerContext";
import {ThemeContextProvider} from "./ThemeContextProvider";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // primary: "rgb(255, 45, 85)",
    // background: "rgb(34, 34, 34)",
    background: "black",
    notification: "blue",
  },
};

// const client = new ApolloClient({
//   link: new WebSocketLink({
//     uri: "wss://localhost:4000/graphql",
//     options: {
//       reconnect: true,
//       connectionParams: {
//         headers: {
//           Authorization: "Bearer yourauthtoken",
//         },
//       },
//     },
//   }),
//   cache: new InMemoryCache(),
// });
// const client = new ApolloClient({
//   uri: "http://localhost:4000/graphql",
//   cache: new InMemoryCache(),
// });

const Tab = createBottomTabNavigator();

function AppTabs() {
  const {trackerItems, totalCarbs} = useContext(TrackerContext);

  return (
    <Tab.Navigator
      style={styles.container}
      screenOptions={{
        cardStyle: {
          backgroundColor: "black",
        },
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Food Search"
        component={SearchScreen}
        options={{
          // tabBarIcon: ({color, size}) => (
          //   <FontAwesomeIcon name="search" size={24} color="orange" />
          // ),
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name="search" size={24} color="orange" />
          ),
          headerTitleStyle: {
            color: "rgb(124, 131, 134)", // "#fff",
            fontSize: 41,
            fontWeight: "100",
          },
          headerStyle: {
            backgroundColor: "rgb(69,55,73)", // // "rgba(138, 149, 143, 1)", // "#f4511e",
          },
          tabBarItemStyle: {
            backgroundColor: "rgba(59, 73, 55, 1)", // "#1b1344",
            // backgroundColor: "#ff15",
          },
        }}
      />
      <Tab.Screen
        name="Keto Tracker"
        component={KetoTrackerScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name="utensils" size={24} color="orange" />
          ),
          tabBarBadge: trackerItems.length,
          headerTitleStyle: {
            color: "rgb(124, 131, 134)", // "#fff",
            fontSize: 41,
            fontWeight: "100",
          },
          // headerTintColor: {
          //   color: "#fff",
          // },
          headerStyle: {
            backgroundColor: "rgb(69,55,73)", // // "rgba(138, 149, 143, 1)", // "#f4511e",
          },
          tabBarItemStyle: {
            backgroundColor: "rgba(59, 73, 55, 1)", //"#1b1344",
            // backgroundColor: "#1344",
          },
          tabBarBadgeStyle: {
            backgroundColor: "#2196F3", // rgb(69,55,73)  (comp to dark green)
            color: "#BBBccc",
          },
        }}
      />
      <Tab.Screen
        name="Keto Limit"
        component={KetoLimitScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name="ban" size={24} color="orange" />
          ),
          tabBarBadge: totalCarbs,
          headerStyle: {
            backgroundColor: "rgb(69,55,73)", // // "rgba(138, 149, 143, 1)", // "#f4511e",
          },
          headerTitleStyle: {
            color: "rgb(124, 131, 134)", // "#fff",
            fontSize: 41,
            fontWeight: "100",
          },
          tabBarItemStyle: {
            backgroundColor: "rgba(59, 73, 55, 1)", //"#1b1344",
            color: "#BBBccc",
          },
          tabBarBadgeStyle: {
            backgroundColor: "#453749", // rgb(69,55,73)  (comp to dark green)
            color: "#BBBccc",
          },
        }}
      />
      <Tab.Screen
        name="Learn 🧐"
        component={HelpScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name="lines-leaning" size={24} color="orange" />
          ),
          headerTitleStyle: {
            color: "rgb(124, 131, 134)", // "#fff",
            fontSize: 41,
            fontWeight: "100",
          },
          headerStyle: {
            backgroundColor: "rgb(69,55,73)", // // "rgba(138, 149, 143, 1)", // "#f4511e",
          },
          tabBarItemStyle: {
            backgroundColor: "rgba(59, 73, 55, 1)", // "#1b1344",
          },
        }}
      />
    </Tab.Navigator>
  );
}

const App: () => Node = () => {
  const [trackerItems, setTrackerItems] = useState([]);
  const [totalCarbs, setTotalCarbs] = useState(0);
  const [totalGILoad, setTotalGILoad] = useState(0);

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
    [trackerItems, totalCarbs, totalGILoad],
  );
  console.log("App Render");

  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      {/* <SafeAreaView> */}
      <ThemeContextProvider>
        <TrackerProvider value={value}>
          <NavigationContainer theme={MyTheme} style={styles.container}>
            <AppTabs style={styles.container} />
          </NavigationContainer>
        </TrackerProvider>
      </ThemeContextProvider>
      {/* </SafeAreaView> */}
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    color: "#FFF",
    fontFamily: "Karla-Light",
  },
});

export default App;
