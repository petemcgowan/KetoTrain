import { buildSchema } from 'graphql'

export const schema = buildSchema(`

  type UserInfo {
    user_id: ID!
    email_address: String!
    user_name: String
    last_login_date: String
  }
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
    user_id: Int
    default_fl: Boolean
    portion_count: Int
  }
  type ConsumptionLogs {
    consumption_log_id: Int
    food_facts_id: Int
    consumption_date: String
    user_id: Int
  }
  type FavouriteFoods {
    favourite_foods_id: Int
    food_facts_id: Int
    user_id: Int
  }
  type WeightLogs {
    weight_logs_id: ID!
    user_id: Int!
    weigh_in_timestamp: String
    kg_amount: Float
  }
  type WaterConsumptions {
    water_consumptions_id: ID!
    user_id: Int!
    consumption_date: String
    litre_amount: Float
  }
  type FavFoodsData {
    favFoodFacts: [FoodFacts]
  }
  type UserDashboardData {
    user: UserInfo
    foodFacts: [FoodFacts]
    waterConsumptions: [WaterConsumptions]
    weightLogs: [WeightLogs]
    consumptionLogWithFoodFacts: [ConsumptionLogWithFoodFacts]
  }
  input WeightLogsInput {
    userId: Int!
    weighInTimestamp: String
    kgAmount: Float!
  }
  input WaterConsumptionsInput {
    userId: Int!
    consumptionDate: String!
    litreAmount: Float!
  }
  input UserInput {
    userId: Int!
    emailAddress: String!
  }
  input UserDashboardInput {
    emailAddress: String!
    consumptionDate: String!
  }
  input FavFoodsInput {
    userId: Int!
  }
  input ConsumptionLogInput {
    foodFactsId: Int!
    consumptionDate: String!
    userId: Int!
    defaultFl: Boolean!
    portionCount: Int!
  }
  input ConsumptionLogFoodFactsInput {
    userId: Int!
    consumptionDate: String!
  }
  input FavouriteFoodsInput {
    foodFactsId: Int!
    isFavourite: Boolean!
  }
  type Query {
    test: String
    allFoodFacts(userId: Int!): [FoodFacts]
    getFavFoods(favFoodsInput: FavFoodsInput!): FavFoodsData
    getUserDashboardData(userDashboardInput: UserDashboardInput!): UserDashboardData
    consumptionLogWithFoodFacts(consumptioninput: ConsumptionLogFoodFactsInput!): [ConsumptionLogWithFoodFacts]
  }
  type Mutation {
    fillFoodFacts: [FoodFacts]
    replaceConsumptionLogs(addedItems: [ConsumptionLogInput]!, dayToUpdate: String!, toBeDeleted: Boolean!, toBeInserted: Boolean! ): [ConsumptionLogs]
    setFavouriteFoods(favouriteFoods: [FavouriteFoodsInput]!, userId: Int!): FavouriteFoods
    deleteUser(userId: Int!): Boolean!
    setGLWaterConsumption(waterConsumptions: [WaterConsumptionsInput!]!): [WaterConsumptions]!
    setGLWeightLogs(weightLogs: [WeightLogsInput!]!): [WeightLogs]!
    updatePortionAmount(userId: Int!, consumptionDate: String!, foodFactsId: Int!, portionAmount: Int!): Boolean
    }
`)
