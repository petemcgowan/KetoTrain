import React, { Fragment, useState, useContext, useEffect } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  View,
  Button,
  Text,
  TouchableOpacity,
} from 'react-native'

import GlycemicList from '../components/GlycemicList'
import SearchBar from '../components/SearchBar'
import TrackerContext from '../state/TrackerContext'

import usdaNutrition from '../data/usdaNutrition.json'

const SearchScreen = ({ route }) => {
  const [searchPhrase, setSearchPhrase] = useState('')
  const [clicked, setClicked] = useState(false)
  const { selectedDate, handlePrevDay, handleNextDay, foodData } =
    useContext(TrackerContext)

  useEffect(() => {
    console.log('SearchScreen, useEffect')
  }, [])

  function FoodNutritions() {
    // if (loading) return <Text>Loading...</Text>;
    // if (error) return <Text>Error :(</Text>;

    return (
      <Fragment>
        <SafeAreaView style={styles.searchPageContainer}>
          {!clicked}

          <View style={styles.dateHeader}>
            <TouchableOpacity style={styles.dateButton} onPress={handlePrevDay}>
              <Text style={styles.dateButtonText}>&lt;</Text>
            </TouchableOpacity>
            <View style={styles.dateDisplayContainer}>
              <Text style={styles.dateDisplayText}>
                {selectedDate.toDateString()}
              </Text>
            </View>
            <TouchableOpacity style={styles.dateButton} onPress={handleNextDay}>
              <Text style={styles.dateButtonText}>&gt;</Text>
            </TouchableOpacity>
          </View>
          {/* <SearchBar
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            clicked={clicked}
            setClicked={setClicked}
          /> */}

          <GlycemicList
            searchPhrase={searchPhrase}
            foodData={foodData}
            setClicked={setClicked}
            itemId={route.params.itemId}
          />
        </SafeAreaView>
      </Fragment>
    )
  }
  return (
    <View>
      <FoodNutritions />
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  searchPageContainer: {
    // justifyContent: 'center',
    alignItems: 'center',
    color: '#FFF',
  },
  dateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#F5F5F5',
    marginBottom: 15,
  },
  dateButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 20,
  },
  dateButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  dateDisplayContainer: {
    flex: 1,
    alignItems: 'center',
  },
  dateDisplayText: {
    color: 'blue',
    fontSize: 20,
  },
})
