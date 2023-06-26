import { buildSchema } from 'graphql'

export const testSchema = buildSchema(`
    type Query {
        test: String
        hello: String
      }
`)

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
  type Query {
    test: String
    allFoodFacts: [FoodFacts]
    consumptionLogs: [ConsumptionLog]
    consumptionLogWithFoodFacts(consumptioninput: ConsumptionLogFoodFactsInput!): [ConsumptionLogWithFoodFacts]
  }
  type Mutation {
    fillFoodFacts: [FoodFacts]
    addConsumptionLogs(logs: [ConsumptionLogInput]!): [ConsumptionLog]
  }
`)

// Construct a schema, using GraphQL schema language aka typedefs
export var schema = buildSchema(`

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
  last_modifed_ts: String
}

type ConsumptionLog {
  consumption_log_id: Int
  food_facts_id: Int
  consumption_date: String
  created_at: String
  updated_at: String
}

input ConsumptionLogInput {
  food_facts_id: Int!
  consumption_date: String!
}

type Mutation {
  fillFoodFacts: [FoodFacts]
  addConsumptionLogs(logs: [ConsumptionLogInput]!): [ConsumptionLog]
}

type Query {
  hello: String
  allFoodFacts: [FoodFacts]
  consumptionLogs: [ConsumptionLog]
}

`)
