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
  descriptionGI,
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
  const {data} = useContext(GlycemicContext);
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
  let glBackgroundColor = "#350244"; //"rgb(46,139,87)";
  if (glAmt > 19) {
    //red
    glBackgroundColor = "#1A0546"; // "rgb(255,127,80)";
  } else if (glAmt > 10) {
    //orange
    glBackgroundColor = "#5C6500"; //"rgb(240,230,140)";
  }

  // Carb ranges (keto watch outs)
  let carbBackgroundColor = "#350244"; //"rgb(46,139,87)";
  if (carbAmt > 22) {
    //red
    carbBackgroundColor = "#1A0546"; //"rgb(255,127,80)";
  } else if (carbAmt > 11) {
    //orange
    carbBackgroundColor = "#5C6500"; //"rgb(240,230,140)";
  }

  const dynamicStyles = StyleSheet.create({
    listItemContainerStyle: {
      flexDirection: "row",
      // backgroundColor: "black",
      backgroundColor: carbBackgroundColor,
      // justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <TouchableOpacity
      onPress={() => {
        // is it already in trackerItems?
        console.log("descriptionGI:" + descriptionGI);
        const trackerClicked = trackerItems.find(
          ({description}) => description === descriptionGI,
        );
        console.log("trackerClicked:" + JSON.stringify(trackerClicked));
        if (trackerClicked) {
          trackerClicked.portionAmount++;
        } else {
          setTrackerItems([
            ...trackerItems,
            {
              id: descriptionGI,
              description: descriptionGI,
              carbAmt: carbAmt,
              giAmt: giAmt,
              glAmt: glAmt,
              fiberAmt: fiberAmt,
              proteinAmt: proteinAmt,
              fatAmt: fatAmt,
              energyAmt: energyAmt,
              sugarsAmt: sugarsAmt,
              sodiumAmt: sodiumAmt,
              giBackgroundColor: giBackgroundColor,
              glBackgroundColor: glBackgroundColor,
              carbBackgroundColor: carbBackgroundColor,
              portionAmount: 1,
            },
          ]);
        } // end if
        let totalCarbs = 0;
        let totalGILoad = 0;
        trackerItems.map(trackerItem => {
          totalCarbs += trackerItem.carbAmt;
          totalGILoad += trackerItem.glAmt;
        });

        setTotalCarbs(totalCarbs);
        setTotalGILoad(totalGILoad);
        // setModalVisible(true);
        const index = data.foodnutritions.findIndex(
          ({description}) => description === descriptionGI,
        );
        if (index > -1) {
          setSearchItemSelected(index);
        }
        // Make the nutritional panel appear briefly here
        animatedOpacitySequence();
      }}>
      <View style={dynamicStyles.listItemContainerStyle}>
        {/* <ListItemContainer> */}
        {/* <GlycemicModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          description={descriptionGI}
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
        <Text style={styles.listItemStyle}>{descriptionGI}</Text>
        {/* <ListItem>{descriptionGI}</ListItem> */}
        <BoxesLayout
          giAmt={giAmt}
          glAmt={glAmt}
          carbAmt={carbAmt}
          giBackgroundColor={giBackgroundColor}
          glBackgroundColor={glBackgroundColor}
          carbBackgroundColor={carbBackgroundColor}
          boxWidth={48}
          boxHeight={48}
          textFontSize={36}
        />
        {/* </ListItemContainer> */}
      </View>
    </TouchableOpacity>
  );
};

function arePropsEqual(prevProps, nextProps) {
  return prevProps.descriptionGI === nextProps.descriptionGI;
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
  listItemStyle: {
    width: "63%",
    textAlign: "right",
    // justifyContent: "center",
    // alignItems: "center",
    fontSize: 43,
    fontWeight: "200",
    color: "rgba(201, 189, 187, 1)",
  },
  // box: {
  //   width: 48,
  //   height: 40,
  //   padding: 1,
  // },
  // text: {
  //   color: "rgba(201, 189, 187, 1)",
  //   fontSize: 34,
  //   textAlign: "center",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   fontWeight: "200",
  // },
  // button: {
  //   borderRadius: 20,
  //   padding: 10,
  //   elevation: 2,
  // },
  // buttonOpen: {
  //   backgroundColor: "#F194FF",
  // },
  // buttonClose: {
  //   backgroundColor: "#2196F3",
  // },
});
