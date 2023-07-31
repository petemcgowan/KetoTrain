import React, { useEffect, useContext } from 'react'
import { View, StyleSheet, Text, Dimensions } from 'react-native'
import LottieView from 'lottie-react-native'
import { useNavigation } from '@react-navigation/native'
import TrackerContext from '../state/TrackerContext'
import UserContext from '../state/UserContext'
import axios from 'axios'
import { ThemeContext } from '../state/ThemeContext'

const { height, width } = Dimensions.get('screen')

export default function LoadingScreen() {
  const navigation = useNavigation()
  const { setTrackerItems, setFoodData, setSearchFoodList, setFavFoodList } =
    useContext(TrackerContext)
  const { emailAddress, consumptionDate, setUserId } = useContext(UserContext)
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useContext was used outside of the theme provider')
  }
  const { theme } = context
  const styles = getStyles(theme)

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
              ? theme.badBackground
              : item.carbohydrates > 11
              ? theme.middlingBackground
              : theme.tableBackground,
          carbohydrates: Math.round(item.carbohydrates),
        }))
        console.log(
          'Loading Screen, theme.middlingBackground:' +
            theme.middlingBackground +
            ', theme.tableBackground:' +
            theme.tableBackground +
            ', theme.badBackground:' +
            theme.badBackground
        )
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
        //   'findDuplicates searchFoodList:' +
        //     JSON.stringify(findDuplicates(searchFoodList))
        // )

        const favFoodList = processedFoodData.filter((item) => item.isFavourite)
        setFavFoodList(favFoodList)
        // console.log(
        //   'Loading Screen, favFoodList:' + JSON.stringify(favFoodList)
        // )

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

        // add isFavourite values to the tracker items
        const updatedConsumptionLogWithFoodFacts =
          consumptionLogWithFoodFacts.map((consumptionItem) => {
            const correspondingSearchItem = searchFoodList.find(
              (searchItem) => searchItem.foodName === consumptionItem.food_name
            )

            if (correspondingSearchItem) {
              return {
                ...consumptionItem,
                isFavourite: correspondingSearchItem.isFavourite,
              }
            }

            return {
              ...consumptionItem,
              isFavourite: false,
            }
          })

        // set Tracker items (for tracker screen)
        if (Array.isArray(updatedConsumptionLogWithFoodFacts)) {
          setTrackerItems(
            updatedConsumptionLogWithFoodFacts.map((item) => {
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
                    ? theme.badBackground
                    : item.carbohydrates > 11
                    ? theme.middlingBackground
                    : theme.tableBackground,
                portionAmount: 0,
                consumptionDate: new Date(parseInt(item.consumption_date, 10)),
                isFavourite: item.isFavourite,
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
      navigation.navigate('MainApp')
    }, 1600) // wait
    // navigation.navigate('MainApp')
    return () => clearTimeout(timeoutId) // cleanup on component unmount
  }, [navigation])

  return (
    <View style={styles.container}>
      <View style={styles.lottieContainer}>
        <LottieView
          ref={(animation) => {
            this.animation = animation
          }}
          source={require('../assets/lottie/97930-loading.json')}
          autoPlay
          loop
          onAnimationFinish={() => {}}
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

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: theme.viewBackground, //  '#F5F5DC', // '#D8EAD2' alt colour green
      alignItems: 'center',
      justifyContent: 'center',
    },
    textContainer: {
      height: 80,
      backgroundColor: theme.buttonBackground,
      justifyContent: 'center',
      paddingHorizontal: 20,
      borderRadius: 80,
    },
    settingUpText: {
      color: theme.buttonText,
      fontSize: 20,
      fontWeight: '500',
      textAlign: 'center',
    },
    lottieContainer: {
      height: 200,
    },
  })
