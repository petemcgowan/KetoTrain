import {
  setAllFoodFacts,
  getAllFoodFacts,
  fillFoodFacts,
  getAllConsumptionLog,
  getConsumptionLogWithFoodFacts,
  replaceConsumptionLogs,
  setFavouriteFoodsDB,
  getWaterConsumptions,
  getWeightLogs,
} from './resolverFunctions.mjs'

// export const testResolvers = {
//   test: () => {
//     console.log('Test resolver invoked')
//     return 'Test Test successful'
//   },
// }

export const peteResolvers = {
  test: () => {
    console.log('Pete resolver invoked')
    return 'Pete Test successful'
  },
  allFoodFacts: async (args, context, info) => {
    console.log('allFoodFacts resolver, userId' + args.userId)
    const response = await getAllFoodFacts(args.userId)
    return response
  },
  getUserDashboardData: async (args, context, info) => {
    try {
      const userId = args.userId
      console.log('userId:' + userId)

      // Retrieve food facts
      const foodFacts = await getAllFoodFacts(userId)

      // Retrieve water logs
      const waterConsumptions = await getWaterConsumptions(userId)

      // Retrieve weight logs
      const weightLogs = await getWeightLogs(userId)

      // Construct and return the data
      return {
        foodFacts,
        waterConsumptions,
        weightLogs,
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
      args.logs,
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

// The resolvers provides a resolver function for each API endpoint
// export const resolvers = {
//   Query: {
//     hello: () => {
//       try {
//         console.log('Hello world called')
//         return 'Hello, world!'
//       } catch (error) {
//         console.error('Error in hello resolver:', error)
//         throw new Error('Failed to resolve hello')
//       }
//     },
//     allFoodFacts: () => {
//       return getAllFoodFacts()
//     },
//     consumptionLogs: () => {
//       console.log('consumptionLogs resolver called')
//       return getAllConsumptionLog()
//     },
//   },
//   Mutation: {
//     fillFoodFacts: () => {
//       console.log('resolvers fillFoodFacts')
//       return fillFoodFacts()
//     },
//     replaceConsumptionLogs: async (_, { logs, dayToUpdate }) => {
//       // Delete the existing records for the current day and add new ones
//       const newConsumptionLogs = await replaceConsumptionLogs(logs, dayToUpdate)

//       // Return the new consumption logs
//       return newConsumptionLogs
//     },
//   },
// }
