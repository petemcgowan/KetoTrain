import React, { useContext, useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import BottomSheet from '@gorhom/bottom-sheet';

import FavFoodList from '../components/FavFoodList';
import SearchBar from '../components/SearchBar';
import SearchFoodFlatlistFilter from '../components/SearchFoodFlatlistFilter';
import GradientBackground from '../components/GradientBackground';
import NutrientBottomSheet from '../components/NutrientBottomSheet';
import { PulsingHint } from '../components/PulsingHint';

import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { ThemeContext } from '../state/ThemeContext';
import { RootState } from '../redux/store';

const { width, height } = Dimensions.get('window');
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

type Props = NativeStackScreenProps<any, 'SearchScreen'>;

const SearchScreen = ({ route }: Props) => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('No Theme Context');
  const { theme } = context;
  const styles = getStyles(theme);

  const [searchPhraseNew, setSearchPhraseNew] = useState('');
  const [jumpToLetter, setJumpToLetter] = useState('');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [clicked, setClicked] = useState(false);

  const sheetRef = useRef<BottomSheet>(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const favFoodList =
    useSelector((state: RootState) => state.favFoodList) || [];
  const hasFavorites = favFoodList.length > 0;

  const favouriteAction = () => setShowOnlyFavorites(!showOnlyFavorites);

  const handleLetterPress = (letter: string) => {
    setSearchPhraseNew('');
    setJumpToLetter(letter);
    setTimeout(() => setJumpToLetter(''), 500);
  };

  const handleItemPress = (item: any) => {
    // Map data for sheet
    const adaptedItem = {
      description: item.foodName,
      carbAmt: item.carbohydrates || 0,
      energyAmt: item.energy || 0,
      proteinAmt: item.protein || 0,
      fatAmt: item.fatTotal || 0,
      fiberAmt: item.totalDietaryFibre || 0,
      sugarsAmt: item.totalSugars || 0,
      sodiumAmt: item.sodium || 0,
      consumptionDate: new Date(),
      portionCount: 1,
      foodFactsId: item.foodFactsId || 0,
    };
    setSelectedItem(adaptedItem);
    sheetRef.current?.expand();
  };

  const closeSheet = () => sheetRef.current?.close();

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        <View style={styles.headerContainer}>
          <View style={styles.searchWrapper}>
            <SearchBar
              searchPhrase={searchPhraseNew}
              setSearchPhrase={setSearchPhraseNew}
              clicked={clicked}
              setClicked={setClicked}
              placeholderColor={theme.iconFill}
            />
          </View>
          <View style={styles.favButtonContainer}>
            {!hasFavorites && !showOnlyFavorites && (
              <View style={styles.hintWrapper} pointerEvents="none">
                <PulsingHint size={50} color={'rgba(76,187,23, 0.6)'} />
              </View>
            )}
            <TouchableOpacity
              onPress={favouriteAction}
              style={styles.touchableArea}
            >
              <FontAwesome6
                name="heart"
                size={RFPercentage(3.5)}
                color={showOnlyFavorites ? 'rgb(76,187,23)' : theme.iconFill}
                iconStyle={showOnlyFavorites ? 'solid' : 'regular'}
              />
            </TouchableOpacity>
          </View>
        </View>

        {!showOnlyFavorites && (
          <View style={styles.alphabetContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 10 }}
            >
              {ALPHABET.map(letter => (
                <TouchableOpacity
                  key={letter}
                  style={styles.letterTile}
                  onPress={() => handleLetterPress(letter)}
                >
                  <Text style={styles.letterText}>{letter}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        <View style={{ flex: 1 }}>
          {showOnlyFavorites ? (
            <FavFoodList
              searchPhraseNew={searchPhraseNew}
              onItemPress={handleItemPress}
            />
          ) : (
            <SearchFoodFlatlistFilter
              searchPhraseNew={searchPhraseNew}
              jumpToLetter={jumpToLetter}
              onItemPress={handleItemPress}
            />
          )}
        </View>

        <NutrientBottomSheet
          sheetRef={sheetRef}
          trackerSelected={0}
          itemsForSelectedDate={[selectedItem]}
          clickNutrientPanel={closeSheet}
        />
      </SafeAreaView>
    </GradientBackground>
  );
};

export default SearchScreen;

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: { flex: 1 },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: width * 0.03,
      paddingVertical: height * 0.01,
      zIndex: 10,
    },
    searchWrapper: {
      flex: 1,
      height: 50,
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.2)',
      borderRadius: 10,
      borderColor: theme.tableLineColor,
      borderWidth: 1,
      marginRight: 10,
      paddingHorizontal: 5,
    },
    favButtonContainer: {
      width: width * 0.12,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    touchableArea: { padding: 5 },
    hintWrapper: { position: 'absolute', top: -10, left: -8 },
    alphabetContainer: { height: 40, marginBottom: 5 },
    letterTile: {
      width: 35,
      height: 35,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255,255,255,0.08)',
      borderRadius: 8,
      marginHorizontal: 3,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.05)',
    },
    letterText: {
      color: theme.buttonText,
      fontWeight: 'bold',
      fontSize: RFPercentage(1.8),
    },
  });
