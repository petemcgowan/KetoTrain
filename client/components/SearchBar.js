/* eslint-disable react/display-name */
import React from 'react'
import { memo, useCallback } from 'react'
import { View, TextInput, Button, Keyboard, StyleSheet } from 'react-native'

const SearchBar = memo(
  ({ searchPhrase, setSearchPhrase, clicked, setClicked }) => {
    const handleFocus = useCallback(() => {
      setClicked(true)
    }, [setClicked])

    const handlePress = useCallback(() => {
      Keyboard.dismiss()
      setClicked(false)
    }, [setClicked])

    return (
      <View style={styles.container}>
        <View
          style={
            !clicked ? styles.searchBar__unclicked : styles.searchBar__clicked
          }
        >
          <TextInput
            style={styles.input}
            placeholder="Search"
            value={searchPhrase}
            onChangeText={setSearchPhrase}
            onFocus={handleFocus}
          />
        </View>
        {clicked && (
          <View style={{ color: 'purple' }}>
            <Button
              style={{ color: 'purple' }}
              title="Cancel"
              onPress={handlePress}
            />
          </View>
        )}
      </View>
    )
  }
)

export default SearchBar

const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center',
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: 'row',
    width: '80%',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  input: {
    fontSize: 30,
    marginLeft: 10,
    width: '90%',
  },
})
