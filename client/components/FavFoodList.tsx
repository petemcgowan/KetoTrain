import React, { useContext, memo } from 'react'
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

// import FavFoodContext from '../state/FavFoodContext'
import GlycemicItem from './GlycemicItem'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { ThemeContext } from '../state/ThemeContext'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/reducers'

const { width } = Dimensions.get('screen')

const FavFoodList = ({ searchPhraseNew }) => {
  console.log('FavFoodList is rendering')

  // const { favFoodList } = useContext(FavFoodContext)

  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useContext was used outside of the theme provider')
  }
  const { theme } = context
  const styles = getStyles(theme)

  const favFoodList = useSelector((state: RootState) => state.favFoodList)
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
      {favFoodList && (
        <FlatList
          data={favFoodList}
          renderItem={renderItem}
          keyExtractor={(item) => item.publicFoodKey}
        />
      )}
      {(!favFoodList || favFoodList.length === 0) && (
        <View style={styles.errorContainer}>
          <FontAwesome5 name="frown" size={RFPercentage(4.9)} color="grey" />
          <Text style={styles.errorText}>
            Oh no! We couldn't load your favorite foods.
          </Text>
        </View>
      )}
    </SafeAreaView>
  )
}

function arePropsEqual(prevProps, nextProps) {
  return prevProps.searchPhraseNew === nextProps.searchPhraseNew
}

export default memo(FavFoodList, arePropsEqual)

const getStyles = (theme) =>
  StyleSheet.create({
    searchAndList_container: {
      backgroundColor: theme.viewBackground,
    },
    // italic: {
    //   fontStyle: 'italic',
    // },
    // searchContainer: {
    //   width: width * 0.85,
    //   flexDirection: 'row',
    //   alignItems: 'center',
    //   backgroundColor: theme.viewBackground,
    //   paddingLeft: 10,
    //   borderRadius: 10,
    //   borderColor: theme.tableLineColor,
    //   borderWidth: 2,
    //   marginLeft: 10,
    //   marginVertical: 5,
    // },
    searchAndFavourite: {
      flexDirection: 'row',
    },
    favButton: {
      flex: 1, // puts fav icons in line with each other
      alignItems: 'center',
      justifyContent: 'center',
      width: width * 0.15,
    },
    // searchInput: {
    //   paddingTop: 5,
    //   fontSize: RFPercentage(3.5),
    //   color: theme.buttonText,
    //   marginLeft: 2,
    // },
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
