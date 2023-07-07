import { buildSchema } from 'graphql'

// export const testSchema = buildSchema(`
//     type Query {
//         test: String
//         hello: String
//       }
// `)

export const peteSchema = buildSchema(`

  type FoodFacts {
    food_facts_id: Int
    food_name: String
    public_food_key: String
    calcium: Float
    carbohydrates: Float
    classification: Float
    energy: Float
    fat_total: Float
    iodine: Float
    magnesium: Float
    potassium: Float
    protein: Float
    saturated_fat: Float
    sodium: Float
    total_dietary_fibre: Float
    total_sugars: Float
    creation_ts: String
    last_modified_ts: String
    isFavourite: Boolean
  }
  type ConsumptionLogWithFoodFacts {
    consumption_log_id: Int
    consumption_date: String
    food_facts_id: Int
    food_name: String
    public_food_key: String
    carbohydrates: Float
    energy: Float
    fat_total: Float
    protein: Float
    sodium: Float
    total_dietary_fibre: Float
    total_sugars: Float
  }
  type ConsumptionLog {
    consumption_log_id: Int
    food_facts_id: Int
    consumption_date: String
    created_at: String
    updated_at: String
  }
  type FavouriteFoods {
    favourite_foods_id: Int
    food_facts_id: Int
    user_id: String
    created_at: String
    updated_at: String
  }
  type WeightLogs {
    weight_logs_id: ID!
    userId: String!
    weighInTimestamp: String
    kgAmount: Float
  }
  type WaterConsumptions {
    water_consumptions_id: ID!
    userId: String!
    consumptionDate: String
    litreAmount: Float
  }
  type UserDashboardData {
    foodFacts: [FoodFacts]
    waterLogs: [WaterConsumptions]
    weightLogs: [WeightLogs]
  }
  input WeightLogsInput {
    userId: String!
    emailAddress: String!
    weighInTimestamp: String
    kgAmount: Float!
  }
  input WaterConsumptionsInput {
    userId: String!
    consumptionDate: String!
    litreAmount: Float!
  }
  input UserInput {
    userId: String!
    emailAddress: String!
  }
  input ConsumptionLogInput {
    food_facts_id: Int!
    consumption_date: String!
  }
  input ConsumptionLogFoodFactsInput {
    userId: String!
    consumptionDate: String!
  }
  input FavouriteFoodsInput {
    food_facts_id: Int!
    is_favourite: Boolean!
  }
  type Query {
    test: String
    allFoodFacts(userId: String!): [FoodFacts]
    getWaterWeightLogs(userId: String!): [FoodFacts]
    consumptionLogs: [ConsumptionLog]
    consumptionLogWithFoodFacts(consumptioninput: ConsumptionLogFoodFactsInput!): [ConsumptionLogWithFoodFacts]
  }
  type Mutation {
    fillFoodFacts: [FoodFacts]
    replaceConsumptionLogs(logs: [ConsumptionLogInput]!, dayToUpdate: String!, toBeDeleted: Boolean!, toBeInserted: Boolean! ): [ConsumptionLog]
    setFavouriteFoods(favouriteFoods: [FavouriteFoodsInput]!, userId: String!): FavouriteFoods
    setGLWaterConsumption(waterConsumptions: [WaterConsumptionsInput!]!): [WaterConsumptions]!
    setGLWeightLogs(weightLogs: [WeightLogsInput!]!): [WeightLogs]!
    }
`)

// Construct a schema, using GraphQL schema language aka typedefs
// export var schema = buildSchema(`

// type FoodFacts {
//   food_facts_id: Int
//   food_name: String
//   public_food_key: String
//   calcium: Float
//   carbohydrates: Float
//   classification: Float
//   energy: Float
//   fat_total: Float
//   iodine: Float
//   magnesium: Float
//   potassium: Float
//   protein: Float
//   saturated_fat: Float
//   sodium: Float
//   total_dietary_fibre: Float
//   total_sugars: Float
//   creation_ts: String
//   last_modifed_ts: String
// }

// type ConsumptionLog {
//   consumption_log_id: Int
//   food_facts_id: Int
//   consumption_date: String
//   created_at: String
//   updated_at: String
// }

// input ConsumptionLogInput {
//   food_facts_id: Int!
//   consumption_date: String!
// }

// type Mutation {
//   fillFoodFacts: [FoodFacts]
//   replaceConsumptionLogs(logs: [ConsumptionLogInput]!, dayToUpdate: String! ): [ConsumptionLog]
// }

// type Query {
//   hello: String
//   allFoodFacts: [FoodFacts]
//   consumptionLogs: [ConsumptionLog]
// }

// `)
