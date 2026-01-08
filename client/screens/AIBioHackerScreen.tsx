import React, { useState, useContext, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Keyboard,
  Platform,
} from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { ThemeContext } from '../state/ThemeContext';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  FadeInDown,
  FadeOutUp,
} from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';
import { useMutation } from '@apollo/client/react';
import { gql } from '@apollo/client';
import GradientBackground from '../components/GradientBackground';

const { width, height } = Dimensions.get('window');

// Extended Master List for Shuffling
const MASTER_DB = [
  'Black Coffee',
  'Berberine',
  'Bone Broth',
  'Whiskey',
  'Lemon Water',
  'Blueberries',
  'Creatine',
  'Stevia',
  'Sauna',
  'MCT Oil',
  'Apple Cider Vinegar',
  'Cold Plunge',
  'Magnesium',
  'Green Tea',
  'Diet Coke',
  'Heavy Cream',
  'Macadamia Nuts',
  'Avocado',
  'Pickle Juice',
  'Baking Soda',
  'Exogenous Ketones',
  'Water Fasting',
  'Aerobic Exercise',
  'Weight Lifting',
  'Meditation',
];

// GraphQL Mutation
const ANALYZE_MUTATION = gql`
  mutation AnalyzeSubstance($query: String!) {
    analyzeSubstance(query: $query) {
      safeForFasting
      insulinSpike
      ketosisImpact
      verdict
      icon
    }
  }
`;

export default function AIBioHackerScreen() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('No Theme Context');
  const { theme } = context;
  const styles = getStyles(theme);

  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  // Quick Chips State (Slice 8 items)
  const [quickOptions, setQuickOptions] = useState<string[]>(
    MASTER_DB.slice(0, 8),
  );

  // Animation Values
  const meterWidth = useSharedValue(0);

  // API Hook
  const [analyzeMutation] = useMutation(ANALYZE_MUTATION);

  // Auto-Reset when leaving tab
  useFocusEffect(
    useCallback(() => {
      return () => {
        setResult(null);
        setQuery('');
        setLoading(false);
      };
    }, []),
  );

  const shuffleOptions = () => {
    const shuffled = [...MASTER_DB].sort(() => 0.5 - Math.random());
    setQuickOptions(shuffled.slice(0, 8));
  };

  const analyzeSubstance = async (inputTerm: string) => {
    Keyboard.dismiss();
    setQuery(inputTerm);
    setLoading(true);
    setResult(null);
    meterWidth.value = 0;

    try {
      console.log('Analyzing:', inputTerm);
      const { data } = await analyzeMutation({
        variables: { query: inputTerm },
      });

      const apiResult = data.analyzeSubstance;

      setResult(apiResult);
      setLoading(false);

      // Animate meter based on insulin spike (0-100)
      meterWidth.value = withTiming(apiResult.insulinSpike, { duration: 1000 });
    } catch (error) {
      console.error('AI Error', error);
      setLoading(false);
    }
  };

  const resetSearch = () => {
    setResult(null);
    setQuery('');
    setLoading(false);
    meterWidth.value = 0;
  };

  const animatedMeterStyle = useAnimatedStyle(() => ({
    width: `${meterWidth.value}%`,
    backgroundColor: meterWidth.value > 20 ? '#ff6b6b' : '#4ecdc4',
  }));

  return (
    <GradientBackground>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.headerSection}>
          <View style={styles.iconCircle}>
            <FontAwesome6
              name="dna"
              size={RFPercentage(3.5)}
              color={theme.buttonText}
              iconStyle="solid"
            />
          </View>
          <Text style={styles.headerTitle}>Keto Oracle</Text>
          <Text style={styles.headerSubtitle}>
            Analyze supplements, drinks, or foods.
          </Text>
        </View>

        {/* Input - Only show if no result */}
        {!result && (
          <Animated.View exiting={FadeOutUp} style={styles.inputSection}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Search..."
                placeholderTextColor={theme.iconFill}
                value={query}
                onChangeText={setQuery}
              />
              <TouchableOpacity
                style={styles.analyzeButton}
                onPress={() => analyzeSubstance(query)}
                disabled={loading || !query}
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <FontAwesome6
                    name="magnifying-glass"
                    size={RFPercentage(2)}
                    color="white"
                    iconStyle="solid"
                  />
                )}
              </TouchableOpacity>
            </View>

            {/* Shuffle / Quick Chips */}
            <View style={styles.chipsWrapper}>
              <View style={styles.chipHeaderRow}>
                <Text style={styles.sectionLabel}>QUICK ANALYZE</Text>
                <TouchableOpacity
                  onPress={shuffleOptions}
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                >
                  <FontAwesome6
                    name="dice"
                    size={16}
                    color={theme.buttonText}
                    iconStyle="solid"
                    style={{ marginRight: 5 }}
                  />
                  <Text style={styles.shuffleText}>Shuffle</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.chipContainer}>
                {quickOptions.map(item => (
                  <TouchableOpacity
                    key={item}
                    style={styles.chip}
                    onPress={() => analyzeSubstance(item)}
                  >
                    <Text style={styles.chipText}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </Animated.View>
        )}

        {/* Results Dashboard */}
        {result && (
          <Animated.View
            entering={FadeInDown.springify().damping(14)}
            style={styles.resultCard}
          >
            {/* Result Header */}
            <View style={styles.resultHeader}>
              <Text style={styles.resultTitle}>{query}</Text>
              <View
                style={[
                  styles.badge,
                  result.safeForFasting ? styles.badgeSafe : styles.badgeUnsafe,
                ]}
              >
                <FontAwesome6
                  name={result.safeForFasting ? 'check' : 'xmark'}
                  size={10}
                  color="white"
                  iconStyle="solid"
                  style={{ marginRight: 5 }}
                />
                <Text style={styles.badgeText}>
                  {result.safeForFasting ? 'FASTING SAFE' : 'BREAKS FAST'}
                </Text>
              </View>
            </View>

            {/* Gauge */}
            <View style={styles.gaugeContainer}>
              <View style={styles.gaugeHeader}>
                <Text style={styles.gaugeLabel}>INSULIN RESPONSE</Text>
                <Text style={styles.gaugeValue}>{result.insulinSpike}/100</Text>
              </View>
              <View style={styles.meterTrack}>
                <Animated.View style={[styles.meterFill, animatedMeterStyle]} />
              </View>
            </View>

            {/* Tiles */}
            <View style={styles.gridContainer}>
              <View style={styles.glassTile}>
                <FontAwesome6
                  name="bolt"
                  size={RFPercentage(2.5)}
                  color={theme.buttonText}
                  iconStyle="solid"
                />
                <Text style={styles.tileLabel}>KETOSIS</Text>
                <Text style={styles.tileValue}>{result.ketosisImpact}</Text>
              </View>
              <View style={styles.glassTile}>
                <FontAwesome6
                  name="brain"
                  size={RFPercentage(2.5)}
                  color={theme.buttonText}
                  iconStyle="solid"
                />
                <Text style={styles.tileLabel}>AUTOPHAGY</Text>
                <Text style={styles.tileValue}>
                  {result.safeForFasting ? 'Active' : 'Stopped'}
                </Text>
              </View>
            </View>

            {/* Verdict */}
            <View style={styles.verdictContainer}>
              <FontAwesome6
                name="quote-left"
                size={14}
                color="rgba(255,255,255,0.3)"
                iconStyle="solid"
                style={{ marginBottom: 5 }}
              />
              <Text style={styles.verdictText}>{result.verdict}</Text>
            </View>

            {/* Reset Button */}
            <TouchableOpacity
              style={styles.scanAnotherButton}
              onPress={resetSearch}
            >
              <Text style={styles.scanAnotherText}>SCAN ANOTHER</Text>
              <FontAwesome6
                name="rotate-right"
                size={14}
                color={theme.buttonText}
                iconStyle="solid"
                style={{ marginLeft: 8 }}
              />
            </TouchableOpacity>
          </Animated.View>
        )}
      </ScrollView>
    </GradientBackground>
  );
}

const getStyles = (theme: any) =>
  StyleSheet.create({
    scrollContent: {
      paddingHorizontal: width * 0.05,
      paddingBottom: height * 0.03,
    },
    headerSection: {
      alignItems: 'center',
      marginBottom: height * 0.03,
      marginTop: height * 0.02,
    },
    iconCircle: {
      width: width * 0.16,
      height: width * 0.16,
      borderRadius: (width * 0.16) / 2,
      backgroundColor: 'rgba(255,255,255,0.05)',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: height * 0.02,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.1)',
    },
    headerTitle: {
      fontSize: RFPercentage(3.5),
      fontWeight: '900',
      color: theme.buttonText,
      letterSpacing: 1,
    },
    headerSubtitle: {
      fontSize: RFPercentage(1.8),
      color: theme.buttonText,
      opacity: 0.6,
      marginTop: 5,
    },

    // Input Section
    inputSection: { width: '100%' },
    inputContainer: { flexDirection: 'row', marginBottom: height * 0.04 },
    textInput: {
      flex: 1,
      height: height * 0.07,
      backgroundColor: 'rgba(0,0,0,0.2)',
      borderRadius: 15,
      paddingHorizontal: 20,
      color: theme.buttonText,
      fontSize: RFPercentage(2),
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.1)',
    },
    analyzeButton: {
      width: height * 0.07,
      height: height * 0.07,
      backgroundColor: theme.buttonBackground,
      borderRadius: 15,
      marginLeft: 10,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: theme.buttonBackground,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 5,
      elevation: 5,
    },

    // Chips
    chipsWrapper: { marginTop: 10 },
    chipHeaderRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
    },
    sectionLabel: {
      color: theme.buttonText,
      opacity: 0.4,
      fontSize: RFPercentage(1.4),
      fontWeight: 'bold',
      letterSpacing: 1,
    },
    shuffleText: {
      color: theme.buttonText,
      fontSize: RFPercentage(1.9),
      opacity: 0.8,
    },
    chipContainer: { flexDirection: 'row', flexWrap: 'wrap' },
    chip: {
      backgroundColor: 'rgba(255,255,255,0.05)',
      borderRadius: 20,
      paddingVertical: height * 0.012,
      paddingHorizontal: width * 0.04,
      marginRight: 8,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.05)',
    },
    chipText: { color: theme.buttonText, fontSize: RFPercentage(1.8) },

    // Results
    resultCard: {
      backgroundColor: 'rgba(255,255,255,0.05)',
      borderRadius: 20,
      padding: width * 0.05,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.1)',
    },
    resultHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: height * 0.025,
    },
    resultTitle: {
      fontSize: RFPercentage(2.6),
      fontWeight: 'bold',
      color: theme.buttonText,
      textTransform: 'capitalize',
      flex: 1,
      marginRight: 10,
    },
    badge: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
    },
    badgeSafe: { backgroundColor: '#4ecdc4' },
    badgeUnsafe: { backgroundColor: '#ff6b6b' },
    badgeText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: RFPercentage(1.2),
      letterSpacing: 0.5,
    },

    // Gauge
    gaugeContainer: { marginBottom: height * 0.03 },
    gaugeHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    gaugeLabel: {
      color: theme.buttonText,
      opacity: 0.6,
      fontSize: RFPercentage(1.2),
      fontWeight: 'bold',
    },
    gaugeValue: {
      color: theme.buttonText,
      fontSize: RFPercentage(1.2),
      fontWeight: 'bold',
    },
    meterTrack: {
      height: 8,
      backgroundColor: 'rgba(0,0,0,0.3)',
      borderRadius: 4,
      overflow: 'hidden',
    },
    meterFill: { height: '100%', borderRadius: 4 },

    // Grid
    gridContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: height * 0.025,
    },
    glassTile: {
      width: '48%',
      backgroundColor: 'rgba(255,255,255,0.03)',
      borderRadius: 15,
      padding: 15,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.05)',
    },
    tileLabel: {
      color: theme.buttonText,
      opacity: 0.5,
      fontSize: RFPercentage(1.2),
      fontWeight: 'bold',
      marginTop: 10,
      marginBottom: 5,
    },
    tileValue: {
      color: theme.buttonText,
      fontSize: RFPercentage(2),
      fontWeight: 'bold',
    },

    // Verdict
    verdictContainer: {
      backgroundColor: 'rgba(0,0,0,0.2)',
      borderRadius: 15,
      padding: 15,
      marginBottom: 15,
    },
    verdictText: {
      color: theme.buttonText,
      lineHeight: 22,
      fontSize: RFPercentage(1.9),
    },

    // Scan Another
    scanAnotherButton: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 15,
      marginTop: 5,
      backgroundColor: 'rgba(255,255,255,0.08)',
      borderRadius: 15,
    },
    scanAnotherText: {
      color: theme.buttonText,
      fontWeight: 'bold',
      fontSize: RFPercentage(1.8),
      letterSpacing: 1,
    },
  });
