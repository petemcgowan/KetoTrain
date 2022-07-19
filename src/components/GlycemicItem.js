/* eslint-disable react-native/no-inline-styles */
import React, {useState} from "react";
import styled, {withTheme} from "styled-components";

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

// import {getGLResult} from '../utils/GlycemicUtils';
import GlycemicModal from "./GlycemicModal";

// Previous TouchableOpacity style was style={[styles.item]}
// definition of the Item, which will be rendered in the FlatList
const GlycemicItem = ({
  description,
  trackerItems,
  setTrackerItems,
  setTotalCarbs,
  setTotalGILoad,
  carbAmt,
  giAmt,
  glAmt,
  fiberAmt,
  proteinAmt,
  fatAmt,
  energyAmt,
  sugarsAmt,
  sodiumAmt,
  funk,
  glycemicData,
  setSearchItemSelected,
  searchItemSelected,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  /* Glycemic Index ranges
   **Low**  **less than or equal to 55** and are characterised by a smaller rise and fall in blood glucose.
   **Medium** Value **between 56 and 69.**
   **High** GI foods and drinks have a GI value **greater than or equal to 70** and are characterised by faster and higher peaks and troughs in blood glucose levels.*/
  let giImageToUse = require("../../assets/images/greenCircle.png");
  let giBackgroundColor = "rgb(46,139,87)";
  if (glAmt > 60) {
    //red
    giImageToUse = require("../../assets/images/redCircle.png");
    giBackgroundColor = "rgb(255,127,80)";
  } else if (glAmt > 30) {
    //orange
    giImageToUse = require("../../assets/images/orangeCircle.png");
    giBackgroundColor = "rgb(240,230,140)";
  }

  /* Glycemic Load ranges (GL)
  "Low-GL foods are those with a** GL of 10 and below**, medium are those between **11 and 19**, and high are those with a GL of **20 and above** (Mabel Blades. “The Glycemic Load Counter”.  */
  let glImageToUse = require("../../assets/images/greenCircle.png");
  let glBackgroundColor = "rgb(46,139,87)";
  if (glAmt > 19) {
    //red
    glImageToUse = require("../../assets/images/redCircle.png");
    glBackgroundColor = "rgb(255,127,80)";
  } else if (glAmt > 10) {
    //orange
    glImageToUse = require("../../assets/images/orangeCircle.png");
    glBackgroundColor = "rgb(240,230,140)";
  }

  // Carb ranges (keto watch outs)
  let carbImageToUse = require("../../assets/images/greenCircle.png");
  let carbBackgroundColor = "rgb(46,139,87)";
  if (carbAmt > 22) {
    //red
    carbImageToUse = require("../../assets/images/redCircle.png");
    carbBackgroundColor = "rgb(255,127,80)";
  } else if (carbAmt > 11) {
    //orange
    carbImageToUse = require("../../assets/images/orangeCircle.png");
    carbBackgroundColor = "rgb(240,230,140)";
  }

  console.log(carbBackgroundColor);

  return (
    <TouchableOpacity
      onPress={() => {
        setTrackerItems([
          ...trackerItems,
          {
            id: description,
            description: description,
            carbAmt: carbAmt,
            giAmt: giAmt,
            glAmt: glAmt,
            fiberAmt: fiberAmt,
            proteinAmt: proteinAmt,
            fatAmt: fatAmt,
            energyAmt: energyAmt,
            sugarsAmt: sugarsAmt,
            sodiumAmt: sodiumAmt,
            giImageToUse: giImageToUse,
            glImageToUse: glImageToUse,
            carbImageToUse: carbImageToUse,
          },
          //     },
        ]);
        let totalCarbs = 0;
        let totalGILoad = 0;
        trackerItems.map(trackerItem => {
          totalCarbs += trackerItem.carbAmt;
          totalGILoad += trackerItem.glAmt;
        });

        console.log("TrackerItem, totalCarbs:" + totalCarbs);
        console.log("TrackerItem, totalGILoad:" + totalGILoad);
        setTotalCarbs(totalCarbs);
        setTotalGILoad(totalGILoad);
        // setModalVisible(true);
        for (var i = 0; i < glycemicData.length; i++) {
          if (glycemicData[i].description === description) {
            console.log(
              "Item found for info panel, i:" +
                i +
                ", trackerItems:" +
                JSON.stringify(glycemicData[i]),
            );
            // const trackerSelected = trackerItems[i];
            setSearchItemSelected(i);
            console.log(
              "trackerSelected:" + JSON.stringify(searchItemSelected),
            );
          }
        }
        // Make the nutritional panel appear briefly here
        funk();
      }}>
      <ListItemContainer>
        {/* <GlycemicModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          description={description}
          giAmt={giAmt}
          carbAmt={carbAmt}
          glAmt={glAmt}
          fiberAmt={fiberAmt}
          proteinAmt={proteinAmt}
          fatAmt={fatAmt}
          energyAmt={energyAmt}
          sugarsAmt={sugarsAmt}
          sodiumAmt={sodiumAmt}
          giImageToUse={giImageToUse}
          glImageToUse={glImageToUse}
          carbImageToUse={carbImageToUse}
        /> */}
        <ListItem>{description}</ListItem>
        <View>
          <View
            style={{
              backgroundColor: {giBackgroundColor},
              flex: 1,
              alignItems: "center",
            }}>
            <ImageBackground
              source={giImageToUse}
              resizeMode="cover"
              style={styles.image}>
              <Text style={styles.text}>{giAmt}</Text>
            </ImageBackground>
          </View>
        </View>
        <View>
          <View
            style={{
              backgroundColor: {glBackgroundColor},
              flex: 1,
              alignItems: "center",
            }}>
            {/* <ImageBackground
              source={glImageToUse}
              resizeMode="cover"
              style={styles.image}>
              <Text style={styles.text}>{glAmt}</Text>
            </ImageBackground> */}
          </View>
        </View>
        <View>
          <View
            style={{
              backgroundColor: {carbBackgroundColor},
              flex: 1,
              alignItems: "center",
            }}>
            <ImageBackground
              source={carbImageToUse}
              resizeMode="cover"
              style={styles.image}>
              <Text style={styles.text}>{carbAmt}</Text>
            </ImageBackground>
          </View>
        </View>
        {/* <TrafficLight name="circle" size={24} color="orange" /> */}
      </ListItemContainer>
    </TouchableOpacity>
  );
};

export default withTheme(GlycemicItem);

const ListItemContainer = styled(View)`
  flex-direction: row;
  background-color: black;
  /* justify-content: space-between;
 align-items: center; */
`;

const ListItem = styled(Text)`
  /* font-family: CircularStd-Medium; */
  margin: 3px;
  width: 60%;
  /* font-family: Modesta-Script; */
  font-size: ${({theme}) => theme.metrics.mediumSize * 1.25}px;
  /* color: ${({theme}) => theme.colors.subTextColor}; */
  color: white;
`;

const styles = StyleSheet.create({
  circleTextContainer: {
    flex: 1,
    alignItems: "center",
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
});
