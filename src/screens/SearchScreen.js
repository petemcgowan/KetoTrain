import React, {Fragment, useState, useEffect, useContext} from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  View,
} from "react-native";

import GlycemicList from "../components/GlycemicList";
import SearchBar from "../components/SearchBar";
// import glycemicData from "../data/usdaNutrition.json";

import styled, {withTheme} from "styled-components";
import {gql, useQuery} from "@apollo/client";
import GlycemicContext from "../state/GlycemicContext";

const SearchScreen = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const {glycemicData} = useContext(GlycemicContext);

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
  // const {loading, error, data} = useQuery(GET_ALL_FOOD_NUTRITIONS);

  useEffect(() => {
    console.log("SearchScreen, useEffect");
  }, []);

  function FoodNutritions() {
    // if (loading) return <Text>Loading...</Text>;
    // if (error) return <Text>Error :(</Text>;

    // let foodNutritionsNew = [];
    // // todo using local for now
    // // glycemicData.foodnutritions.map(item => {
    // glycemicData.map(item => {
    //   foodNutritionsNew.push(item);
    // });
    // foodNutritionsNew.sort((a, b) =>
    //   a.description.localeCompare(b.description),
    // );

    // prettier-ignore
    return <Fragment>
      <SafeAreaView style={styles.searchPageContainer}>
        {!clicked }

         <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          clicked={clicked}
          setClicked={setClicked}
        />
         {/* {loading ? (
          <ActivityIndicator size="large" />
        ) : ( */}
            <GlycemicList
            searchPhrase={searchPhrase}
            glycemicData={glycemicData}
            setClicked={setClicked}
          />
        {/* )
         } */}
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
      <FoodNutritions />
    </View>
  );
};

export default withTheme(SearchScreen);

const ListTitle = styled(Text)`
  margin-bottom: ${({theme}) => theme.metrics.extraSmallSize}px;
  /* font-family: CircularStd-Bold; */
  font-size: ${({theme}) => theme.metrics.largeSize * 1.1}px;
  color: ${({theme}) => theme.colors.textColor};
`;

const styles = StyleSheet.create({
  searchPageContainer: {
    // marginTop: 27,
    justifyContent: "center",
    alignItems: "center",
    color: "#FFF",
    backgroundColor: "#000",
  },

  description: {
    // fontFamily: "Karla-Light",   // this isn't being picked up (when commented in)
    width: "100%",
    marginTop: 20,
    fontSize: 25,
    // fontWeight: 'bold',
    marginLeft: "10%",
    color: "#FFF",
  },
});
// greenVibe: "rgba(59, 73, 55, 1)",  // complimentary  rgb(69,55,73)
// offWhiteVibe: "rgba(201, 189, 187, 1)"
// tealVibe "  rgba(138, 149, 143, 1)"   complimentary=rgb(149,138,144)   comp2=rgb(124,131,134)
// comp to Teal "rgba (124, 131, 134, 1)"
