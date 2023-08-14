/* eslint-disable react/display-name */
import React from 'react'
import { memo, useEffect, useCallback } from 'react'
import { View, TextInput, Button, Keyboard, StyleSheet } from 'react-native'

const SearchBar = memo(
  console.log('SearchBar is rendering')

  ({ searchPhrase, setSearchPhrase, clicked, setClicked }) => {
    const handleFocus = useCallback(() => {
      console.log('handleFocus')
      setClicked(true)
    }, [setClicked])

    const handlePress = useCallback(() => {
      console.log('handlePress')
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

// const SearchBarComponent = ({
//   searchPhrase,
//   setSearchPhrase,
//   clicked,
//   setClicked,
// }) => {
//   useEffect(() => {
//     console.log('SearchBar, useEffect')
//   }, [])

//   return (
//     <View style={styles.container}>
//       <View
//         style={
//           !clicked ? styles.searchBar__unclicked : styles.searchBar__clicked
//         }
//       >
//         <TextInput
//           style={styles.input}
//           placeholder="Search"
//           value={searchPhrase}
//           onChangeText={setSearchPhrase}
//           onFocus={() => {
//             setClicked(true)
//           }}
//         />
//       </View>
//       {clicked && (
//         <View style={{ color: 'purple' }}>
//           <Button
//             title="Cancel"
//             onPress={() => {
//               Keyboard.dismiss()
//               setClicked(false)
//             }}
//           />
//         </View>
//       )}
//     </View>
//   )
// }

// const SearchBar = memo(SearchBarComponent)

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
