import React, { useContext, useState, useEffect, memo } from 'react'
import {
  StyleSheet,
  TextInput,
  View,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native'

import TrackerContext from '../state/TrackerContext'
import GlycemicItem from './GlycemicItem'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import { ThemeContext } from '../state/ThemeContext'

interface GlycemicListProps {
  searchPhrase: string
  setClicked: (clicked: boolean) => void
  itemId: number
}

// the filter
const GlycemicList = ({
  searchPhrase,
  setClicked,
  itemId,
}: GlycemicListProps) => {
  const { searchFoodList, favFoodList } = useContext(TrackerContext)
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useContext was used outside of the theme provider')
  }
  const { theme } = context
  const styles = getStyles(theme)
  const [searchPhraseNew, setSearchPhraseNew] = useState('')
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false)
  console.log('theme.navigationBackground:' + theme.navigationBackground)
  console.log('theme.tableBackground:' + theme.tableBackground)
  useEffect(() => {
    console.log('theme:' + JSON.stringify(theme))
  }, [theme])

  const renderItem = ({ item }) => {
    const shouldRender =
      (searchPhraseNew === '' ||
        item.foodName
          .toUpperCase()
          .includes(searchPhraseNew.toUpperCase().trim().replace(/\s/g, ''))) &&
      (!showOnlyFavorites || (showOnlyFavorites && item.isFavourite))

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
      <View>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search"
            style={styles.searchInput}
            placeholderTextColor="#FFFFFF"
            value={searchPhraseNew}
            onChangeText={setSearchPhraseNew}
          />
          <TouchableOpacity
            onPress={() => setShowOnlyFavorites(!showOnlyFavorites)}
          >
            <FontAwesome5
              name="heart"
              size={24}
              color={showOnlyFavorites ? 'lime' : '#FFFFFF'}
              solid={showOnlyFavorites}
            />
          </TouchableOpacity>
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
      </View>
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
      height: '88%',
      width: '100%',
      justifyContent: 'center',
      backgroundColor: theme.viewBackground,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.viewBackground,
      // backgroundColor: '#000000',
      paddingHorizontal: 10,
      borderRadius: 10,
      marginHorizontal: 10,
      marginVertical: 5,
    },
    searchInput: {
      paddingTop: 5,
      fontSize: 22,
      color: theme.buttonText,
      // color: '#FFFFFF',
      marginLeft: 10,
      flex: 1,
    },
    checkbox: {
      marginLeft: 10,
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
