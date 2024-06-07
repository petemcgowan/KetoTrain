import React, { useState, useContext } from 'react'
import { StyleSheet, SafeAreaView, View } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

import GlycemicList from '../components/GlycemicList'
import { ThemeContext } from '../state/ThemeContext'

const SearchScreen = ({ route }) => {
  console.log('SearchScreen is rendering')
  const [searchPhrase, setSearchPhrase] = useState('')
  const [clicked, setClicked] = useState(false)
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useContext was used outside of the theme provider')
  }
  const { theme } = context
  const styles = getStyles(theme)

  return (
    <View>
      <SafeAreaView style={styles.searchPageContainer}>
        <GlycemicList searchPhrase={searchPhrase} setClicked={setClicked} />
      </SafeAreaView>
    </View>
  )
}

export default SearchScreen

const getStyles = (theme) =>
  StyleSheet.create({
    searchPageContainer: {
      alignItems: 'center',
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
    dateDisplayContainer: {
      flex: 1,
      alignItems: 'center',
    },
    dateDisplayText: {
      color: theme.buttonText,
      fontSize: RFPercentage(3.3),
    },
  })
