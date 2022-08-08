import React, {memo} from "react";

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

const BoxesLayout = ({
  giAmt,
  glAmt,
  carbAmt,
  giBackgroundColor,
  glBackgroundColor,
  carbBackgroundColor,
  boxWidth,
  boxHeight,
  textFontSize,
}) => {
  const dynamicStyles = StyleSheet.create({
    box: {
      width: boxWidth,
      height: boxHeight,
      // padding: 0.5,
    },
    text: {
      color: "rgba(201, 189, 187, 1)",
      fontSize: textFontSize,
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "200",
    },
  });

  return (
    <View style={{flex: 1}}>
      <View style={{flexDirection: "row", padding: 1.5}}>
        <View style={[dynamicStyles.box, {backgroundColor: giBackgroundColor}]}>
          <Text style={dynamicStyles.text}>{giAmt}</Text>
        </View>
        <View style={[dynamicStyles.box, {backgroundColor: glBackgroundColor}]}>
          <Text style={dynamicStyles.text}>{glAmt}</Text>
        </View>
        <View
          style={[dynamicStyles.box, {backgroundColor: carbBackgroundColor}]}>
          <Text style={dynamicStyles.text}>{carbAmt}</Text>
        </View>
      </View>
    </View>
  );
};

export default memo(BoxesLayout);
