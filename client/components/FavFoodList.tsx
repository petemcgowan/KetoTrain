import React, { useContext, useCallback, useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  SafeAreaView,
  Text,
} from 'react-native'

import GlycemicItem from './GlycemicItem'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { ThemeContext } from '../state/ThemeContext'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/reducers'

const { width } = Dimensions.get('screen')

const FavFoodList = ({ searchPhraseNew }) => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useContext was used outside of the theme provider')
  }
  const { theme } = context
  const styles = getStyles(theme)

  const favFoodList = useSelector((state: RootState) => state.favFoodList)
  const [filteredList, setFilteredList] = useState(favFoodList)

  const renderItem = useCallback(({ item }) => {
    return (
      <GlycemicItem
        key={item.publicFoodKey}
        descriptionGI={item.foodName}
        carbAmt={item.carbohydrates}
        carbBackgroundColor={item.carbBackgroundColor}
      />
    )
  }, [])

  const filterItem = useCallback(
    (item) => {
      const result = item.foodName
        .toUpperCase()
        .includes(searchPhraseNew.toUpperCase())
      return result
    },
    [searchPhraseNew]
  )

  useEffect(() => {
    const newFilteredList = favFoodList.filter(filterItem)
    setFilteredList(newFilteredList)
  }, [favFoodList, searchPhraseNew, filterItem])

  return (
    <SafeAreaView style={styles.searchAndList_container}>
      {filteredList.length > 0 ? (
        <FlatList
          data={filteredList}
          renderItem={renderItem}
          keyExtractor={(item) => item.publicFoodKey}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
        />
      ) : (
        <View style={styles.errorContainer}>
          <FontAwesome5 name="frown" size={RFPercentage(4.9)} color="grey" />
          <Text style={styles.errorText}>
            {searchPhraseNew
              ? 'No matching favorite foods found.'
              : "You haven't added any favorite foods yet."}
          </Text>
        </View>
      )}
    </SafeAreaView>
  )
}

export default React.memo(
  FavFoodList,
  (prevProps, nextProps) =>
    prevProps.searchPhraseNew === nextProps.searchPhraseNew
)

const getStyles = (theme) =>
  StyleSheet.create({
    searchAndList_container: {
      backgroundColor: theme.viewBackground,
    },
    searchAndFavourite: {
      flexDirection: 'row',
    },
    favButton: {
      flex: 1, // puts fav icons in line with each other
      alignItems: 'center',
      justifyContent: 'center',
      width: width * 0.15,
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    errorText: {
      fontSize: RFPercentage(2.8),
      color: 'grey',
      textAlign: 'center',
      marginTop: 10,
    },
  })
