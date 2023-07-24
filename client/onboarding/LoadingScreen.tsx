import React, { useEffect, useContext } from 'react'
import { View, StyleSheet, Text, Dimensions } from 'react-native'
import LottieView from 'lottie-react-native'
import { useNavigation } from '@react-navigation/native'
import TrackerContext from '../state/TrackerContext'
import UserContext from '../state/UserContext'
import axios from 'axios'

const { height, width } = Dimensions.get('screen')

export default function LoadingScreen() {
  const navigation = useNavigation()
  const { setTrackerItems, setFoodData, setSearchFoodList, setFavFoodList } =
    useContext(TrackerContext)
  const { emailAddress, consumptionDate, setUserId } = useContext(UserContext)

  const findDuplicates = (data) => {
    const publicFoodKeys = data.map((item) => item.publicFoodKey)
    const duplicates = data.filter(
      (item, index) =>
        publicFoodKeys.indexOf(item.publicFoodKey) !== index &&
        publicFoodKeys.lastIndexOf(item.publicFoodKey) === index
    )

    return duplicates
  }

  useEffect(() => {
    console.log('App, useEffect')
    // const userId = 'peteburquette@gmail.com'
    // const consumptionDate = '2023-07-07'
    // TODO Pete: This should be set by the Google login
    // setUserId('peteburquette@gmail.com')
    if (emailAddress) {
      console.log(`User ID is ${emailAddress}`)
    }
    console.log(`Consumption date is ${consumptionDate}`)

    const getUserDashboardData = async () => {
      try {
        const userDashboardDataResponse = await axios({
          url: 'http://localhost:4001/pete-graphql',
          method: 'post',
          data: {
            query: `
              query {
                getUserDashboardData(
                  userDashboardInput: {
                    emailAddress: "${emailAddress}",
                    consumptionDate: "${consumptionDate}"
                  }
                ) {
                  userInfo {
                    userId: user_id
                    userName: user_name
                    lastLoginDate: last_login_date
                  }
                  foodFacts {
                    foodFactsId: food_facts_id
                    foodName: food_name
                    publicFoodKey: public_food_key
                    calcium
                    carbohydrates
                    classification
                    energy
                    fatTotal: fat_total
                    iodine
                    magnesium
                    potassium
                    protein
                    saturatedFat: saturated_fat
                    sodium
                    totalDietaryFibre: total_dietary_fibre
                    totalSugars: total_sugars
                    isFavourite
                  }
                  waterConsumptions {
                    water_consumptions_id
                    user_id
                    consumption_date
                    litre_amount
                  }
                  weightLogs {
                    weight_logs_id
                    user_id
                    weigh_in_timestamp
                    kg_amount
                  }
                  consumptionLogWithFoodFacts {
                    consumption_log_id
                    consumption_date
                    food_facts_id
                    food_name
                    public_food_key
                    carbohydrates
                    energy
                    fat_total
                    protein
                    sodium
                    total_dietary_fibre
                    total_sugars
                  }
                }
              }
            `,
          },
        })
        // augment the return  with calculated values
        const foodFacts =
          userDashboardDataResponse.data.data.getUserDashboardData.foodFacts
        // console.log('foodFacts:' + JSON.stringify(foodFacts))
        const processedFoodData = foodFacts.map((item) => ({
          ...item,
          carbBackgroundColor:
            item.carbohydrates > 22
              ? '#1A0546'
              : item.carbohydrates > 11
              ? '#5C6500'
              : '#350244',
          carbohydrates: Math.round(item.carbohydrates),
        }))

        setFoodData(processedFoodData)

        const searchFoodList = processedFoodData.map((item) => ({
          foodName: item.foodName,
          foodFactsId: item.foodFactsId,
          publicFoodKey: item.publicFoodKey,
          isFavourite: item.isFavourite,
          carbBackgroundColor: item.carbBackgroundColor,
          carbohydrates: item.carbohydrates,
        }))
        // console.log('searchFoodList:' + JSON.stringify(searchFoodList))

        setSearchFoodList(searchFoodList)

        // console.log(
        //   'findDuplicates processedFoodData:' +
        //     JSON.stringify(findDuplicates(processedFoodData))
        // )
        console.log(
          'findDuplicates searchFoodList:' +
            JSON.stringify(findDuplicates(searchFoodList))
        )

        const favFoodList = processedFoodData.filter((item) => item.isFavourite)
        setFavFoodList(favFoodList)
        console.log('favFoodList:' + JSON.stringify(favFoodList))

        // Create favourites view array

        setUserId(
          parseInt(
            userDashboardDataResponse.data.data.getUserDashboardData.userInfo
              .userId,
            10
          )
        )
        const consumptionLogWithFoodFacts =
          userDashboardDataResponse.data.data.getUserDashboardData
            .consumptionLogWithFoodFacts

        if (Array.isArray(consumptionLogWithFoodFacts)) {
          setTrackerItems(
            consumptionLogWithFoodFacts.map((item) => {
              return {
                id: item.consumption_log_id.toString(),
                foodFactsId: item.food_facts_id.toString(),
                description: item.food_name,
                carbAmt: item.carbohydrates,
                fiberAmt: item.total_dietary_fibre,
                proteinAmt: item.protein,
                fatAmt: item.fat_total,
                energyAmt: item.energy,
                sugarsAmt: item.total_sugars,
                sodiumAmt: item.sodium,
                carbBackgroundColor:
                  item.carbohydrates > 22
                    ? '#1A0546'
                    : item.carbohydrates > 11
                    ? '#5C6500'
                    : '#350244',
                portionAmount: 0, // Placeholder value as portionAmount is not available in the response
                consumptionDate: new Date(parseInt(item.consumption_date, 10)),
              }
            })
          )
        }
      } catch (error) {
        console.error('Error fetching food facts:', error)
      }
    }

    getUserDashboardData()
    const timeoutId = setTimeout(() => {
      console.log('about to navigate to MainApp')
      // navigation.navigate('MainApp')
    }, 5000) // wait 2.8 seconds
    // navigation.navigate('MainApp')
    return () => clearTimeout(timeoutId) // cleanup on component unmount
  }, [navigation])

  return (
    <View style={styles.container}>
      <View style={styles.lottieContainer}>
        <LottieView
          source={require('../assets/lottie/97930-loading.json')}
          autoPlay
          // loop
          style={{ width: width * 0.6, height: height * 0.3 }}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.settingUpText}>Setting up your data...</Text>
      </View>
    </View>
  )
}
// rgb(16, 7, 159) dark blue
// rgb(1, 179, 136) light green
// rgb(91 194 231) pale blue
// rgb(255, 191, 63) yellow

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5F5DC', // '#D8EAD2' best/green
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    height: 80,
    backgroundColor: 'rgb(91,194,231)',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 80,
  },
  settingUpText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
  lottieContainer: {
    height: 200,
  },
})
