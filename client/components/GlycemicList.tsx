import React, { useContext, useState, useEffect, memo } from 'react'
import {
  StyleSheet,
  TextInput,
  View,
  FlatList,
  Animated,
  SafeAreaView,
  Easing,
} from 'react-native'

import TrackerContext from '../state/TrackerContext'
// import GlycemicContext from '../state/GlycemicContext'
import GlycemicItem from './GlycemicItem'
import { getGLResult } from '../utils/GlycemicUtils'

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
  const [searchItemSelected, setSearchItemSelected] = useState(0)
  const [searchPhraseNew, setSearchPhraseNew] = useState('')

  // const [opacityAnimatedValue, setOpacityAnimatedValue] = useState(
  //   new Animated.Value(0)
  // )

  // const animatedOpacitySequence = () => {
  //   Animated.sequence([
  //     Animated.timing(opacityAnimatedValue, {
  //       toValue: 1,
  //       easing: Easing.inOut(Easing.ease),
  //       duration: 1200,
  //       useNativeDriver: true,
  //     }),
  //     Animated.timing(opacityAnimatedValue, {
  //       toValue: 0,
  //       duration: 1000,
  //       useNativeDriver: true,
  //     }),
  //   ]).start()
  // }

  // const animatedStyle = {
  //   opacity: opacityAnimatedValue,
  // }

  useEffect(() => {
    // if (foodData) {
    //   // console.log(Object.keys(foodData))
    //   Object.keys(foodData).forEach((key) => {
    //     console.log(key) // 👉️ 1, 2, 3, 4,
    //     console.log(foodData[key]) // 👉️ calcium, carbohydrates...
    //   })
    // }
  }, [])

  // item is an entry in the glycemicData/data list
  const renderItem = ({ item }) => {
    // const giLoad = getGLResult(item.carbAmt, item.giAmt, item.glAmt);
    // when no input, show all
    // console.log("renderItem calle for " + item.description);
    // console.log('renderItem, item:' + JSON.stringify(item))

    if (searchPhraseNew === '') {
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
          // animatedOpacitySequence={animatedOpacitySequence}
          setSearchItemSelected={setSearchItemSelected}
          searchItemSelected={searchItemSelected}
          // glycemicData={glycemicData}
        />
      )
    }
    // filter of the foodName
    if (
      item.foodName
        .toUpperCase()
        .includes(searchPhraseNew.toUpperCase().trim().replace(/\s/g, ''))
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
          // animatedOpacitySequence={animatedOpacitySequence}
          setSearchItemSelected={setSearchItemSelected}
          searchItemSelected={searchItemSelected}
          // glycemicData={glycemicData}
        />
      )
    }
  }

  return (
    <SafeAreaView style={styles.list__container}>
      <View
      // onStartShouldSetResponder={() => {
      //   setClicked(false);
      // }}
      >
        <TextInput
          placeholder="Search"
          style={styles.input}
          value={searchPhraseNew}
          onChangeText={setSearchPhraseNew}
        />
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
  input: {
    fontSize: 30,
    marginLeft: 10,
    width: '90%',
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
