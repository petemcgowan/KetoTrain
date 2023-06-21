import React, { Fragment, useState, useMemo, useEffect } from 'react'
import { StyleSheet, SafeAreaView, View } from 'react-native'

import GlycemicList from '../components/GlycemicList'
import SearchBar from '../components/SearchBar'
import database from '@react-native-firebase/database'

import usdaNutrition from '../data/usdaNutrition.json'

const SearchScreen = ({ route }) => {
  const [searchPhrase, setSearchPhrase] = useState('')
  const [clicked, setClicked] = useState(false)

  const [foodData, setFoodData] = useState() // Firebase
  const [glycemicData, setGlycemicData] = useState(usdaNutrition) // local copy

  useEffect(() => {
    console.log('SearchScreen, useEffect')
    const onValueChange = database()
      .ref(`/`)
      .on('value', (snapshot) => {
        // console.log('User data: ', snapshot.val())
        if (!foodData) {
          const data = snapshot.val() || {}
          const items = { ...data }

          const newData = []
          Object.keys(items).forEach((key) => {
            newData.push({
              key: key,
              foodName: items[key].foodName,
              carbohydrates: items[key].carbohydrates,
              totalDietaryFibre: items[key].totalDietaryFibre,
              protein: items[key].protein,
              fatTotal: items[key].fatTotal,
              energy: items[key].energy,
              totalSugars: items[key].totalSugars,
              sodium: items[key].sodium,
              calcium: items[key].calcium,
              classification: items[key].classification,
              iodine: items[key].iodine,
              magnesium: items[key].magnesium,
              potassium: items[key].potassium,
              publicFoodKey: items[key].publicFoodKey,
              saturatedFat: items[key].saturatedFat,
            })
          })

          setFoodData(newData)
        }
      })
    // Stop listening for updates when no longer required
    return () => database().ref(`/`).off('value', onValueChange)

    // const reference = firebase
    // .app()
    // .database('https://keto-limit-default-rtdb.europe-west1.firebasedatabase.app')
    // .ref('keto-limit');

    // return onValue(ref(db, '/'), (querySnapShot) => {
    //   if (!foodData) {
    //     const data = querySnapShot.val() || {}
    //     const items = { ...data }

    //     const newData = []
    //     Object.keys(items).forEach((key) => {

    //       newData.push({
    //         key: key,
    //         foodName: items[key].foodName,
    //         carbohydrates: items[key].carbohydrates,
    //         totalDietaryFibre: items[key].totalDietaryFibre,
    //         protein: items[key].protein,
    //         fatTotal: items[key].fatTotal,
    //         energy: items[key].energy,
    //         totalSugars: items[key].totalSugars,
    //         sodium: items[key].sodium,
    //         calcium: items[key].calcium,
    //         classification: items[key].classification,
    //         iodine: items[key].iodine,
    //         magnesium: items[key].magnesium,
    //         potassium: items[key].potassium,
    //         publicFoodKey: items[key].publicFoodKey,
    //         saturatedFat: items[key].saturatedFat,
    //       })
    //     })

    //     setFoodData(newData)
    //   }
    // })
  }, [])

  // const glycemicValue = useMemo(
  //   () => ({
  //     glycemicData,
  //   }),
  //   [glycemicData]
  // )

  function FoodNutritions() {
    // if (loading) return <Text>Loading...</Text>;
    // if (error) return <Text>Error :(</Text>;

    return (
      <Fragment>
        <SafeAreaView style={styles.searchPageContainer}>
          {!clicked}

          <SearchBar
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            clicked={clicked}
            setClicked={setClicked}
          />

          <GlycemicList
            searchPhrase={searchPhrase}
            glycemicData={glycemicData}
            foodData={foodData}
            setClicked={setClicked}
            itemId={route.params.itemId}
          />
        </SafeAreaView>
      </Fragment>
    )
  }
  return (
    <View>
      <FoodNutritions />
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  searchPageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#FFF',
  },
})
