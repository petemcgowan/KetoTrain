import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import Config from 'react-native-config'

// Fallback to localhost if Config fails
const uri = Config.GRAPHQL_URL || 'http://localhost:4001/keto-graphql'

const link = new HttpLink({
  uri: uri,
})

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

export default client
