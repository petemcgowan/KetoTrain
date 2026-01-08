import React, {
  useContext,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import GlycemicItem, { TOTAL_ITEM_HEIGHT } from '../components/GlycemicItem';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { ThemeContext } from '../state/ThemeContext';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface Props {
  searchPhraseNew: string;
  jumpToLetter: string;
  onItemPress: (item: any) => void;
}

const SearchFoodFlatlistFilter = ({
  searchPhraseNew,
  jumpToLetter,
  onItemPress,
}: Props) => {
  const searchFoodList = useSelector(
    (state: RootState) => state.searchFoodList,
  );
  const favFoodList =
    useSelector((state: RootState) => state.favFoodList) || [];

  const context = useContext(ThemeContext);
  if (!context) throw new Error('No Theme Context');
  const { theme } = context;
  const styles = getStyles(theme);

  const flatListRef = useRef<FlatList>(null);

  // 1. Create Set for O(1) Lookup
  const favSet = useMemo(() => {
    const set = new Set();
    favFoodList.forEach((item: any) => set.add(item.foodName));
    return set;
  }, [favFoodList]);

  // 2. Filter Logic
  const filteredList = useMemo(() => {
    const term = searchPhraseNew.toUpperCase();
    if (!term) return searchFoodList;

    return searchFoodList.filter((item: any) => {
      if (!item.foodName) return false;
      return item.foodName.toUpperCase().includes(term);
    });
  }, [searchFoodList, searchPhraseNew]);

  // 3. Scroll / Jump Logic
  useEffect(() => {
    if (jumpToLetter && filteredList.length > 0) {
      const index = filteredList.findIndex(
        (item: any) =>
          item.foodName && item.foodName.toUpperCase().startsWith(jumpToLetter),
      );

      if (index !== -1 && flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index,
          animated: true,
          viewPosition: 0,
        });
      }
    }
  }, [jumpToLetter, filteredList]);

  const renderItem = useCallback(
    ({ item }: { item: any }) => {
      return (
        <GlycemicItem
          descriptionGI={item.foodName}
          carbAmt={item.carbohydrates}
          carbBackgroundColor={item.carbBackgroundColor}
          isFavourite={favSet.has(item.foodName)}
          onPressDetail={() => onItemPress(item)}
        />
      );
    },
    [favSet, onItemPress],
  );

  const keyExtractor = useCallback(
    (item: any) =>
      item.publicFoodKey?.toString() ||
      item.id?.toString() ||
      Math.random().toString(),
    [],
  );

  // 4. Layout Optimization (Critical for Speed)
  const getItemLayout = useCallback(
    (data: any, index: number) => ({
      length: TOTAL_ITEM_HEIGHT,
      offset: TOTAL_ITEM_HEIGHT * index,
      index,
    }),
    [],
  );

  return (
    <View style={styles.container}>
      {filteredList.length > 0 ? (
        <FlatList
          ref={flatListRef}
          data={filteredList}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          initialNumToRender={15}
          maxToRenderPerBatch={15}
          windowSize={7}
          removeClippedSubviews={true}
          updateCellsBatchingPeriod={50}
          contentContainerStyle={{ paddingBottom: 50 }}
          getItemLayout={getItemLayout}
        />
      ) : (
        <View style={styles.errorContainer}>
          <FontAwesome6
            name="face-frown"
            size={RFPercentage(4.9)}
            color="grey"
            iconStyle="solid"
          />
          <Text style={styles.errorText}>No matching foods found.</Text>
        </View>
      )}
    </View>
  );
};

export default SearchFoodFlatlistFilter;

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.viewBackground,
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    errorText: {
      fontSize: RFPercentage(2.8),
      color: 'grey',
      textAlign: 'center',
      marginTop: 10,
    },
  });
