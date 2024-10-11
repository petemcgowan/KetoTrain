/* eslint-disable react/display-name */
import React, { memo, useCallback, useContext, useRef } from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native'
import { debounce } from 'lodash'
import { ThemeContext } from '../state/ThemeContext'
import { RFPercentage } from 'react-native-responsive-fontsize'

const SearchBar = memo(
  ({ searchPhrase, setSearchPhrase, clicked, setClicked }) => {
    const context = useContext(ThemeContext)
    if (!context) {
      throw new Error('useContext was used outside of the theme provider')
    }
    const { theme } = context
    const styles = getStyles(theme)
    const searchInput = useRef(null)

    const debouncedSetSearchPhrase = useCallback(
      debounce((text) => {
        setSearchPhrase(text)
      }, 300),
      [setSearchPhrase]
    )

    const handleChangeText = useCallback(
      (text) => {
        setSearchPhrase(text) // Update immediately for responsive typing
        debouncedSetSearchPhrase(text) // Debounced update for expensive operations
      },
      [setSearchPhrase, debouncedSetSearchPhrase]
    )

    // basic set for testing (nodebounce)
    // const handleChangeText = useCallback(
    //   (text) => {
    //     setSearchPhrase(text)
    //   },
    //   [setSearchPhrase]
    // )

    const handleFocus = useCallback(() => {
      setClicked(true)
    }, [setClicked])

    const handleSearchBarPress = useCallback(() => {
      if (searchInput.current) {
        searchInput.current.focus()
      }
    }, [])

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={handleSearchBarPress}>
          <View style={styles.searchBar__unclicked}>
            <TextInput
              ref={searchInput}
              style={styles.searchInput}
              placeholder="Search"
              value={searchPhrase}
              onChangeText={handleChangeText}
              onFocus={handleFocus}
              autoCapitalize="none"
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
)

export default SearchBar

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      margin: 5,
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'row',
      width: '100%',
    },
    searchBar__unclicked: {
      padding: 5,
      flexDirection: 'row',
      width: '100%',
      borderRadius: 15,
      alignItems: 'center',
    },
    searchInput: {
      paddingTop: 5,
      fontSize: RFPercentage(3.3),
      color: theme.buttonText,
      marginLeft: 2,
      width: '90%',
    },
  })
