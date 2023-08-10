/* eslint-disable @typescript-eslint/no-var-requires */

import path from 'path'
import express from 'express'
import { graphqlHTTP } from 'express-graphql'

import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'

import { sequelize } from './db/sequelizeSetup.mjs'

import { resolvers } from './resolvers/resolvers.mjs'
import { schema } from './schema/schema.mjs'

await sequelize.sync()

const graphQLApp = express()
graphQLApp.use(morgan('combined'))
graphQLApp.use(cors())
graphQLApp.use(express.json())
graphQLApp.use(express.urlencoded({ extended: true }))

graphQLApp.use(
  '/keto-graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
    customFormatErrorFn: (error) => {
      console.error('Error in keto-graphql customFormatErrorFn ' + error)
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
