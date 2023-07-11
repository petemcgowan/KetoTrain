import React, { useContext, useState, useEffect, memo } from 'react'
import {
  StyleSheet,
  TextInput,
  View,
  FlatList,
  Animated,
  SafeAreaView,
  Easing,
  TouchableOpacity,
  Text,
} from 'react-native'

import TrackerContext from '../state/TrackerContext'
// import GlycemicContext from '../state/GlycemicContext'
import GlycemicItem from './GlycemicItem'
import { getGLResult } from '../utils/GlycemicUtils'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

interface GlycemicListProps {
  searchPhrase: string
  // glycemicData: any
  // foodData: any
  setClicked: (clicked: boolean) => void
  itemId: number
}

// the filter
const GlycemicList = ({
  searchPhrase,
  // glycemicData,
  // foodData,
  setClicked,
  itemId,
}: GlycemicListProps) => {
  const { setTotalCarbs, setTotalGILoad, foodData } = useContext(TrackerContext)
  // const { glycemicData } = useContext(GlycemicContext)
  // const [searchItemSelected, setSearchItemSelected] = useState(0)
  const [searchPhraseNew, setSearchPhraseNew] = useState('')
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false)

  useEffect(() => {}, [])

  // item is an entry in the glycemicData/data list
  const renderItem = ({ item }) => {
    // const giLoad = getGLResult(item.carbAmt, item.giAmt, item.glAmt);
    // when no input, show all

    if (
      searchPhraseNew === '' &&
      (!showOnlyFavorites || (showOnlyFavorites && item.isFavourite))
    ) {
      return (
        <GlycemicItem
          descriptionGI={item.foodName}
          foodFactsId={item.foodFactsId}
          carbAmt={Math.round(item.carbohydrates)}
          giAmt={30} // todo remove when GI goes, it's now carb based
          glAmt={30} // todo remove when GI goes, it's now carb based
          fiberAmt={item.totalDietaryFibre}
          proteinAmt={item.protein}
          fatAmt={item.fatTotal}
          energyAmt={item.energy}
          sugarsAmt={item.totalSugars}
          sodiumAmt={item.sodium}
          isFavourite={item.isFavourite}
        />
      )
    }
    // filter of the foodName
    if (
      item.foodName
        .toUpperCase()
        .includes(searchPhraseNew.toUpperCase().trim().replace(/\s/g, '')) &&
      (!showOnlyFavorites || (showOnlyFavorites && item.isFavourite))
    ) {
      return (
        <GlycemicItem
          descriptionGI={item.foodName}
          foodFactsId={item.foodFactsId}
          carbAmt={Math.round(item.carbohydrates)}
          giAmt={30}
          glAmt={30}
          fiberAmt={item.totalDietaryFibre}
          proteinAmt={item.protein}
          fatAmt={item.fatTotal}
          energyAmt={item.energy}
          sugarsAmt={item.totalSugars}
          sodiumAmt={item.sodium}
          isFavourite={item.isFavourite}
        />
      )
    }
  }

  return (
    <SafeAreaView style={styles.list__container}>
      <View>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search"
            style={styles.input}
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
        <FlatList
          data={foodData}
          renderItem={renderItem}
          keyExtractor={(item) => item.publicFoodKey}
        />
      </View>
    </SafeAreaView>
  )
}

function arePropsEqual(prevProps, nextProps) {
  console.log('**********prevProps:' + prevProps + ', nextProps:' + nextProps)
  return prevProps.foodName === nextProps.foodName
}

export default memo(GlycemicList, arePropsEqual)

const styles = StyleSheet.create({
  // nutritionElementBox: {
  //   flexDirection: 'row',
  // },
  // valueText: {},
  // labelText: {
  //   fontWeight: 'bold',
  // },
  list__container: {
    height: '88%',
    width: '100%',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#000000',
    paddingHorizontal: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  input: {
    paddingTop: 5,
    fontSize: 22,
    color: '#FFFFFF',
    marginLeft: 10,
    flex: 1,
  },
  checkbox: {
    marginLeft: 10,
  },
  // box: {
  //   backgroundColor: 'rgba(59, 73, 55, 1)',
  //   textAlign: 'center',
  //   justifyContent: 'center',
  //   position: 'absolute',
  //   color: 'white',
  //   left: 70,
  //   top: 20,
  // },
})
