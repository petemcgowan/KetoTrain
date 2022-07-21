/* eslint-disable react-native/no-inline-styles */
import React, {useState, memo, useContext} from "react";
import styled, {withTheme} from "styled-components";
// import {pure} from "recompose";

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

// import {getGLResult} from '../utils/GlycemicUtils';
import GlycemicModal from "./GlycemicModal";
import BoxesLayout from "./BoxesLayout";

import TrackerContext from "../state/TrackerContext";
import GlycemicContext from "../state/GlycemicContext";

// Previous TouchableOpacity style was style={[styles.item]}
// definition of the Item, which will be rendered in the FlatList
const GlycemicItem = ({
  description,
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
  animatedOpacitySequence,
  // glycemicData,
  setSearchItemSelected,
  searchItemSelected,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {trackerItems, setTrackerItems} = useContext(TrackerContext);
  const {glycemicData} = useContext(GlycemicContext);
  /* Glycemic Index ranges
   **Low**  **less than or equal to 55** and are characterised by a smaller rise and fall in blood glucose.
   **Medium** Value **between 56 and 69.**
   **High** GI foods and drinks have a GI value **greater than or equal to 70** and are characterised by faster and higher peaks and troughs in blood glucose levels.*/
  // "#350244";  // good, same colour as banner
  // "#1A0546";  // not so good
  // "#5C6500"; // bad  TODO add this as a legend on the top of the Learn page.  I'd love an animation on the Learn page actually.
  // // "#570026";
  let giBackgroundColor = "#350244"; // "rgb(46,139,87)";
  if (glAmt > 60) {
    //red
    giBackgroundColor = "#1A0546"; // "rgb(255,127,80)";
  } else if (glAmt > 30) {
    //orange
    giBackgroundColor = "#5C6500"; //  "rgb(240,230,140)";
  }

  /* Glycemic Load ranges (GL)
  "Low-GL foods are those with a** GL of 10 and below**, medium are those between **11 and 19**, and high are those with a GL of **20 and above** (Mabel Blades. “The Glycemic Load Counter”.  */
  let glBackgroundColor = "rgb(46,139,87)";
  if (glAmt > 19) {
    //red
    glBackgroundColor = "rgb(255,127,80)";
  } else if (glAmt > 10) {
    //orange
    glBackgroundColor = "rgb(240,230,140)";
  }

  // Carb ranges (keto watch outs)
  let carbBackgroundColor = "rgb(46,139,87)";
  if (carbAmt > 22) {
    //red
    carbBackgroundColor = "rgb(255,127,80)";
  } else if (carbAmt > 11) {
    //orange
    carbBackgroundColor = "rgb(240,230,140)";
  }

  return (
    <TouchableOpacity
      onPress={() => {
        console.log("GlycemicItem onPress");
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
          },
          //     },
        ]);
        let totalCarbs = 0;
        let totalGILoad = 0;
        trackerItems.map(trackerItem => {
          totalCarbs += trackerItem.carbAmt;
          totalGILoad += trackerItem.glAmt;
        });

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
        animatedOpacitySequence();
      }}>
      <View style={styles.listItemContainerStyle}>
        {/* <ListItemContainer> */}
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
          giBackgroundColor={giBackgroundColor}
          glBackgroundColor={glBackgroundColor}
          carbBackgroundColor={carbBackgroundColor}
        /> */}
        <Text style={styles.listItemStyle}>{description}</Text>
        {/* <ListItem>{description}</ListItem> */}
        <BoxesLayout
          giAmt={giAmt}
          glAmt={glAmt}
          carbAmt={carbAmt}
          giBackgroundColor={giBackgroundColor}
          glBackgroundColor={glBackgroundColor}
          carbBackgroundColor={carbBackgroundColor}
        />
        {/* </ListItemContainer> */}
      </View>
    </TouchableOpacity>
  );
};

function arePropsEqual(prevProps, nextProps) {
  return prevProps.description === nextProps.description;
}

// export default withTheme(memo(GlycemicItem, arePropsEqual));
export default memo(GlycemicItem, arePropsEqual);

// const ListItemContainer = styled(View)`
//   flex-direction: row;
//   background-color: black;
//   /* justify-content: space-between;
//  align-items: center; */
// `;

// const ListItem = styled(Text)`
//   /* font-family: CircularStd-Medium; */
//   /* margin: 3px; */
//   width: 60%;
//   text-align: right;
//   /* font-family: Modesta-Script; */
//   font-size: ${({theme}) => theme.metrics.mediumSize * 2.8}px;
//   /* color: ${({theme}) => theme.colors.subTextColor}; */
//   color: "rgba(201, 189, 187, 1)";
// `;

const styles = StyleSheet.create({
  // listItemContainerStyle
  listItemContainerStyle: {
    flexDirection: "row",
    backgroundColor: "black",
  },
  listItemStyle: {
    width: "60%",
    textAlign: "right",
    fontSize: 32,
    color: "rgba(201, 189, 187, 1)",
  },
  circleTextContainer: {
    flex: 1,
    alignItems: "center",
  },
  // box: {
  //   width: 48,
  //   height: 40,
  //   padding: 1,
  // },
  image: {
    flex: 1,
    // justifyContent: "center",
    width: 26, //24
    height: 26, //24
  },
  // text: {
  //   color: "rgba(201, 189, 187, 1)",
  //   fontSize: 34,
  //   textAlign: "center",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   fontWeight: "200",
  // },
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
