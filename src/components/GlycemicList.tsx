import React, { useContext, useState, useEffect, memo } from 'react'
import {
  StyleSheet,
  Text,
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
  glycemicData: any
  foodData: any
  setClicked: (clicked: boolean) => void
  itemId: number
}

// the filter
const GlycemicList = ({
  searchPhrase,
  glycemicData,
  foodData,
  setClicked,
  itemId,
}: GlycemicListProps) => {
  const { setTotalCarbs, setTotalGILoad } = useContext(TrackerContext)
  // const { glycemicData } = useContext(GlycemicContext)
  const [searchItemSelected, setSearchItemSelected] = useState(0)

  const [opacityAnimatedValue, setOpacityAnimatedValue] = useState(
    new Animated.Value(0)
  )

  const animatedOpacitySequence = () => {
    Animated.sequence([
      Animated.timing(opacityAnimatedValue, {
        toValue: 1,
        easing: Easing.inOut(Easing.ease),
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnimatedValue, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start()
  }

  const animatedStyle = {
    opacity: opacityAnimatedValue,
  }

  useEffect(() => {
    // console.log('GlycemicList: foodData:' + JSON.stringify(foodData))
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
    if (searchPhrase === '') {
      return (
        <GlycemicItem
          descriptionGI={item.foodName}
          setTotalCarbs={setTotalCarbs}
          setTotalGILoad={setTotalGILoad}
          carbAmt={Math.round(item.carbohydrates)}
          giAmt={30} // todo remove when GI goes, it's now carb based
          glAmt={30} // todo remove when GI goes, it's now carb based
          fiberAmt={item.totalDietaryFibre}
          proteinAmt={item.protein}
          fatAmt={item.fatTotal}
          energyAmt={item.energy}
          sugarsAmt={item.totalSugars}
          sodiumAmt={item.sodium}
          animatedOpacitySequence={animatedOpacitySequence}
          setSearchItemSelected={setSearchItemSelected}
          searchItemSelected={searchItemSelected}
          glycemicData={glycemicData}
        />
      )
    }
    // filter of the description
    if (
      item.description
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ''))
    ) {
      return (
        <GlycemicItem
          descriptionGI={item.foodName}
          setTotalCarbs={setTotalCarbs}
          setTotalGILoad={setTotalGILoad}
          carbAmt={Math.round(item.carbohydrates)}
          giAmt={30}
          glAmt={30}
          fiberAmt={item.totalDietaryFibre}
          proteinAmt={item.protein}
          fatAmt={item.fatTotal}
          energyAmt={item.energy}
          sugarsAmt={item.totalSugars}
          sodiumAmt={item.sodium}
          animatedOpacitySequence={animatedOpacitySequence}
          setSearchItemSelected={setSearchItemSelected}
          searchItemSelected={searchItemSelected}
          glycemicData={glycemicData}
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
        <FlatList
          data={foodData}
          renderItem={renderItem}
          keyExtractor={(item) => item.publicFoodKey}
        />
      </View>
      <Animated.View style={[styles.box, animatedStyle]}>
        <View style={styles.nutritionElementBox}>
          <Text>{glycemicData[searchItemSelected].description}</Text>
        </View>
        <View style={styles.nutritionElementBox}>
          <Text style={styles.labelText}>GI:</Text>
          <Text style={styles.valueText}>
            {glycemicData[searchItemSelected].giAmt}
          </Text>
        </View>
        <View style={styles.nutritionElementBox}>
          <Text style={styles.labelText}>GI Load:</Text>
          <Text style={styles.valueText}>
            {glycemicData[searchItemSelected].glAmt}
          </Text>
        </View>
        <View style={styles.nutritionElementBox}>
          <Text style={styles.labelText}>Carb:</Text>
          <Text style={styles.valueText}>
            {glycemicData[searchItemSelected].carbAmt}
          </Text>
        </View>
        <View style={styles.nutritionElementBox}>
          <Text style={styles.labelText}>Fibre:</Text>
          <Text style={styles.valueText}>
            {glycemicData[searchItemSelected].fiberAmt}
          </Text>
        </View>
        <View style={styles.nutritionElementBox}>
          <Text style={styles.labelText}>Protein:</Text>
          <Text style={styles.valueText}>
            {glycemicData[searchItemSelected].proteinAmt}
          </Text>
        </View>
        <View style={styles.nutritionElementBox}>
          <Text style={styles.labelText}>Fat:</Text>
          <Text style={styles.valueText}>
            {glycemicData[searchItemSelected].fatAmt}
          </Text>
        </View>
        <View style={styles.nutritionElementBox}>
          <Text style={styles.labelText}>kCal:</Text>
          <Text style={styles.valueText}>
            {glycemicData[searchItemSelected].energyAmt}
          </Text>
        </View>
        <View style={styles.nutritionElementBox}>
          <Text style={styles.labelText}>Sugars:</Text>
          <Text style={styles.valueText}>
            {glycemicData[searchItemSelected].sugarsAmt}
          </Text>
        </View>
        <View style={styles.nutritionElementBox}>
          <Text style={styles.labelText}>Sodium:</Text>
          <Text style={styles.valueText}>
            {glycemicData[searchItemSelected].sodiumAmt}
          </Text>
        </View>
      </Animated.View>
    </SafeAreaView>
  )
}

function arePropsEqual(prevProps, nextProps) {
  console.log('**********prevProps:' + prevProps + ', nextProps:' + nextProps)
  return prevProps.description === nextProps.description
}

export default memo(GlycemicList, arePropsEqual)

const styles = StyleSheet.create({
  nutritionElementBox: {
    flexDirection: 'row',
  },
  valueText: {},
  labelText: {
    fontWeight: 'bold',
  },
  list__container: {
    height: '88%',
    width: '100%',
    justifyContent: 'center',
  },
  box: {
    backgroundColor: 'rgba(59, 73, 55, 1)',
    textAlign: 'center',
    justifyContent: 'center',
    position: 'absolute',
    color: 'white',
    left: 70,
    top: 20,
  },
})
