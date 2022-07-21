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
}) => {
  return (
    <View style={{padding: 10, flex: 1}}>
      <View style={{flexDirection: "row"}}>
        <View style={[styles.box, {backgroundColor: giBackgroundColor}]}>
          <Text style={styles.text}>{giAmt}</Text>
        </View>
        <View style={[styles.box, {backgroundColor: glBackgroundColor}]}>
          <Text style={styles.text}>{glAmt}</Text>
        </View>
        <View style={[styles.box, {backgroundColor: carbBackgroundColor}]}>
          <Text style={styles.text}>{carbAmt}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 48,
    height: 40,
    padding: 1,
  },
  text: {
    color: "rgba(201, 189, 187, 1)",
    fontSize: 34,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "200",
  },
});

export default memo(BoxesLayout);
