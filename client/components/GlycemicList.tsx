import React, { useContext, useState, useEffect, memo, useRef } from 'react'
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
import FavFoodList from './FavFoodList'
import SearchFoodList from './SearchFoodList'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { ThemeContext } from '../state/ThemeContext'
import UserContext from '../state/UserContext'

const { width } = Dimensions.get('screen')

interface GlycemicListProps {
  searchPhrase: string
  setClicked: (clicked: boolean) => void
}

const GlycemicList = ({ searchPhrase, setClicked }: GlycemicListProps) => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useContext was used outside of the theme provider')
  }
  const { theme } = context
  const styles = getStyles(theme)
  const [searchPhraseNew, setSearchPhraseNew] = useState('')
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false)
  const { userId } = useContext(UserContext)

  useEffect(() => {
    console.log('GlycemicList, useEffect called')
  }, [])

  const favouriteAction = async () => {
    console.log('favouriteAction called')

    setShowOnlyFavorites(!showOnlyFavorites)
  }

  return (
    <SafeAreaView style={styles.searchAndList_container}>
      <View style={styles.searchAndFavourite}>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search"
            style={[
              styles.searchInput,
              !searchPhraseNew ? styles.italic : null,
            ]}
            placeholderTextColor={theme.buttonText}
            value={searchPhraseNew}
            selectionColor={'white'}
            onChangeText={(text) => {
              setSearchPhraseNew(text)
            }}
          />
        </View>
        <View style={styles.favButton}>
          <TouchableOpacity onPress={favouriteAction}>
            <FontAwesome5
              name="heart"
              size={RFPercentage(3.9)}
              color={showOnlyFavorites ? theme.iconFill : theme.buttonText}
              solid={showOnlyFavorites}
            />
          </TouchableOpacity>
        </View>
      </View>
      {showOnlyFavorites && <FavFoodList searchPhraseNew={searchPhraseNew} />}
      {!showOnlyFavorites && (
        <SearchFoodList searchPhraseNew={searchPhraseNew} />
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
    italic: {
      fontStyle: 'italic',
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
      flex: 1, // puts fav icons in line with each other
      alignItems: 'center',
      justifyContent: 'center',
      width: width * 0.15,
    },
    searchInput: {
      paddingTop: 5,
      fontSize: RFPercentage(3.5),
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
      fontSize: RFPercentage(2.8),
      color: 'grey',
      textAlign: 'center',
      marginTop: 10,
    },
  })
