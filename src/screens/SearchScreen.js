import React, {Fragment, useState} from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ActivityIndicator,
  View,
} from "react-native";

import GlycemicList from "../components/GlycemicList";
import SearchBar from "../components/SearchBar";
import glycemicData from "../data/usdaNutrition.json";
import styled, {withTheme} from "styled-components";
import {gql, useQuery} from "@apollo/client";

const SearchScreen = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  // const {loading, error, data} = useQuery(EXCHANGE_RATES);

  const GET_ALL_FOOD_NUTRITIONS = gql`
    query {
      foodnutritions {
        foodCode
        description
        fiberAmt
        giAmt
        glAmt
        carbAmt
        protein
        fatAmt
        satFatAmt
        monoFatAmt
        polyFatAmt
        energyAmt
        sugarsAmt
        sodiumAmt
      }
    }
  `;

  // const glycemicDataNew = data.foodNutritions;
  // const glycemicDataParsed = JSON.parse(glycemicDataNew);
  // console.log("glycemicDataParsed" + JSON.stringify(glycemicDataParsed));
  // const GET_ALL_FOOD_NUTRITIONS = gql`
  //   query {
  //     foodnutritions {
  //       foodCode
  //       description
  //       fiberAmt
  //       giAmt
  //       glAmt
  //       carbAmt
  //       protein
  //       fatAmt
  //       satFatAmt
  //       monoFatAmt
  //       polyFatAmt
  //       energyAmt
  //       sugarsAmt
  //       sodiumAmt
  //     }
  //   }
  // `;
  // Load GraphQL nutrition data
  // console.log("Loading GraphQL nutrition data...");
  // const client = new ApolloClient({
  //   uri: "http://localhost:4000/graphql",
  //   cache: new InMemoryCache(),
  // });

  function ExchangeRates() {
    const {loading, error, data} = useQuery(GET_ALL_FOOD_NUTRITIONS);

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error :(</Text>;

    console.log("data:" + JSON.stringify(data));

    let foodNutritionsNew = [];

    data.foodnutritions.map(item => {
      foodNutritionsNew.push(item);
    });
    foodNutritionsNew.sort((a, b) =>
      a.description.localeCompare(b.description),
    );

    // prettier-ignore
    return <Fragment>
      <SafeAreaView style={styles.searchPageContainer}>
        {!clicked && <ListTitle>Glycemic Index</ListTitle>}

         <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          clicked={clicked}
          setClicked={setClicked}
        />
         {loading ? (
          <ActivityIndicator size="large" />
        ) : (
            <GlycemicList
            searchPhrase={searchPhrase}
            glycemicData={foodNutritionsNew}
            setClicked={setClicked}
          />
        )
         }
         {/* {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <Text style={{color: "white"}}>{JSON.stringify(data.foodnutritions)}</Text>
        )
         } */}
        {/* {loading ? (
          <ActivityIndicator size="large" />
        )
         : (
          {
            <GlycemicList
            searchPhrase={searchPhrase}
            glycemicData={data.foodnutritions}
            setClicked={setClicked}
          />
          }
        )} */}
      </SafeAreaView>
    </Fragment>;

    // return data.foodnutritions.map(
    //   ({description, fiberAmt}: {description: string, fiberAmt: number}) => (
    //     <View key={description}>
    //       <Text style={{color: "white"}}>
    //         {description}: {fiberAmt}
    //       </Text>
    //     </View>
    //   ),
    // );
  }
  return (
    <View>
      <ExchangeRates />
    </View>
  );
};

export default withTheme(SearchScreen);

const ListTitle = styled(Text)`
  margin-bottom: ${({theme}) => theme.metrics.extraSmallSize}px;
  font-family: CircularStd-Bold;
  font-size: ${({theme}) => theme.metrics.largeSize * 1.1}px;
  color: ${({theme}) => theme.colors.textColor};
`;

const styles = StyleSheet.create({
  searchPageContainer: {
    justifyContent: "center",
    alignItems: "center",
    color: "#FFF",
    backgroundColor: "#000",
  },
  description: {
    fontFamily: "Karla-Light",
    width: "100%",
    marginTop: 20,
    fontSize: 25,
    // fontWeight: 'bold',
    marginLeft: "10%",
    color: "#FFF",
  },
});
