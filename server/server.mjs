/* eslint-disable @typescript-eslint/no-var-requires */

import path from 'path'
import express from 'express'
import { graphqlHTTP } from 'express-graphql'

import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'

import { sequelize } from './db/sequelizeSetup.mjs'
// import { resolvers } from './resolvers/resolvers.mjs'
// import { schema } from './schema/schema.mjs'

import { peteResolvers } from './resolvers/resolvers.mjs'
import { peteSchema } from './schema/schema.mjs'

await sequelize.sync()

// import Sequelize from 'sequelize'
// import connection from './connection.json' assert { type: 'json' }
// const connection = require('./connection.json')

// module.exports = {
//   getAllConsumptionLogCache,
//   setAllConsumptionLogCache,
// }

///////////////GRAPHQL/////////////////////////////////////////

// const DISABLE_SEQUELIZE_DEFAULTS = {
//   timestamps: false,
//   freezeTableName: true,
// }

// const { DataTypes } = Sequelize
// export const sequelize = new Sequelize({
//   database: process.env.POSTGRES_DB,
//   username: process.env.POSTGRES_USER,
//   host: process.env.PGHOST,
//   port: 5432,
//   password: process.env.POSTGRES_PASSWORD,
//   dialect: 'postgres',
//   operatorsAliases: 0,
//   freezeTableName: true,
//   timestamps: false,
// })

// await sequelize.sync()

//////////////STANDARD REST/////////
// const app = express()
// app.use(express.json())
// app.use(cors())
// app.use(express.urlencoded({ extended: true }))

// const PORT = process.env.PORT || 5000

// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'))
// }

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('client/build'))

//   app.get('*', (req, res) =>
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//   )
// }

///////////////GRAPHQL/////////////////////////////////////////

const graphQLApp = express()
graphQLApp.use(morgan('combined'))
graphQLApp.use(cors())
graphQLApp.use(express.json())
graphQLApp.use(express.urlencoded({ extended: true }))

// graphQLApp.use(
//   '/graphql',
//   graphqlHTTP({
//     schema: schema,
//     rootValue: resolvers,
//     graphiql: true,
//     customFormatErrorFn: (error) => {
//       console.error('Error in graphql customFormatErrorFn ' + error)
//       return {
//         message: error.message,
//         locations: error.locations,
//         stack: error.stack ? error.stack.split('\n') : [],
//         path: error.path,
//       }
//     },
//   })
// )

// graphQLApp.use(
//   '/test-graphql',
//   graphqlHTTP({
//     schema: testSchema,
//     rootValue: testResolvers,
//     graphiql: true,
//     customFormatErrorFn: (error) => {
//       console.error('Error in test-graphql customFormatErrorFn ' + error)
//       return {
//         message: error.message,
//         locations: error.locations,
//         stack: error.stack ? error.stack.split('\n') : [],
//         path: error.path,
//       }
//     },
//   })
// )

graphQLApp.use(
  '/pete-graphql',
  graphqlHTTP({
    schema: peteSchema,
    rootValue: peteResolvers,
    graphiql: true,
    customFormatErrorFn: (error) => {
      console.error('Error in pete-graphql customFormatErrorFn ' + error)
      return {
        message: error.message,
        locations: error.locations,
        stack: error.stack ? error.stack.split('\n') : [],
        path: error.path,
      }
    },
  })
)

graphQLApp.listen(4001, () => {
  console.log('Running a GraphQL API server at $server$:4001/graphql')
})
// ///////////////GRAPHQL/////////////////////////////////////////

//////////////////////REDIS START

// console.log('before createClient')
// const redisClient = await redis.createClient({
//   // host: 'redis-server',
//   url: 'redis://redis-server:6379',
//   port: 6379,
// })

//////////////////////REDIS END

// async function redisTest() {
//   const key = 'cat'
//   try {
//     await redisClient.set(key, 'Bongo')
//     const result = await redisClient.get(key)
//     console.log('redisClient.get:' + result)
//   } catch (error) {
//     console.error(error)
//   }
//   redisClient.disconnect()
// }

// Used as a diagnostic tool
// redisClient.connect(() => console.log('Connected to Redis server'))

// redisTest()

// REST app listen
// app.listen(
//   PORT,
//   console.log(
//     `Server running in ${process.env.NODE_ENV} mode on port ${PORT}` /*.yellow.bold*/
//   )
// )
