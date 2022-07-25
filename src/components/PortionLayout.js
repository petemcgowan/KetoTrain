import React, {memo, useState} from "react";

import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

const PortionLayout = ({
  portion1BackgroundColor,
  portion2BackgroundColor,
  portion3BackgroundColor,
  portion4BackgroundColor,
  boxWidth,
  boxHeight,
  textFontSize,
}) => {
  const [portion1BGColor, setPortion1BGColor] = useState(
    portion1BackgroundColor,
  );
  const [portion2BGColor, setPortion2BGColor] = useState(
    portion2BackgroundColor,
  );
  const [portion3BGColor, setPortion3BGColor] = useState(
    portion3BackgroundColor,
  );
  const [portion4BGColor, setPortion4BGColor] = useState(
    portion4BackgroundColor,
  );

  const dynamicStyles = StyleSheet.create({
    box: {
      width: boxWidth,
      height: boxHeight,
      padding: 1,
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

  const pressPortion1 = () => {
    if (portion1BGColor === "black")
      setPortion1BGColor(portion1BackgroundColor);
    else setPortion1BGColor("black");
  };

  const pressPortion2 = () => {
    if (portion2BGColor === "black")
      setPortion2BGColor(portion2BackgroundColor);
    else setPortion2BGColor("black");
  };

  const pressPortion3 = () => {
    if (portion3BGColor === "black")
      setPortion3BGColor(portion3BackgroundColor);
    else setPortion3BGColor("black");
  };

  const pressPortion4 = () => {
    if (portion4BGColor === "black")
      setPortion4BGColor(portion4BackgroundColor);
    else setPortion4BGColor("black");
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flexDirection: "row", padding: 3}}>
        <Pressable
          onPress={pressPortion1}
          style={[dynamicStyles.box, {backgroundColor: portion1BGColor}]}>
          {/* <Text style={dynamicStyles.text}>{giAmt}</Text> */}
        </Pressable>
        <Pressable
          onPress={pressPortion2}
          style={[dynamicStyles.box, {backgroundColor: portion2BGColor}]}>
          {/* <Text style={dynamicStyles.text}>{glAmt}</Text> */}
        </Pressable>
        <Pressable
          onPress={pressPortion3}
          style={[dynamicStyles.box, {backgroundColor: portion3BGColor}]}>
          {/* <Text style={dynamicStyles.text}>{carbAmt}</Text> */}
        </Pressable>
        <Pressable
          onPress={pressPortion4}
          style={[dynamicStyles.box, {backgroundColor: portion4BGColor}]}>
          {/* <Text style={dynamicStyles.text}>{carbAmt}</Text> */}
        </Pressable>
      </View>
    </View>
  );
};

export default memo(PortionLayout);
