import React, { useContext, useState, useEffect, memo } from 'react'
import {
  StyleSheet,
  TextInput,
  View,
  Dimensions,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native'

import TrackerContext from '../state/TrackerContext'
import GlycemicItem from './GlycemicItem'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import { ThemeContext } from '../state/ThemeContext'

const { width } = Dimensions.get('screen')

interface GlycemicListProps {
  searchPhrase: string
  setClicked: (clicked: boolean) => void
}

// the filter
const GlycemicList = ({ searchPhrase, setClicked }: GlycemicListProps) => {
  const { searchFoodList, favFoodList } = useContext(TrackerContext)
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useContext was used outside of the theme provider')
  }
  const { theme } = context
  const styles = getStyles(theme)
  const [searchPhraseNew, setSearchPhraseNew] = useState('')
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false)
  // searchFoodList.find

  useEffect(() => {
    // console.log('GlycemicList, useEffect, theme:' + JSON.stringify(theme))
    // console.log(
    //   'GlycemicList, useEffect, favFoodList:' + JSON.stringify(favFoodList)
    // )
  }, [theme, favFoodList, searchFoodList])

  const renderItem = ({ item }) => {
    const shouldRender =
      (searchPhraseNew === '' ||
        item.foodName
          .toUpperCase()
          .includes(searchPhraseNew.toUpperCase().trim().replace(/\s/g, ''))) &&
      (!showOnlyFavorites || (showOnlyFavorites && item.isFavourite))

    // if (showOnlyFavorites) // for testing favourites
    return shouldRender ? (
      <GlycemicItem
        descriptionGI={item.foodName}
        carbAmt={item.carbohydrates}
        isFavourite={item.isFavourite}
        carbBackgroundColor={item.carbBackgroundColor}
      />
    ) : null
  }

  return (
    <SafeAreaView style={styles.searchAndList_container}>
      <View style={styles.searchAndFavourite}>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search"
            style={styles.searchInput}
            placeholderTextColor={theme.buttonText}
            value={searchPhraseNew}
            onChangeText={setSearchPhraseNew}
          />
        </View>
        <View style={styles.favButton}>
          <TouchableOpacity
            onPress={() => setShowOnlyFavorites(!showOnlyFavorites)}
          >
            <FontAwesome5
              name="heart"
              size={29}
              color={showOnlyFavorites ? theme.iconFill : theme.buttonText}
              solid={showOnlyFavorites}
            />
          </TouchableOpacity>
        </View>
      </View>
      {favFoodList && showOnlyFavorites && (
        <FlatList
          data={favFoodList}
          renderItem={renderItem}
          keyExtractor={(item) => item.publicFoodKey}
        />
      )}
      {favFoodList && !showOnlyFavorites && (
        <FlatList
          data={searchFoodList}
          renderItem={renderItem}
          keyExtractor={(item) => item.publicFoodKey}
        />
      )}
      {(!favFoodList || favFoodList.length === 0) && (
        <View style={styles.errorContainer}>
          <FontAwesome5 name="frown" size={50} color="grey" />
          <Text style={styles.errorText}>
            Oh no! We couldn't load your favorite foods.
          </Text>
          <Text style={styles.errorText}>
            Please check your internet connection and try again.
          </Text>
        </View>
      )}
    </SafeAreaView>
  )
}

function arePropsEqual(prevProps, nextProps) {
  return prevProps.foodName === nextProps.foodName
}

export default memo(GlycemicList, arePropsEqual)

const getStyles = (theme) =>
  StyleSheet.create({
    searchAndList_container: {
      backgroundColor: theme.viewBackground,
    },
    searchContainer: {
      width: width * 0.85,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.viewBackground,
      paddingLeft: 10,
      borderRadius: 10,
      borderColor: theme.tableLineColor,
      borderWidth: 2,
      marginLeft: 10,
      marginVertical: 5,
    },
    searchAndFavourite: {
      flexDirection: 'row',
    },
    favButton: {
      flex: 1, // this puts fav icons in line with each other
      alignItems: 'center',
      justifyContent: 'center',
      width: width * 0.15,
    },
    searchInput: {
      paddingTop: 5,
      fontSize: 25,
      color: theme.buttonText,
      marginLeft: 2,
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    errorText: {
      fontSize: 18,
      color: 'grey',
      textAlign: 'center',
      marginTop: 10,
    },
  })
