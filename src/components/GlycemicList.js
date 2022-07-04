import React, {useContext} from 'react';
import {StyleSheet, Text, View, FlatList, SafeAreaView} from 'react-native';

import TrackerContext from '../TrackerContext';
import styled, {withTheme} from 'styled-components';
import GlycemicItem from './GlycemicItem';
import {getGLResult} from '../utils/GlycemicUtils';

// the filter
const GlycemicList = ({searchPhrase, glycemicData, setClicked}) => {
  const {trackerItems, setTrackerItems, setTotalCarbs, setTotalGILoad} =
    useContext(TrackerContext);

  console.log('List, searchPhrase:' + searchPhrase);

  // item is an entry in the glycemicData/data list
  const renderItem = ({item}) => {
    // const giLoad = getGLResult(item.carbAmt, item.giAmt, item.glAmt);
    // when no input, show all
    if (searchPhrase === '') {
      return (
        <Row>
          <GlycemicItem
            description={item.description}
            trackerItems={trackerItems}
            setTrackerItems={setTrackerItems}
            setTotalCarbs={setTotalCarbs}
            setTotalGILoad={setTotalGILoad}
            carbAmt={Math.round(item.carbAmt)}
            giAmt={item.giAmt}
            glAmt={item.glAmt}
            fiberAmt={item.fiberAmt}
            proteinAmt={item.proteinAmt}
            fatAmt={item.fatAmt}
            energyAmt={item.energyAmt}
            sugarsAmt={item.sugarsAmt}
            sodiumAmt={item.sodiumAmt}
          />
        </Row>
      );
    }
    // filter of the description
    if (
      item.description
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ''))
    ) {
      return (
        <Row>
          <GlycemicItem
            description={item.description}
            trackerItems={trackerItems}
            setTrackerItems={setTrackerItems}
            setTotalCarbs={setTotalCarbs}
            setTotalGILoad={setTotalGILoad}
            carbAmt={Math.round(item.carbAmt)}
            giAmt={item.giAmt}
            glAmt={item.glAmt}
            fiberAmt={item.fiberAmt}
            proteinAmt={item.proteinAmt}
            fatAmt={item.fatAmt}
            energyAmt={item.energyAmt}
            sugarsAmt={item.sugarsAmt}
            sodiumAmt={item.sodiumAmt}
          />
        </Row>
      );
    }
  };

  return (
    <SafeAreaView style={styles.list__container}>
      <View
        onStartShouldSetResponder={() => {
          setClicked(false);
        }}>
        <FlatList
          data={glycemicData}
          renderItem={renderItem}
          keyExtractor={item => item.description}
        />
      </View>
    </SafeAreaView>
  );
};

export default withTheme(GlycemicList);

/*********************************
 * Convert Text item to styled components
 *    OptionTitle (in Settings) is the setting description
 *    OptionDescription is the description.
 *    So basically try Description for your text and
 * Convert existing **FlatList to sc** (in GlycemicList)
 * Import MindCast **fonts**
 * **Implement Theme** (in GlycemicList): https://styled-components.com/docs/advanced
 **********************************/

const Row = styled(View)`
  width: 100%;
  /* flex-direction: row; */
  /* justify-content: space-between;
align-items: center; */
`;

const styles = StyleSheet.create({
  list__container: {
    margin: 10,
    height: '85%',
    width: '100%',
  },

  // item: {
  //   margin: 5,
  //   borderBottomWidth: 2,
  //   borderBottomColor: "lightgrey",
  // },
  // description: {
  //   fontFamily: "Karla-Light",
  //   fontSize: 18,
  //   color: "#FFF",
  //   fontWeight: "bold",
  //   // marginBottom: 5,
  //   fontStyle: "italic",
  // },
});
