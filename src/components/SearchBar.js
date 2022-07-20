import React from "react";
import {StyleSheet, TextInput, View, Keyboard, Button} from "react-native";
// import {Feather, Entypo} from '@expo/vector-icons';
// import {FontAwesomeIcon} from '@fortawesome/free-solid-svg-icons';

const SearchBar = props => {
  return (
    <View style={styles.container}>
      <View
        style={
          !props.clicked
            ? styles.searchBar__unclicked
            : styles.searchBar__clicked
        }>
        {/* <FontAwesomeIcon
          icon="fa-solid fa-magnifying-glass"
          size={20}
          color="black"
          style={{marginLeft: 1}}
        /> */}
        {/* <Feather
          name="search"
          size={20}
          color="black"
          style={{marginLeft: 1}}
        /> */}
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={props.searchPhrase}
          onChangeText={props.setSearchPhrase}
          onFocus={() => {
            props.setClicked(true);
          }}
        />
        {/* {props.clicked &&
          {
            /* <FontAwesomeIcon
            icon="fa-solid fa-xmark"
            size={20}
            color="black"
            style={{padding: 1}}
            onPress={() => {
              props.setSearchPhrase('');
            }}
          />
        } */}
      </View>
      {props.clicked && (
        <View>
          <Button
            title="Cancel"
            onPress={() => {
              Keyboard.dismiss();
              props.setClicked(false);
            }}
          />
        </View>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "80%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 30,
    marginLeft: 10,
    width: "90%",
  },
});
