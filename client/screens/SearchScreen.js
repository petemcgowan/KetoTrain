import React, { Fragment, useState, useContext, useEffect } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import GlycemicList from '../components/GlycemicList'
import TrackerContext from '../state/TrackerContext'
import { ThemeContext } from '../state/ThemeContext'

const SearchScreen = ({ route }) => {
  const [searchPhrase, setSearchPhrase] = useState('')
  const [clicked, setClicked] = useState(false)
  const { selectedDate, handlePrevDay, handleNextDay } =
    useContext(TrackerContext)
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useContext was used outside of the theme provider')
  }
  const { theme } = context
  const styles = getStyles(theme)

  useEffect(() => {
    console.log('SearchScreen, useEffect')
  }, [])

  function FoodNutritions() {
    return (
      <Fragment>
        <SafeAreaView style={styles.searchPageContainer}>
          {!clicked}

          <View style={styles.dateHeader}>
            <TouchableOpacity style={styles.dateButton} onPress={handlePrevDay}>
              <FontAwesome5
                name="chevron-left"
                size={24}
                color={theme.buttonText}
              />
            </TouchableOpacity>
            <View style={styles.dateDisplayContainer}>
              <Text style={styles.dateDisplayText}>
                {selectedDate.toDateString()}
              </Text>
            </View>
            <TouchableOpacity style={styles.dateButton} onPress={handleNextDay}>
              <FontAwesome5
                name="chevron-right"
                size={24}
                color={theme.buttonText}
              />
            </TouchableOpacity>
          </View>
          <GlycemicList searchPhrase={searchPhrase} setClicked={setClicked} />
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

const getStyles = (theme) =>
  StyleSheet.create({
    searchPageContainer: {
      alignItems: 'center',
      // color: '#FFF',
      backgroundColor: theme.viewBackground,
    },
    dateHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 5,
      backgroundColor: theme.viewBackground,
      marginBottom: 15,
    },
    dateButton: {
      backgroundColor: theme.buttonBackground,
      paddingVertical: 10,
      paddingHorizontal: 18,
      borderRadius: 20,
    },
    dateButtonText: {
      color: theme.buttonText,
      fontSize: 24,
      fontWeight: 'bold',
    },
    dateDisplayContainer: {
      flex: 1,
      alignItems: 'center',
    },
    dateDisplayText: {
      color: theme.buttonText,
      fontSize: 24,
    },
  })
