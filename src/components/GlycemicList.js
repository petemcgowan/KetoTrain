import React, {useContext, useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Animated,
  SafeAreaView,
  Easing,
} from "react-native";

import TrackerContext from "../TrackerContext";
import styled, {withTheme} from "styled-components";
import GlycemicItem from "./GlycemicItem";
import {getGLResult} from "../utils/GlycemicUtils";

// the filter
const GlycemicList = ({searchPhrase, glycemicData, setClicked}) => {
  const {trackerItems, setTrackerItems, setTotalCarbs, setTotalGILoad} =
    useContext(TrackerContext);
  const [searchItemSelected, setSearchItemSelected] = useState(0);

  console.log("GlycemicList, searchPhrase:" + searchPhrase);

  let [opacityAnimatedValue, setOpacityAnimatedValue] = useState(
    new Animated.Value(0),
  );

  const funk = () => {
    Animated.sequence([
      Animated.timing(opacityAnimatedValue, {
        toValue: 1,
        easing: Easing.inOut(Easing.ease),
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnimatedValue, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animatedStyle = {
    opacity: opacityAnimatedValue,
  };

  // item is an entry in the glycemicData/data list
  const renderItem = ({item}) => {
    // const giLoad = getGLResult(item.carbAmt, item.giAmt, item.glAmt);
    // when no input, show all
    if (searchPhrase === "") {
      return (
        <Row>
          <GlycemicItem
            description={item.description}
            trackerItems={trackerItems}
            setTrackerItems={setTrackerItems}
            setTotalCarbs={setTotalCarbs}
            setTotalGILoad={setTotalGILoad}
            carbAmt={Math.round(item.carbAmt)}
            giAmt={item.giAmt}
            glAmt={item.glAmt}
            fiberAmt={item.fiberAmt}
            proteinAmt={item.proteinAmt}
            fatAmt={item.fatAmt}
            energyAmt={item.energyAmt}
            sugarsAmt={item.sugarsAmt}
            sodiumAmt={item.sodiumAmt}
            funk={funk}
            glycemicData={glycemicData}
            setSearchItemSelected={setSearchItemSelected}
            searchItemSelected={searchItemSelected}
          />
        </Row>
      );
    }
    // filter of the description
    if (
      item.description
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return (
        <Row>
          <GlycemicItem
            description={item.description}
            trackerItems={trackerItems}
            setTrackerItems={setTrackerItems}
            setTotalCarbs={setTotalCarbs}
            setTotalGILoad={setTotalGILoad}
            carbAmt={Math.round(item.carbAmt)}
            giAmt={item.giAmt}
            glAmt={item.glAmt}
            fiberAmt={item.fiberAmt}
            proteinAmt={item.proteinAmt}
            fatAmt={item.fatAmt}
            energyAmt={item.energyAmt}
            sugarsAmt={item.sugarsAmt}
            sodiumAmt={item.sodiumAmt}
            funk={funk}
            glycemicData={glycemicData}
            setSearchItemSelected={setSearchItemSelected}
            searchItemSelected={searchItemSelected}
          />
        </Row>
      );
    }
  };

  return (
    <SafeAreaView style={styles.list__container}>
      <View
        onStartShouldSetResponder={() => {
          setClicked(false);
        }}>
        <FlatList
          data={glycemicData}
          renderItem={renderItem}
          keyExtractor={item => item.description}
        />
      </View>
      <Animated.View style={[styles.box, animatedStyle]}>
        <View style={styles.nutritionElementBox}>
          <Text>{glycemicData[searchItemSelected].description}</Text>
        </View>
        <View style={styles.nutritionElementBox}>
          <Text style={styles.labelText}>GI:</Text>
          <Text style={styles.valueText}>
            {glycemicData[searchItemSelected].giAmt}
          </Text>
        </View>
        <View style={styles.nutritionElementBox}>
          <Text style={styles.labelText}>GI Load:</Text>
          <Text style={styles.valueText}>
            {glycemicData[searchItemSelected].glAmt}
          </Text>
        </View>
        <View style={styles.nutritionElementBox}>
          <Text style={styles.labelText}>Carb:</Text>
          <Text style={styles.valueText}>
            {glycemicData[searchItemSelected].carbAmt}
          </Text>
        </View>
        <View style={styles.nutritionElementBox}>
          <Text style={styles.labelText}>Fibre:</Text>
          <Text style={styles.valueText}>
            {glycemicData[searchItemSelected].fiberAmt}
          </Text>
        </View>
        <View style={styles.nutritionElementBox}>
          <Text style={styles.labelText}>Protein:</Text>
          <Text style={styles.valueText}>
            {glycemicData[searchItemSelected].proteinAmt}
          </Text>
        </View>
        <View style={styles.nutritionElementBox}>
          <Text style={styles.labelText}>Fat:</Text>
          <Text style={styles.valueText}>
            {glycemicData[searchItemSelected].fatAmt}
          </Text>
        </View>
        <View style={styles.nutritionElementBox}>
          <Text style={styles.labelText}>kCal:</Text>
          <Text style={styles.valueText}>
            {glycemicData[searchItemSelected].energyAmt}
          </Text>
        </View>
        <View style={styles.nutritionElementBox}>
          <Text style={styles.labelText}>Sugars:</Text>
          <Text style={styles.valueText}>
            {glycemicData[searchItemSelected].sugarsAmt}
          </Text>
        </View>
        <View style={styles.nutritionElementBox}>
          <Text style={styles.labelText}>Sodium:</Text>
          <Text style={styles.valueText}>
            {glycemicData[searchItemSelected].sodiumAmt}
          </Text>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default withTheme(GlycemicList);

const Row = styled(View)`
  width: 100%;
  /* flex-direction: row; */
  /* justify-content: space-between;
align-items: center; */
`;

const styles = StyleSheet.create({
  nutritionElementBox: {
    flexDirection: "row",
  },
  labelText: {
    fontWeight: "bold",
  },
  list__container: {
    margin: 10,
    height: "85%",
    width: "100%",
    justifyContent: "center",
  },
  box: {
    textAlign: "center",
    justifyContent: "center",
    width: 200,
    height: 200,
    position: "absolute",
    backgroundColor: "lightgrey",
    color: "white",
    left: 70,
    top: 20,
  },
  // item: {
  //   margin: 5,
  //   borderBottomWidth: 2,
  //   borderBottomColor: "lightgrey",
  // },
  // description: {
  //   fontFamily: "Karla-Light",
  //   fontSize: 18,
  //   color: "#FFF",
  //   fontWeight: "bold",
  //   // marginBottom: 5,
  //   fontStyle: "italic",
  // },
});
