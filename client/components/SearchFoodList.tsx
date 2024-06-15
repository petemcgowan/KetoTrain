import React, { useContext } from 'react'
import { StyleSheet, View, FlatList, SafeAreaView, Text } from 'react-native'

import GlycemicItem from './GlycemicItem'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { ThemeContext } from '../state/ThemeContext'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/reducers/index'

const SearchFoodList = ({ searchPhraseNew }) => {
  const searchFoodList = useSelector((state: RootState) => state.searchFoodList)

  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useContext was used outside of the theme provider')
  }
  const { theme } = context
  const styles = getStyles(theme)

  const renderItem = ({ item }) => {
    const shouldRender = item.foodName
      .toUpperCase()
      .includes(searchPhraseNew.toUpperCase())

    return shouldRender ? (
      <GlycemicItem
        descriptionGI={item.foodName}
        carbAmt={item.carbohydrates}
        carbBackgroundColor={item.carbBackgroundColor}
      />
    ) : (
      <View style={{ height: 0 }}></View>
    )
  }

  return (
    <SafeAreaView style={styles.searchAndList_container}>
      {searchFoodList && (
        <FlatList
          data={searchFoodList}
          renderItem={renderItem}
          initialNumToRender={20}
          keyExtractor={(item) => item.publicFoodKey}
        />
      )}
      {(!searchFoodList || searchFoodList.length === 0) && (
        <View style={styles.errorContainer}>
          <FontAwesome5 name="frown" size={RFPercentage(4.9)} color="grey" />
          <Text style={styles.errorText}>
            Oh no! We couldn't load your foods.
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
  return prevProps.searchPhraseNew === nextProps.searchPhraseNew
}

export default React.memo(SearchFoodList, arePropsEqual)

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
