import React, {useContext, useState, useEffect} from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import TrackerContext from "../state/TrackerContext";
import TrackerItem from "../components/TrackerItem";
import styled, {withTheme} from "styled-components";
import {getTotalCarbs} from "../utils/GlycemicUtils";
import BoxesLayout from "../components/BoxesLayout";

const KetoTrackerScreen = () => {
  const {trackerItems, setTrackerItems, totalCarbs} =
    useContext(TrackerContext);
  const [trackerSelected, setTrackerSelected] = useState(0);

  const renderTrackerItem = ({item}) => (
    <TrackerItem
      item={item}
      setTrackerSelected={setTrackerSelected}
      trackerSelected={trackerSelected}
    />
  );
  const pressTrackerItem = ({item}) => console.log("Nutrient pressed");

  console.log("TrackerScreen, trackerItems:" + JSON.stringify(trackerItems));
  console.log("TrackerScreen, getTotalCarbs:" + getTotalCarbs());

  useEffect(() => {
    console.log("KetoTrackerScreen useEffect called");
  }, [trackerItems, totalCarbs]);

  return (
    <View style={styles.trackerContainer}>
      <SafeAreaView style={styles.root}>
        <FlatList
          data={trackerItems}
          renderItem={renderTrackerItem}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>

      <SafeAreaView style={styles.nutritionContainer}>
        {trackerItems[trackerSelected] ? (
          <View>
            <Text>
              Nutrional Info:{trackerItems[trackerSelected].description}
            </Text>

            <View style={{flexDirection: "row" /*nutrition details*/}}>
              <View style={{flexDirection: "column" /*left hand side*/}}>
                <View style={{flexDirection: "row"}}>
                  <Text style={styles.text}>Carbs:</Text>
                  <Text style={styles.detailText}>
                    {trackerItems[trackerSelected].carbAmt}
                  </Text>
                </View>
                <View style={{flexDirection: "row"}}>
                  <Text style={styles.text}>GI Amount:</Text>
                  <Text style={styles.detailText}>
                    {trackerItems[trackerSelected].giAmt}
                  </Text>
                </View>
                <View style={{flexDirection: "row"}}>
                  <Text style={styles.text}>Glycemic Load:</Text>
                  <Text style={styles.detailText}>
                    {trackerItems[trackerSelected].glAmt}
                  </Text>
                </View>
                <View style={{flexDirection: "row"}}>
                  <Text style={styles.text}>Fiber:</Text>
                  <Text style={styles.detailText}>
                    {trackerItems[trackerSelected].fiberAmt}
                  </Text>
                </View>
                <View style={{flexDirection: "row"}}>
                  <Text style={styles.text}>Protein:</Text>
                  <Text style={styles.detailText}>
                    {trackerItems[trackerSelected].proteinAmt}
                  </Text>
                </View>
              </View>
              <View style={{flexDirection: "column" /*right hand side*/}}>
                <View style={{flexDirection: "row"}}>
                  <Text style={styles.text}>Fat:</Text>
                  <Text style={styles.detailText}>
                    {trackerItems[trackerSelected].fatAmt}
                  </Text>
                </View>
                <View style={{flexDirection: "row"}}>
                  <Text style={styles.text}>Energy:(kcal):</Text>
                  <Text style={styles.detailText}>
                    {trackerItems[trackerSelected].energyAmt}
                  </Text>
                </View>
                <View style={{flexDirection: "row"}}>
                  <Text style={styles.text}>Sugars:</Text>
                  <Text style={styles.detailText}>
                    {trackerItems[trackerSelected].sugarsAmt}
                  </Text>
                </View>
                <View style={{flexDirection: "row"}}>
                  <Text style={styles.text}>Sodium:</Text>
                  <Text style={styles.detailText}>
                    {trackerItems[trackerSelected].sodiumAmt}
                  </Text>
                </View>
              </View>
            </View>
            <BoxesLayout
              giAmt={trackerItems[trackerSelected].giAmt}
              glAmt={trackerItems[trackerSelected].glAmt}
              carbAmt={trackerItems[trackerSelected].carbAmt}
              giBackgroundColor={
                trackerItems[trackerSelected].giBackgroundColor
              }
              glBackgroundColor={
                trackerItems[trackerSelected].glBackgroundColor
              }
              carbBackgroundColor={
                trackerItems[trackerSelected].carbBackgroundColor
              }
              boxWidth={118}
              boxHeight={118}
              textFontSize={80}
            />
          </View>
        ) : (
          <Text>No items added yet</Text>
        )}
      </SafeAreaView>
    </View>
  );
};

export default withTheme(KetoTrackerScreen);

const styles = StyleSheet.create({
  trackerContainer: {
    marginTop: 27,
  },
  root: {
    // justifyContent: "center",
    // alignItems: "center",
    flexDirection: "row",
    backgroundColor: "black",
    color: "#FFF",
    height: 300,
  },
  nutritionContainer: {
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "royalblue",
    backgroundColor: "rgba(138, 149, 143, 1)",
    color: "#FFF",
    height: 300,
  },
  image: {
    flex: 1,
    width: 26,
    height: 26,
  },
  text: {
    color: "white",
    fontSize: 24,
    //   padding: 2,
  },
  detailText: {
    color: "rgba(59, 73, 55, 1)",
    fontSize: 24,
  },
});
// greenVibe: "rgba(59, 73, 55, 1)",
// offWhiteVibe: "rgba(201, 189, 187, 1)"
// tealVibe   "rgba(138, 149, 143, 1)"
