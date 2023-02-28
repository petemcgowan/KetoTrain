import React from "react";

import {AppRegistry} from "react-native";
// import App from "./src/App";
import App from "./src/App";
import {name as appName} from "./app.json";
import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});
console.log("after Apollo client setup");

// AppRegistry.registerComponent(appName, () => App);

const AppWrapper = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

AppRegistry.registerComponent(appName, () => AppWrapper);
