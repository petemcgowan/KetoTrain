import React, {useContext, useState} from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import styled, {withTheme} from "styled-components";
import TrackerContext from "../state/TrackerContext";

const TrackerItem = ({item, setTrackerSelected, trackerSelected}) => {
  const {trackerItems, setTrackerItems, setTotalCarbs, setTotalGILoad} =
    useContext(TrackerContext);
  const [portion1, setPortion1] = useState("aqua");
  const [portion2, setPortion2] = useState("marine");
  const [portion3, setPortion3] = useState("maroon");
  const [portion4, setPortion4] = useState("royalblue");

  const pressTrackerItem = () => {
    console.log(`item name is:${item.description}`);
    // setTrackerSelected(item.description);

    for (var i = 0; i < trackerItems.length; i++) {
      if (trackerItems[i].description === item.description) {
        console.log(
          "Item found for info panel, i:" +
            i +
            ", trackerItems:" +
            JSON.stringify(trackerItems[i]),
        );
        // const trackerSelected = trackerItems[i];
        setTrackerSelected(i);
        console.log("trackerSelected:" + JSON.stringify(trackerSelected));
      }
    }
  };

  const deleteTrackerItem = () => {
    console.log("Pressed");
    for (var i = 0; i < trackerItems.length; i++) {
      if (trackerItems[i].description === item.description) {
        console.log(
          "Item found, i:" +
            i +
            ", trackerItems:" +
            JSON.stringify(trackerItems[i]),
        );
        trackerItems.splice(i, 1);
      }
    }

    setTrackerItems(trackerItems);
    setTrackerSelected(0);
    let totalCarbs = 0;
    let totalGILoad = 0;
    trackerItems.map(trackerItem => {
      totalCarbs += trackerItem.carbAmt;
      totalGILoad += trackerItem.giAmt;
    });

    setTotalCarbs(totalCarbs);
    setTotalGILoad(totalGILoad);
  };

  const pressPortion1 = () => {
    setPortion1("black");
    console.log(`pressPortion1`);
  };
  const pressPortion2 = () => {
    setPortion2("black");
    console.log(`pressPortion2`);
  };
  const pressPortion3 = () => {
    setPortion3("black");
    console.log(`pressPortion3`);
  };
  const pressPortion4 = () => {
    setPortion4("black");
    console.log(`pressPortion4`);
  };
  const pressDescription = () => {
    console.log(`pressDescription`);
  };
  const pressCarbAmt = () => {
    console.log(`pressCarbAmt`);
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          // justifyContents: "center",
          // alignContent: "center",
        }}>
        <TouchableOpacity onPress={pressTrackerItem}>
          <View
            style={{
              flexDirection: "row",
              // justifyContents: "center",
              // alignContent: "center",
            }}>
            {/* <Pressable onPress={pressDescription}> */}
            <Text style={styles.description}>{item.description}</Text>
            {/* </Pressable> */}
            {/* <Pressable onPress={pressCarbAmt}> */}
            <Text style={styles.description}>{item.carbAmt}</Text>
            {/* </Pressable> */}
          </View>
        </TouchableOpacity>
        <View>
          <TouchableOpacity onPress={deleteTrackerItem} style={[styles.item]}>
            <View>
              <Text style={styles.description}>X</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View style={{width: 96, height: 24, flexDirection: "row"}}>
          <Text
            style={{
              position: "absolute",
              width: 24,
              height: 24,
              // left: 0,
              // right: 0,
              // bottom: 0,
              // top: 0,
            }}>
            test
          </Text>
          <Pressable onPress={pressPortion1}>
            <View
              style={{
                width: 24,
                height: 24,
                // paddingRight: 2,
                backgroundColor: {portion1},
              }}></View>
          </Pressable>
          <Pressable onPress={pressPortion2}>
            <View
              style={{
                width: 24,
                height: 24,
                // paddingRight: 2,
                backgroundColor: {portion2},
              }}></View>
          </Pressable>
          <Pressable onPress={pressPortion3}>
            <View
              style={{
                width: 24,
                height: 24,
                // paddingRight: 2,
                backgroundColor: {portion3},
              }}></View>
          </Pressable>
          <Pressable onPress={pressPortion4}>
            <View
              style={{
                width: 24,
                height: 24,
                // paddingRight: 2,
                backgroundColor: {portion4},
                // backgroundColor: "blue",
              }}></View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default withTheme(TrackerItem);

const styles = StyleSheet.create({
  description: {
    // fontFamily: "Karla-Light",
    // width: "100%",
    color: "#FFF",
    marginTop: 5,
    fontSize: 40,
    fontWeight: "100",
    // marginLeft: "5%",
  },
});
