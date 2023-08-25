import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

const httpLink = new HttpLink({
  // uri: 'http://192.168.68.103:4001/keto-graphql', // replace with your GraphQL server URL
  // uri: 'http://localhost:4001/keto-graphql', // replace with your GraphQL server URL
  uri: 'http://ec2-52-23-111-225.compute-1.amazonaws.com:4001/keto-graphql', // replace with your GraphQL server URL
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

export default client
