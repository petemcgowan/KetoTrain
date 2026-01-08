import React, { memo, useCallback, useContext, useRef } from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native'
import { debounce } from 'lodash'
import { ThemeContext } from '../state/ThemeContext'
import { RFPercentage } from 'react-native-responsive-fontsize'
import FontAwesome6 from '@react-native-vector-icons/fontawesome6'

interface SearchBarProps {
  searchPhrase: string;
  setSearchPhrase: (text: string) => void;
  clicked: boolean;
  setClicked: (clicked: boolean) => void;
  placeholderColor?: string;
}

const SearchBar = memo(
  ({
    searchPhrase,
    setSearchPhrase,
    clicked,
    setClicked,
    placeholderColor,
  }: SearchBarProps) => {
    const context = useContext(ThemeContext)
    if (!context) {
      throw new Error('useContext was used outside of the theme provider')
    }
    const { theme } = context
    const styles = getStyles(theme)
    const searchInput = useRef < TextInput > null

    const handleChangeText = useCallback(
      (text: string) => {
        setSearchPhrase(text)
      },
      [setSearchPhrase]
    )

    const handleClear = useCallback(() => {
      setSearchPhrase('')
      searchInput.current?.focus()
    }, [setSearchPhrase])

    const handleFocus = useCallback(() => {
      setClicked(true)
    }, [setClicked])

    const handleSearchBarPress = useCallback(() => {
      if (searchInput.current) {
        searchInput.current.focus()
      }
    }, [])

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={handleSearchBarPress}>
          <View style={styles.searchBar__unclicked}>
            {/* Search Icon (Optional, adds context) */}
            <View style={{ paddingLeft: 10 }}>
              <FontAwesome6
                name="magnifying-glass"
                size={RFPercentage(2)}
                color={theme.buttonText}
                style={{ opacity: 0.5 }}
                iconStyle="solid"
              />
            </View>

            <TextInput
              ref={searchInput}
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor={placeholderColor || 'grey'}
              value={searchPhrase}
              onChangeText={handleChangeText}
              onFocus={handleFocus}
            />

            {/* Clear Button - Only show if text exists */}
            {searchPhrase.length > 0 && (
              <TouchableOpacity
                onPress={handleClear}
                style={styles.clearButton}
              >
                <FontAwesome6
                  name="circle-xmark"
                  size={RFPercentage(2.2)}
                  color={theme.buttonText}
                  iconStyle="solid"
                  style={{ opacity: 0.7 }}
                />
              </TouchableOpacity>
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
)

export default SearchBar

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    searchBar__unclicked: {
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
    },
    searchInput: {
      flex: 1,
      paddingVertical: 5,
      paddingHorizontal: 10,
      fontSize: RFPercentage(2.5),
      color: theme.buttonText,
    },
    clearButton: {
      padding: 5,
      marginRight: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
