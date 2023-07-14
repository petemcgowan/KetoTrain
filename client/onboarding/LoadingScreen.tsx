import React, { useEffect, useContext } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import LottieView from 'lottie-react-native'
import { useNavigation } from '@react-navigation/native'
import TrackerContext from '../state/TrackerContext'
import UserContext from '../state/UserContext'
import axios from 'axios'

export default function LoadingScreen() {
  const navigation = useNavigation()
  const { setTrackerItems, setFoodData } = useContext(TrackerContext)
  const { emailAddress, consumptionDate, setUserId } = useContext(UserContext)

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
        console.log(
          'getUserDashboardData.data.data.getUserDashboardData.userInfo:' +
            JSON.stringify(
              userDashboardDataResponse.data.data.getUserDashboardData.userInfo
            )
        )

        setFoodData(
          userDashboardDataResponse.data.data.getUserDashboardData.foodFacts
        )
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
        console.log(
          'consumptionLogWithFoodFacts:' +
            JSON.stringify(consumptionLogWithFoodFacts)
        )
        console.log(
          'waterConsumptions:' +
            JSON.stringify(
              userDashboardDataResponse.data.data.getUserDashboardData
                .waterConsumptions
            )
        )
        console.log(
          'weightLogs:' +
            JSON.stringify(
              userDashboardDataResponse.data.data.getUserDashboardData
                .weightLogs
            )
        )

        if (Array.isArray(consumptionLogWithFoodFacts)) {
          setTrackerItems(
            consumptionLogWithFoodFacts.map((item) => {
              return {
                id: item.consumption_log_id.toString(),
                foodFactsId: item.food_facts_id.toString(),
                description: item.food_name,
                carbAmt: item.carbohydrates,
                giAmt: 30, // Placeholder value as giAmt is not available in the response
                glAmt: 30, // Placeholder value as glAmt is not available in the response
                fiberAmt: item.total_dietary_fibre,
                proteinAmt: item.protein,
                fatAmt: item.fat_total,
                energyAmt: item.energy,
                sugarsAmt: item.total_sugars,
                sodiumAmt: item.sodium,
                giBackgroundColor: '#350244', // Placeholder value as giBackgroundColor is not available in the response
                glBackgroundColor: '#350244', // Placeholder value as glBackgroundColor is not available in the response
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

        // return userDashboardDataResponse.data.data.allFoodFacts
      } catch (error) {
        console.error('Error fetching food facts:', error)
      }
    }

    getUserDashboardData()
    const timeoutId = setTimeout(() => {
      console.log('about to navigate to MainApp')
      navigation.navigate('MainApp')
    }, 2000) // wait 2 seconds
    // navigation.navigate('MainApp')
    return () => clearTimeout(timeoutId) // cleanup on component unmount
  }, [navigation])

  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <Text>Setting up your data...</Text>
      </View>
      <View style={styles.lottie}>
        <LottieView
          source={require('../assets/lottie/97930-loading.json')}
          autoPlay
          loop
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#2f5da3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    height: 100,
  },
  lottie: {
    height: 200,
  },
})
