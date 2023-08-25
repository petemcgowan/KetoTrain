import {
  setAllFoodFacts,
  getAllFoodFacts,
  fillFoodFacts,
  getAllConsumptionLog,
  getConsumptionLogWithFoodFacts,
  getAllFoodFactsFavs,
  replaceConsumptionLogs,
  setFavouriteFoodsDB,
  createLogsForPastWeek,
  updatePortionAmount,
  setupFavouriteFoods,
  deleteUserFunction,
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
  deleteUser: deleteUserFunction,
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
      const { user, wasUserCreated } = await getUserInfo(emailAddress)
      console.log('RESOLVER: userInfo.user_id:' + user.user_id)

      // Retrieve water logs
      // const waterConsumptions = await getWaterConsumptions(userInfo.user_id)
      const waterConsumptions = []

      // Retrieve weight logs
      // const weightLogs = await getWeightLogs(userInfo.user_id)
      const weightLogs = []

      // Retrieve food facts with fav flag  (see later, use array instead)
      // const favFoodFacts = await getAllFoodFactsFavs(userId)
      if (wasUserCreated) {
        // Set up favourite foods for the user in the DB
        const favouriteFoods = [
          { foodFactsId: 1864 },
          { foodFactsId: 1880 },
          { foodFactsId: 1478 },
          { foodFactsId: 909 },
          { foodFactsId: 980 },
          { foodFactsId: 526 },
        ]

        const newFavouriteFoods = await setupFavouriteFoods(
          favouriteFoods,
          user.user_id
        )
      }

      // Retrieve food facts
      const foodFacts = await getAllFoodFacts(user.user_id)

      if (wasUserCreated) {
        const loginConsumptionLogs = await createLogsForPastWeek(
          user.user_id,
          consumptionDate,
          foodFacts,
          wasUserCreated
        )
        console.log(
          'Created consumption records for new user (loginConsumptionLogs):' +
            JSON.stringify(loginConsumptionLogs)
        )
      }

      const consumptionLogWithFoodFacts = await getConsumptionLogWithFoodFacts(
        consumptionDate,
        user.user_id
      )

      // Construct and return the data
      return {
        user,
        foodFacts,
        waterConsumptions,
        weightLogs,
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
  updatePortionAmount: async (args, context, info) => {
    try {
      console.log(
        'updatePortionAmount, userId:' +
          args.userId +
          ', args.portionAmount:' +
          args.portionAmount +
          ', args.foodFactsId:' +
          args.foodFactsId
      )

      await updatePortionAmount(
        args.userId,
        args.consumptionDate,
        args.foodFactsId,
        args.portionAmount
      )
      return true
    } catch (e) {
      console.error(e)
      return false
    }
  },
}
