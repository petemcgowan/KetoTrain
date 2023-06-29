import {
  setAllFoodFacts,
  getAllFoodFacts,
  fillFoodFacts,
  getAllConsumptionLog,
  getConsumptionLogWithFoodFacts,
  replaceConsumptionLogs,
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
  allFoodFacts: () => {
    console.log('allFoodFacts resolver')
    return getAllFoodFacts()
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
