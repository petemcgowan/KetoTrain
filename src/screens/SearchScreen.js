import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ActivityIndicator,
  View,
} from 'react-native';

import GlycemicList from '../components/GlycemicList';
import SearchBar from '../components/SearchBar';
import glycemicData from '../data/usdaNutrition.json';
import styled, {withTheme} from 'styled-components';

const SearchScreen = () => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [clicked, setClicked] = useState(false);

  // console.log("glycemicData:" + JSON.stringify(glycemicData));

  return (
    <View>
      <SafeAreaView style={styles.searchPageContainer}>
        {!clicked && <ListTitle>Glycemic Index</ListTitle>}

        <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          clicked={clicked}
          setClicked={setClicked}
        />
        {!glycemicData ? (
          <ActivityIndicator size="large" />
        ) : (
          <GlycemicList
            searchPhrase={searchPhrase}
            glycemicData={glycemicData}
            setClicked={setClicked}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

export default withTheme(SearchScreen);

const ListTitle = styled(Text)`
  margin-bottom: ${({theme}) => theme.metrics.extraSmallSize}px;
  font-family: CircularStd-Bold;
  font-size: ${({theme}) => theme.metrics.largeSize * 1.1}px;
  color: ${({theme}) => theme.colors.textColor};
`;

const styles = StyleSheet.create({
  searchPageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#FFF',
    backgroundColor: '#000',
  },
  description: {
    fontFamily: 'Karla-Light',
    width: '100%',
    marginTop: 20,
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: '10%',
    color: '#FFF',
  },
});
