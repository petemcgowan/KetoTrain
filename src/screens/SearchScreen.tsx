import React, { Fragment, useState, useEffect, useContext } from 'react'
import { StyleSheet, SafeAreaView, View } from 'react-native'

import GlycemicList from '../components/GlycemicList'
import SearchBar from '../components/SearchBar'

import { withTheme } from 'styled-components'
import GlycemicContext from '../state/GlycemicContext'

const SearchScreen = () => {
  const [searchPhrase, setSearchPhrase] = useState('')
  const [clicked, setClicked] = useState(false)
  const { glycemicData } = useContext(GlycemicContext)

  useEffect(() => {
    console.log('SearchScreen, useEffect')
  }, [])

  function FoodNutritions() {
    // if (loading) return <Text>Loading...</Text>;
    // if (error) return <Text>Error :(</Text>;

    // prettier-ignore
    return <Fragment>
      <SafeAreaView style={styles.searchPageContainer}>
        {!clicked }

         <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          clicked={clicked}
          setClicked={setClicked}
        />

         {/* {loading ? (
          <ActivityIndicator size="large" />
        ) : ( */}
            <GlycemicList
            searchPhrase={searchPhrase}
            glycemicData={glycemicData}
            setClicked={setClicked}
          />
        {/* )
         } */}
      </SafeAreaView>
    </Fragment>;
  }
  return (
    <View>
      <FoodNutritions />
      {/* <Text>Search Screen test</Text> */}
    </View>
  )
}

export default withTheme(SearchScreen)

const styles = StyleSheet.create({
  searchPageContainer: {
    // marginTop: 27,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#FFF',
  },

  // description: {
  //   // fontFamily: "Karla-Light",   // this isn't being picked up (when commented in)

  //   // backgroundColor: "#000",
  //   width: "100%",
  //   // marginTop: 20,
  //   fontSize: 25,
  //   // fontWeight: 'bold',
  //   // marginLeft: "10%",
  //   color: "#FFF",
  // },
})
// greenVibe: "rgba(59, 73, 55, 1)",  // complimentary  rgb(69,55,73)
// offWhiteVibe: "rgba(201, 189, 187, 1)"
// tealVibe "  rgba(138, 149, 143, 1)"   complimentary=rgb(149,138,144)   comp2=rgb(124,131,134)
// comp to Teal "rgba (124, 131, 134, 1)"
