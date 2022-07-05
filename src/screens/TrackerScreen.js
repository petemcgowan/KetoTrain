import React, {useContext, useState} from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import TrackerContext from "../TrackerContext";
import TrackerItem from "../components/TrackerItem";
import styled, {withTheme} from "styled-components";
import {getTotalCarbs} from "../utils/GlycemicUtils";

const TrackerScreen = () => {
  const {trackerItems, setTrackerItems} = useContext(TrackerContext);
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

  return (
    <View>
      <SafeAreaView style={styles.root}>
        <FlatList
          data={trackerItems}
          renderItem={renderTrackerItem}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
      <SafeAreaView style={styles.nutritionContainer}>
        <View>
          <Text>
            Nutrional Info:{trackerItems[trackerSelected].description}
          </Text>
          <Text>Carbs:{trackerItems[trackerSelected].carbAmt}</Text>
          <Text>GI Amount:{trackerItems[trackerSelected].giAmt}</Text>
          <Text>Glycemic Load:{trackerItems[trackerSelected].glAmt}</Text>
          <Text>Fiber: {trackerItems[trackerSelected].fiberAmt}</Text>
          <Text>Protein{trackerItems[trackerSelected].proteinAmt}</Text>
          <Text>Fat:{trackerItems[trackerSelected].fatAmt}</Text>
          <Text>Energy:(kcal){trackerItems[trackerSelected].energyAmt}</Text>
          <Text>Sugars: {trackerItems[trackerSelected].sugarsAmt}</Text>
          <Text>Sodium:{trackerItems[trackerSelected].sodiumAmt}</Text>
          <ImageBackground
            source={trackerItems[trackerSelected].carbImageToUse}
            resizeMode="cover"
            style={styles.image}>
            <Text style={styles.text}>
              {trackerItems[trackerSelected].carbAmt}
            </Text>
          </ImageBackground>
          <ImageBackground
            source={trackerItems[trackerSelected].giImageToUse}
            resizeMode="cover"
            style={styles.image}>
            <Text style={styles.text}>
              {trackerItems[trackerSelected].giAmt}
            </Text>
          </ImageBackground>
          <ImageBackground
            source={trackerItems[trackerSelected].glImageToUse}
            resizeMode="cover"
            style={styles.image}>
            <Text style={styles.text}>
              {trackerItems[trackerSelected].glAmt}
            </Text>
          </ImageBackground>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default withTheme(TrackerScreen);

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    color: "#FFF",
    height: 300,
  },
  nutritionContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
    color: "#FFF",
    height: 300,
  },
  image: {
    flex: 1,
    // justifyContent: "center",
    width: 26, //24
    height: 26, //24
  },
  text: {
    color: "white",
    fontSize: 13,
    // lineHeight: 20,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
    padding: 2,
    // backgroundColor: "#000000c0",
  },
});
