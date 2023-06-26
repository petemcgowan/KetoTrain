import {
  setAllFoodFacts,
  getAllFoodFacts,
  fillFoodFacts,
  getAllConsumptionLog,
  getConsumptionLogWithFoodFacts,
  replaceConsumptionLogsForToday,
} from './resolverFunctions.mjs'

export const testResolvers = {
  test: () => {
    console.log('Test resolver invoked')
    return 'Test Test successful'
  },
}

export const peteResolvers = {
  test: () => {
    console.log('Pete resolver invoked')
    return 'Pete Test successful'
  },
  allFoodFacts: () => {
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
  addConsumptionLogs: async (args, context, info) => {
    console.log('addConsumptionLogs args' + JSON.stringify(args))
    // Delete existing records for the current day and add new ones
    const newConsumptionLogs = await replaceConsumptionLogsForToday(args.logs)
    return newConsumptionLogs
  },
}

// The resolvers provides a resolver function for each API endpoint
export const resolvers = {
  Query: {
    hello: () => {
      try {
        console.log('Hello world called')
        return 'Hello, world!'
      } catch (error) {
        console.error('Error in hello resolver:', error)
        throw new Error('Failed to resolve hello')
      }
    },
    allFoodFacts: () => {
      return getAllFoodFacts()
    },
    consumptionLogs: () => {
      console.log('consumptionLogs resolver called')
      return getAllConsumptionLog()
    },
  },
  Mutation: {
    fillFoodFacts: () => {
      console.log('resolvers fillFoodFacts')
      return fillFoodFacts()
    },
    addConsumptionLogs: async (_, { logs }) => {
      // Delete the existing records for the current day and add new ones
      const newConsumptionLogs = await replaceConsumptionLogsForToday(logs)

      // Return the new consumption logs
      return newConsumptionLogs
    },
  },
}
