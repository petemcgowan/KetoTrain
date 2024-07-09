import React, { useContext, useCallback, useState, useEffect } from 'react'
import { StyleSheet, View, FlatList, SafeAreaView, Text } from 'react-native'
import GlycemicItem from './GlycemicItem'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { ThemeContext } from '../state/ThemeContext'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/reducers/index'

const SearchFoodListFlatlistFilter = ({ searchPhraseNew }) => {
  const searchFoodList = useSelector((state: RootState) => state.searchFoodList)
  const [filteredList, setFilteredList] = useState(searchFoodList)

  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useContext was used outside of the theme provider')
  }
  const { theme } = context
  const styles = getStyles(theme)

  const renderItem = useCallback(({ item }) => {
    // console.log(`Rendering item: ${item.foodName}`)
    return (
      <GlycemicItem
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
      // console.log(`Filtering item: ${item.foodName}, result: ${result}`)
      return result
    },
    [searchPhraseNew]
  )

  useEffect(() => {
    // console.log(`searchPhraseNew changed: ${searchPhraseNew}`)
    const newFilteredList = searchFoodList.filter(filterItem)
    // console.log(`Filtered list length: ${newFilteredList.length}`)
    setFilteredList(newFilteredList)
  }, [searchFoodList, searchPhraseNew, filterItem])

  return (
    <SafeAreaView style={styles.searchAndList_container}>
      {filteredList.length > 0 ? (
        <FlatList
          data={filteredList}
          renderItem={renderItem}
          keyExtractor={(item) => item.publicFoodKey}
          initialNumToRender={15}
          maxToRenderPerBatch={15}
          updateCellsBatchingPeriod={50}
          windowSize={21}
          removeClippedSubviews={true}
        />
      ) : (
        <View style={styles.errorContainer}>
          <FontAwesome5 name="frown" size={RFPercentage(4.9)} color="grey" />
          <Text style={styles.errorText}>No matching foods found.</Text>
        </View>
      )}
    </SafeAreaView>
  )
}

export default SearchFoodListFlatlistFilter

const getStyles = (theme) =>
  StyleSheet.create({
    searchAndList_container: {
      backgroundColor: theme.viewBackground,
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
