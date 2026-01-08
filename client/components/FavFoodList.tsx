import React, {
  useContext,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import GlycemicItem, { TOTAL_ITEM_HEIGHT } from './GlycemicItem';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { ThemeContext } from '../state/ThemeContext';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface Props {
  searchPhraseNew: string;
  onItemPress: (item: any) => void;
}

const FavFoodList = ({ searchPhraseNew, onItemPress }: Props) => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('No Theme Context');
  const { theme } = context;
  const styles = getStyles(theme);

  const favFoodList =
    useSelector((state: RootState) => state.favFoodList) || [];

  // Filter Logic
  const filteredList = useMemo(() => {
    if (searchPhraseNew === '') return favFoodList;
    const term = searchPhraseNew.toUpperCase();
    return favFoodList.filter(
      (item: any) =>
        item.foodName && item.foodName.toUpperCase().includes(term),
    );
  }, [favFoodList, searchPhraseNew]);

  // Layout Optimization
  const getItemLayout = useCallback(
    (data: any, index: number) => ({
      length: TOTAL_ITEM_HEIGHT,
      offset: TOTAL_ITEM_HEIGHT * index,
      index,
    }),
    [],
  );

  const renderItem = useCallback(
    ({ item }: { item: any }) => {
      return (
        <GlycemicItem
          key={item.publicFoodKey}
          descriptionGI={item.foodName}
          carbAmt={item.carbohydrates}
          carbBackgroundColor={item.carbBackgroundColor}
          isFavourite={true}
          onPressDetail={() => onItemPress(item)}
        />
      );
    },
    [onItemPress],
  );

  return (
    <View style={styles.container}>
      {filteredList.length > 0 ? (
        <FlatList
          data={filteredList}
          renderItem={renderItem}
          keyExtractor={item => item.publicFoodKey || item.id}
          initialNumToRender={15}
          maxToRenderPerBatch={15}
          windowSize={7}
          getItemLayout={getItemLayout}
          removeClippedSubviews={true}
          contentContainerStyle={{ paddingBottom: 50 }}
        />
      ) : (
        <View style={styles.errorContainer}>
          <FontAwesome6
            name="face-frown"
            size={RFPercentage(4.9)}
            color="grey"
            iconStyle="solid"
          />
          <Text style={styles.errorText}>
            {searchPhraseNew
              ? 'No matching favorites found.'
              : "You haven't added any favorite foods yet."}
          </Text>
        </View>
      )}
    </View>
  );
};

export default FavFoodList;

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent',
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
