import React, {useState, useMemo, useContext} from 'react';
import {StyleSheet, SafeAreaView, View, Text} from 'react-native';

import type {Node} from 'react';

import SearchScreen from './screens/SearchScreen';
import TrackerScreen from './screens/TrackerScreen';
import KetoLimitScreen from './screens/KetoLimitScreen';
import HelpScreen from './screens/HelpScreen';
import DummyScreen from './screens/DummyScreen';

// import {FontAwesome} from '@expo/vector-icons';
// import {FontAwesomeIcon} from '@fortawesome/free-solid-svg-icons';

import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TrackerContext, {TrackerProvider} from './TrackerContext';
import {ThemeContextProvider} from './ThemeContextProvider';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // primary: "rgb(255, 45, 85)",
    // background: "rgb(34, 34, 34)",
    background: 'black',
    notification: 'blue',
  },
};

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={DummyScreen} />
      <Tab.Screen name="Settings" component={DummyScreen} />
    </Tab.Navigator>
  );
}

function AppTabs() {
  const {trackerItems, totalCarbs} = useContext(TrackerContext);

  return (
    <Tab.Navigator
      style={styles.container}
      screenOptions={{
        cardStyle: {
          backgroundColor: 'black',
        },
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Food Search"
        component={SearchScreen}
        // component={DummyScreen}
        options={{
          // tabBarIcon: ({color, size}) => (
          //   <FontAwesomeIcon name="search" size={24} color="orange" />
          // ),
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name="search" size={24} color="orange" />
          ),
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          tabBarItemStyle: {
            backgroundColor: '#1b1344',
            // backgroundColor: "#ff15",
          },
        }}
      />
      <Tab.Screen
        name="Keto Tracker"
        // component={DummyScreen}
        component={TrackerScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name="star" size={24} color="orange" />
          ),
          tabBarBadge: trackerItems.length,
          // headerStyle: {
          //   backgroundColor: "#f4511e",
          // },
          tabBarItemStyle: {
            backgroundColor: '#1b1344',
            // backgroundColor: "#1344",
          },
          tabBarBadgeStyle: {
            backgroundColor: '#2196F3',
            color: '#BBBccc',
          },
        }}
      />
      <Tab.Screen
        name="Keto Limit"
        // component={DummyScreen}
        component={KetoLimitScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name="ban" size={24} color="orange" />
          ),
          tabBarBadge: totalCarbs,
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          tabBarItemStyle: {
            backgroundColor: '#1b1344',
            color: '#BBBccc',
          },
          tabBarBadgeStyle: {
            backgroundColor: '#ccF194AF',
            color: '#BBBBBB',
          },
        }}
      />
      <Tab.Screen
        name="Help"
        // component={DummyScreen}
        component={HelpScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name="question-circle" size={24} color="orange" />
          ),
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          tabBarItemStyle: {
            backgroundColor: '#1b1344',
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
  // const icon = <FontAwesome5 name={'comments'} solid />;
  // icon.loadFont();
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
  console.log('App RENDER');

  return (
    // <SafeAreaView>
    <ThemeContextProvider>
      <TrackerProvider value={value}>
        <NavigationContainer theme={MyTheme} style={styles.container}>
          <AppTabs style={styles.container} />
          {/* <MyTabs /> */}
        </NavigationContainer>
      </TrackerProvider>
    </ThemeContextProvider>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    color: '#FFF',
    fontFamily: 'Karla-Light',
  },
  // sectionContainer: {
  //   marginTop: 32,
  //   paddingHorizontal: 24,
  //   fontFamily: 'Karla-Light',
  // },
  // sectionTitle: {
  //   fontSize: 24,
  //   fontFamily: 'Karla-Light',
  //   fontWeight: '600',
  // },
  // sectionDescription: {
  //   marginTop: 8,
  //   fontFamily: 'Karla-Light',
  //   fontSize: 18,
  //   fontWeight: '400',
  // },
  // highlight: {
  //   fontFamily: 'Karla-Light',
  //   fontWeight: '700',
  // },
});

export default App;
