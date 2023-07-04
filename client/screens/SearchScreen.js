import React, { Fragment, useState, useContext, useEffect } from 'react'
import { StyleSheet, SafeAreaView, View, Button, Text } from 'react-native'

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
            <Button title="<" onPress={handlePrevDay} />
            <Text style={{ color: 'blue', fontSize: 20 }}>
              {selectedDate.toDateString()}
            </Text>
            <Button title=">" onPress={handleNextDay} />
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
  },
})
