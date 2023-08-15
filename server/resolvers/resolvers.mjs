import {
  setAllFoodFacts,
  getAllFoodFacts,
  fillFoodFacts,
  getAllConsumptionLog,
  getConsumptionLogWithFoodFacts,
  getAllFoodFactsFavs,
  replaceConsumptionLogs,
  setFavouriteFoodsDB,
  logFavFoodFactsForPastWeek,
  // getWaterConsumptions,
  // getWeightLogs,
  getUserInfo,
} from './resolverFunctions.mjs'

export const resolvers = {
  test: () => {
    console.log('Keto resolver invoked')
    return 'Keto Test successful'
  },
  allFoodFacts: async (args, context, info) => {
    console.log('allFoodFacts resolver, userId' + args.userId)
    const response = await getAllFoodFacts(args.userId)
    return response
  },
  getFavFoods: async (args, context, info) => {
    try {
      const userId = args.favFoodsInput.userId
      console.log(
        'getFavFoods, user_id:' + userId + ', args:' + JSON.stringify(args)
      )
      // Retrieve food facts with fav flag
      const favFoodFacts = await getAllFoodFactsFavs(userId)
      // Construct and return the data
      return {
        favFoodFacts,
      }
    } catch (error) {
      console.error('Error retrieving fav data:', error)
      throw error
    }
  },
  getUserDashboardData: async (args, context, info) => {
    try {
      const emailAddress = args.userDashboardInput.emailAddress
      const consumptionDate = args.userDashboardInput.consumptionDate
      console.log(
        'getUserDashboardData, emailAddress:' +
          emailAddress +
          ', consumptionDate:' +
          consumptionDate +
          ', args:' +
          JSON.stringify(args)
      )
      // get the user's info (or create it)
      const userInfo = await getUserInfo(emailAddress)
      console.log('RESOLVER: userInfo.user_id:' + userInfo.user_id)

      // Retrieve food facts
      const foodFacts = await getAllFoodFacts(userInfo.user_id)

      // Retrieve water logs
      // const waterConsumptions = await getWaterConsumptions(userInfo.user_id)
      const waterConsumptions = []

      // Retrieve weight logs
      // const weightLogs = await getWeightLogs(userInfo.user_id)
      const weightLogs = []

      // Retrieve food facts with fav flag  (see later, use array instead)
      // const favFoodFacts = await getAllFoodFactsFavs(userId)

      const loginConsumptionLogs = logFavFoodFactsForPastWeek(
        userInfo.user_id,
        consumptionDate,
        foodFacts
      )
      console.log(
        'loginConsumptionLogs:' + JSON.stringify(loginConsumptionLogs)
      )
      // Create a record in consumption log for every favFoodFacts array element
      // that doesn't have a record existing in consumptionLogs based on consumptionDate
      // and fac_foods_id

      //Of course I guess there isn't a need for the DB call favFoodFacts already has it!

      //TODO Find SQL needed to insert aka column names of what consumption logs is doing
      // Update, could you call replaceConsumptionLogs function below? (the resolver function).
      // This is saveConsumptionLogs in the client ( which is called in both deleteTrackerItem,
      // TrackerItem and addTrackerItem, GlycemicItem)

      // Serialize the favourites records here to consumptionLogs
      // const todayFavRecords = await createNewDBfunction!

      const consumptionLogWithFoodFacts = await getConsumptionLogWithFoodFacts(
        consumptionDate,
        userInfo.user_id
      )
      console.log(
        'consumptionLogWithFoodFacts:' +
          JSON.stringify(consumptionLogWithFoodFacts)
      )

      // Merge todaysFavRecords with consumptionLogWithFoodFacts

      // ***********************************************

      // Construct and return the data
      return {
        userInfo,
        foodFacts,
        waterConsumptions,
        weightLogs,
        // favFoodFacts,
        consumptionLogWithFoodFacts,
      }
    } catch (error) {
      console.error('Error retrieving dashboard data:', error)
      throw error
    }
  },
  consumptionLogWithFoodFacts: async (args, context, info) => {
    console.log(
      'consumptionLogWithFoodFacts resolver called' + JSON.stringify(args)
    )
    const { consumptioninput } = args
    return getConsumptionLogWithFoodFacts(
      consumptioninput.consumptionDate,
      consumptioninput.userId
    )
  },
  consumptionLogs: () => {
    console.log('consumptionLogs resolver called')
    return getAllConsumptionLog()
  },
  fillFoodFacts: () => {
    console.log('resolvers fillFoodFacts')
    return fillFoodFacts()
  },
  setFavouriteFoods: async (args, context, info) => {
    console.log('setFavouriteFoods args' + JSON.stringify(args))
    // Delete existing records for the current day and add new ones
    const newFavouriteFood = await setFavouriteFoodsDB(
      args.favouriteFoods,
      args.userId
    )
    return newFavouriteFood
  },
  replaceConsumptionLogs: async (args, context, info) => {
    console.log('replaceConsumptionLogs args' + JSON.stringify(args))
    // Delete existing records for the current day and add new ones
    const newConsumptionLogs = await replaceConsumptionLogs(
      args.addedItems,
      args.dayToUpdate,
      args.toBeDeleted,
      args.toBeInserted
    )
    return newConsumptionLogs
  },
  setGLWaterConsumption: async (args, context, info) => {
    // const waterConsumption = { args }
    console.log('waterConsumption:', args.waterConsumption)
    return setWaterConsumption(args.waterConsumption)
  },
  setGLWeightLogs: async (args, context, info) => {
    const weightLogs = { args }
    console.log('weightLogs:', weightLogs)
    return setWeightLogs(args.weightLogs)
  },
}
