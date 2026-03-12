import React, {
  useContext,
  useCallback,
  useMemo,
  useEffect,
  useRef,
  useState,
} from 'react'
import { StyleSheet, View, FlatList, Text } from 'react-native'
import GlycemicItem, { TOTAL_ITEM_HEIGHT } from '../components/GlycemicItem'
import FontAwesome6 from '@react-native-vector-icons/fontawesome6'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { ThemeContext } from '../state/ThemeContext'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import UserContext, { UserContextProps } from '../state/UserContext'
import { semanticFoodSearch } from './GlycemicUtils'
import { debounce } from 'lodash'

interface Props {
  searchPhraseNew: string
  jumpToLetter: string
  onItemPress: (item: any) => void
}

const SEMANTIC_SEARCH_MIN_CHARS = 3
const SEMANTIC_SEARCH_DEBOUNCE_MS = 400
const SEMANTIC_SIMILARITY_THRESHOLD = 0.55

const SearchFoodFlatlistFilter = ({
  searchPhraseNew,
  jumpToLetter,
  onItemPress,
}: Props) => {
  const searchFoodList = useSelector((state: RootState) => state.searchFoodList)
  const favFoodList = useSelector((state: RootState) => state.favFoodList) || []
  const { userId } = useContext<UserContextProps>(UserContext)

  const [semanticResults, setSemanticResults] = useState<any[]>([])
  const [isSemanticLoading, setIsSemanticLoading] = useState(false)

  const context = useContext(ThemeContext)
  if (!context) throw new Error('No Theme Context')
  const { theme } = context
  const styles = getStyles(theme)

  const flatListRef = useRef<FlatList>(null)

  const favSet = useMemo(() => {
    const set = new Set()
    favFoodList.forEach((item: any) => set.add(item.foodName))
    return set
  }, [favFoodList])

  const filteredList = useMemo(() => {
    const term = searchPhraseNew.toUpperCase()
    if (!term) return searchFoodList
    return searchFoodList.filter((item: any) => {
      if (!item.foodName) return false
      return item.foodName.toUpperCase().includes(term)
    })
  }, [searchFoodList, searchPhraseNew])

  const debouncedSearch = useRef(
    debounce(async (query: string, uid: number | null) => {
      if (!uid || query.length < SEMANTIC_SEARCH_MIN_CHARS) {
        setSemanticResults([])
        return
      }
      setIsSemanticLoading(true)
      try {
        const results = await semanticFoodSearch(query, uid, 15)
        const mapped = results
          .filter((r: any) => r.similarity >= SEMANTIC_SIMILARITY_THRESHOLD)
          .map((r: any) => ({
            foodName: r.food_name,
            foodFactsId: r.food_facts_id,
            publicFoodKey: r.public_food_key,
            carbohydrates: Math.round(r.carbohydrates),
            energy: r.energy,
            fatTotal: r.fat_total,
            protein: r.protein,
            sodium: r.sodium,
            totalDietaryFibre: r.total_dietary_fibre,
            totalSugars: r.total_sugars,
            isFavourite: r.isFavourite,
            similarity: r.similarity,
            carbBackgroundColor:
              r.carbohydrates > 22
                ? theme.badBackground
                : r.carbohydrates > 11
                  ? theme.middlingBackground
                  : theme.tableBackground,
          }))
        setSemanticResults(mapped)
      } catch {
        setSemanticResults([])
      } finally {
        setIsSemanticLoading(false)
      }
    }, SEMANTIC_SEARCH_DEBOUNCE_MS)
  ).current

  useEffect(() => {
    const isSemanticQuery =
      searchPhraseNew.length >= SEMANTIC_SEARCH_MIN_CHARS && userId
    if (isSemanticQuery) {
      setIsSemanticLoading(true)
    } else {
      setSemanticResults([])
      setIsSemanticLoading(false)
    }
    debouncedSearch(searchPhraseNew, userId)
    return () => debouncedSearch.cancel()
  }, [searchPhraseNew, userId])

  const combinedList = useMemo(() => {
    if (!searchPhraseNew || semanticResults.length === 0) return filteredList

    const localNames = new Set(
      filteredList.map((item: any) => item.foodName?.toUpperCase())
    )
    const uniqueSemantic = semanticResults.filter(
      (item: any) => !localNames.has(item.foodName?.toUpperCase())
    )

    if (uniqueSemantic.length === 0) return filteredList

    return [...filteredList, ...uniqueSemantic]
  }, [filteredList, semanticResults, searchPhraseNew])

  useEffect(() => {
    if (jumpToLetter && combinedList.length > 0) {
      const index = combinedList.findIndex(
        (item: any) =>
          item.foodName &&
          item.foodName.toUpperCase().startsWith(jumpToLetter)
      )
      if (index !== -1 && flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index,
          animated: true,
          viewPosition: 0,
        })
      }
    }
  }, [jumpToLetter, combinedList])

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
      )
    },
    [favSet, onItemPress, styles]
  )

  const keyExtractor = useCallback(
    (item: any, index: number) =>
      item.publicFoodKey?.toString() ||
      item.id?.toString() ||
      `item-${index}`,
    []
  )

  const getItemLayout = useCallback(
    (_data: any, index: number) => ({
      length: TOTAL_ITEM_HEIGHT,
      offset: TOTAL_ITEM_HEIGHT * index,
      index,
    }),
    []
  )

  const hasResults = combinedList.length > 0
  const isSemanticQuery = searchPhraseNew.length >= SEMANTIC_SEARCH_MIN_CHARS
  const noTextMatches = filteredList.length === 0
  const showSearchingMessage =
    isSemanticQuery &&
    noTextMatches &&
    (isSemanticLoading || !hasResults)

  return (
    <View style={styles.container}>
      {hasResults ? (
        <FlatList
          ref={flatListRef}
          data={combinedList}
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
      ) : showSearchingMessage ? (
        <View style={styles.errorContainer}>
          <FontAwesome6
            name="wand-magic-sparkles"
            size={RFPercentage(4.9)}
            color="rgba(76,187,23, 0.6)"
            iconStyle="solid"
          />
          <Text style={styles.errorText}>Searching by meaning...</Text>
        </View>
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
  )
}

export default SearchFoodFlatlistFilter

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
  })
