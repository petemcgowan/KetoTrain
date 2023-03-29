import React, {
  Fragment,
  useState,
  useMemo,
  useEffect,
  useContext,
} from 'react'
import { StyleSheet, SafeAreaView, View } from 'react-native'

import GlycemicList from '../components/GlycemicList'
import SearchBar from '../components/SearchBar'
import { db } from '../firebase/firebase-config'
import { ref, onValue } from 'firebase/database'
import usdaNutrition from '../data/usdaNutrition.json'

// import GlycemicContext from '../state/GlycemicContext'

const SearchScreen = ({ route }) => {
  const [searchPhrase, setSearchPhrase] = useState('')
  const [clicked, setClicked] = useState(false)

  // const { glycemicData } = useContext(GlycemicContext)
  const [foodData, setFoodData] = useState() // Firebase
  const [glycemicData, setGlycemicData] = useState(usdaNutrition) // local copy

  useEffect(() => {
    return onValue(ref(db, '/'), (querySnapShot) => {
      if (!foodData) {
        const data = querySnapShot.val() || {}
        const items = { ...data }

        // const users1 = []

        // querySnapShot.forEach((city) => {
        //   users1.push({ key: city.id, name: city.data().foodName })
        // })
        // console.log('users1:' + JSON.stringify(users1))
        // const users2 = []

        // querySnapShot.forEach((documentSnapshot) => {
        //   users2.push({
        //     ...documentSnapshot.data(),
        //     key: documentSnapshot.id,
        //   })
        // })
        // console.log('users2:' + JSON.stringify(users2))

        const newData = []
        Object.keys(items).forEach((key) => {
          // console.log(key) // 👉️ 1, 2, 3, 4,
          // console.log(items[key]) // 👉️ calcium, carbohydrates...

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
  }, [])

  const glycemicValue = useMemo(
    () => ({
      glycemicData,
    }),
    [glycemicData]
  )

  function FoodNutritions() {
    // if (loading) return <Text>Loading...</Text>;
    // if (error) return <Text>Error :(</Text>;

    // prettier-ignore
    return <Fragment>
      <SafeAreaView style={styles.searchPageContainer}>
        {!clicked }

         <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          clicked={clicked}
          setClicked={setClicked}
        />

         {/* {loading ? (
          <ActivityIndicator size="large" />
        ) : ( */}
            <GlycemicList
            searchPhrase={searchPhrase}
            glycemicData={glycemicData}
            foodData={foodData}
            setClicked={setClicked}
            itemId={route.params.itemId}
          />
        {/* )
         } */}
      </SafeAreaView>
    </Fragment>;
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
    // marginTop: 27,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#FFF',
  },
})
