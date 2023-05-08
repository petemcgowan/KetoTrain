/* eslint-disable @typescript-eslint/no-var-requires */

import path from 'path'
import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'

import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import redis from 'redis'
import { createClient } from 'redis'

import Sequelize from 'sequelize'
import connection from './connection.json' assert { type: 'json' }

async function setAllFoodFactsCache(newFoodFacts) {
  try {
    console.log('****setAllFoodFactsCache:Creating client')
    const redisClientJSON = createClient({
      url: 'redis://redis-server:6379',
      port: 6379,
    })

    console.log('****setAllFoodFactsCache:Connecting')
    await redisClientJSON.connect()
    console.log(
      '****setAllFoodFactsCache, Setting the cache with newFoodFacts' +
        JSON.stringify(newFoodFacts)
    )
    await redisClientJSON.json.set('allFoodFactsCache', '.', newFoodFacts)
    await redisClientJSON.quit()
  } catch (error) {
    console.error('setAllFoodFactsCache, error:' + error)
  }
}

async function getAllFoodFactsCache() {
  let allFoodFactsCache = null
  try {
    const redisClientJSON = createClient({
      url: 'redis://redis-server:6379',
      port: 6379,
    })

    await redisClientJSON.connect()
    allFoodFactsCache = await redisClientJSON.json.get('allFoodFactsCache')
    console.log(
      '****value of allFoodFactsCache:' + JSON.stringify(allFoodFactsCache)
    )

    if (!allFoodFactsCache) {
      FoodFacts.findAll().then((allFoodFacts) => {
        console.log(
          '****Has retrieved all help, now cache it' +
            JSON.stringify(allFoodFacts)
        )
        setAllFoodFactsCache(allFoodFacts)
        return allFoodFacts
      })
    } else {
      console.log(
        "****We're return allFoodFactsCache from the cache:" +
          JSON.stringify(allFoodFactsCache)
      )
      return allFoodFactsCache
    }
    redisClientJSON.quit()
  } catch (error) {
    console.error('getAllFoodFactsCache, error:' + error)
  }
}

async function fillFoodFacts() {
  let allFoodFactsCache = null
  try {
    // In case the tables have been deleted, sync will create them
    await sequelize.sync()

    FoodFacts.bulkCreate(
      [
        {
          subHeading: 'Units',
          helpText: `Do you weigh yourself in pounds?  Stones and Pounds?  Kg?  Specify that on this page!\n\n\nDo you measure your height in cm (metric) or feet and inches (imperial)?\n\n\nSpecify here and we'll stick to that unless you change it here...\n`,
          References: [
            {
              shortTitle: null,
              title: null,
              link: null,
            },
          ],
        },
      ],
      {
        include: [References],
      }
    ).then((newFoodFacts) => {
      console
      setAllFoodFactsCache(newFoodFacts)
      return newFoodFacts
    })
    return newFoodFacts
  } catch (error) {
    console.error('fillFoodFacts, error:' + error)
  }
}

// Construct a schema, using GraphQL schema language aka typedefs
var schema = buildSchema(`

type FoodFacts {
  id: Int
  foodName: String
  publicFoodKey: String
  calcium: Float
  carbohydrates: Float
  classification: Float
  energy: Float
  fatTotal: Float
  iodine: Float
  magnesium: Float
  potassium: Float
  protein: Float
  saturatedFat: Float
  sodium: Float
  totalDietaryFibre: Float
  totalSugars: Float
}

type Mutation {
  fillFoodFacts: [FoodFacts]
}

  type Query {
    hello: String
    allFoodFacts: [FoodFacts]
  }
`)

// The resolvers provides a resolver function for each API endpoint
var resolvers = {
  hello: () => {
    return 'Hello world!'
  },
  fillFoodFacts: () => {
    console.log('resolvers fillFoodFacts')
    return fillFoodFacts()
  },
  allFoodFacts: () => {
    return getAllFoodFactsCache()
  },
}

///////////////GRAPHQL/////////////////////////////////////////

const DISABLE_SEQUELIZE_DEFAULTS = {
  timestamps: false,
  freezeTableName: true,
}

const { DataTypes } = Sequelize
export const sequelize = new Sequelize({
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  host: process.env.PGHOST,
  port: connection.port,
  password: process.env.POSTGRES_PASSWORD,
  dialect: 'postgres',
  operatorsAliases: 0,
  freezeTableName: true,
  timestamps: false,
})

export const FoodFacts = sequelize.define(
  'FoodFacts',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    foodName: { type: DataTypes.STRING, allowNull: false },
    publicFoodKey: { type: DataTypes.STRING, allowNull: false },
    calcium: { type: DataTypes.FLOAT, allowNull: false },
    carbohydrates: { type: DataTypes.FLOAT, allowNull: false },
    classification: { type: DataTypes.FLOAT, allowNull: false },
    energy: { type: DataTypes.FLOAT, allowNull: false },
    fatTotal: { type: DataTypes.FLOAT, allowNull: false },
    iodine: { type: DataTypes.FLOAT, allowNull: false },
    magnesium: { type: DataTypes.FLOAT, allowNull: false },
    potassium: { type: DataTypes.FLOAT, allowNull: false },
    protein: { type: DataTypes.FLOAT, allowNull: false },
    saturatedFat: { type: DataTypes.FLOAT, allowNull: false },
    sodium: { type: DataTypes.FLOAT, allowNull: false },
    totalDietaryFibre: { type: DataTypes.FLOAT, allowNull: false },
    totalSugars: { type: DataTypes.FLOAT, allowNull: false },
  },
  DISABLE_SEQUELIZE_DEFAULTS
)

await sequelize.sync()

//////////////STANDARD REST/////////
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 5000

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )
}

///////////////GRAPHQL/////////////////////////////////////////

const graphQLApp = express()
graphQLApp.use(express.json())
graphQLApp.use(cors())
graphQLApp.use(express.urlencoded({ extended: true }))
graphQLApp.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
)
graphQLApp.listen(4001)
console.log('Running a GraphQL API server at $server$:4001/graphql')

///////////////GRAPHQL/////////////////////////////////////////

//////////////////////REDIS START

console.log('before createClient')
const redisClient = await redis.createClient({
  // host: 'redis-server',
  url: 'redis://redis-server:6379',
  port: 6379,
})

//////////////////////REDIS END

async function redisTest() {
  const key = 'cat'
  try {
    await redisClient.set(key, 'Bongo')
    const result = await redisClient.get(key)
    console.log('redisClient.get:' + result)
  } catch (error) {
    console.error(error)
  }
  redisClient.disconnect()
}

// Used as a diagnostic tool
redisClient.connect(() => console.log('Connected to Redis server'))

redisTest()

// REST app listen
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}` /*.yellow.bold*/
  )
)
