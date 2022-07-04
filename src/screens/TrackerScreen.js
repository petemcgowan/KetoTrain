import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import TrackerContext from "../TrackerContext";
import TrackerItem from "../components/TrackerItem";
import styled, { withTheme } from "styled-components";
import { getTotalCarbs } from "../utils/GlycemicUtils";

const TrackerScreen = () => {
  const { trackerItems, setTrackerItems } = useContext(TrackerContext);

  const renderTrackerItem = ({ item }) => <TrackerItem item={item} />;
  // TODO:

  console.log("TrackerScreen, trackerItems:" + JSON.stringify(trackerItems));
  console.log("TrackerScreen, getTotalCarbs:" + getTotalCarbs());

  return (
    <View>
      <SafeAreaView style={styles.root}>
        <FlatList
          data={trackerItems}
          renderItem={renderTrackerItem}
          keyExtractor={(item) => item.id}
        />
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
  },
});
