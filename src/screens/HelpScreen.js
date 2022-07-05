import React, {useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import WeeklyLineChartContainer from '../charting/WeeklyLineChartContainer';
import TrackerContext from '../TrackerContext';

function HelpScreen() {
  const {width} = Dimensions.get('window');
  const height = 256;
  const {trackerItems} = useContext(TrackerContext);

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={[styles.chartContainer, {color: 'white'}]}>
        {/* <Text style={{ color: "white" }}>test</Text> */}
        <WeeklyLineChartContainer trackerItems={trackerItems} />
      </ScrollView>
      <ScrollView style={styles.textSectionContainer}>
        <Text style={styles.mainHeading}>
          Glycemic Index: What It Is and How to Use It
        </Text>
        <Text style={styles.paragraph}>
          The glycemic index is a tool that’s often used to promote better blood
          sugar management.
        </Text>
        <Text style={styles.paragraph}>
          Several factors influence the glycemic index of a food, including its
          nutrient composition, cooking method, ripeness, and the amount of
          processing it has undergone.
        </Text>
        <Text style={styles.paragraph}>
          The glycemic index can not only help increase your awareness of what
          you’re putting on your plate but also enhance weight loss, decrease
          your blood sugar levels, and reduce your cholesterol.
        </Text>
        <Text style={styles.paragraph}>
          This article takes a closer look at the glycemic index, including what
          it is, how it can affect your health, and how to use it.
        </Text>
        <Image
          style={styles.tinyLogo}
          source={require('../../assets/images/breakfast-food-1296x728-header.jpg')}
        />
        <Text style={styles.subHeading}>What is the glycemic index?</Text>
        <Text style={styles.paragraph}>
          The glycemic index (GI) is a value used to measure how much specific
          foods increase blood sugar levels.
        </Text>
        <Text style={styles.paragraph}>
          Foods are classified as low, medium, or high glycemic foods and ranked
          on a scale of 0–100.
        </Text>
        {/*<Text style={styles.paragraph}>
          The lower the GI of a specific food, the less it may affect your blood
          sugar levels.
        </Text>
        <Text style={styles.paragraph}>Here are the three GI ratings:</Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bulletPoint}>{'\u2B24'}</Text>
          <Text style={{fontWeight: 'bold'}}>Low</Text>: 55 or less
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bulletPoint}>{'\u2B24'}</Text>
          <Text style={{fontWeight: 'bold'}}>Medium</Text>: 56–69
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bulletPoint}>{'\u2B24'}</Text>
          <Text style={{fontWeight: 'bold'}}>High</Text>: 70 or above
        </Text>
        <Text style={styles.paragraph}>
          Foods high in refined carbs and sugar are digested more quickly and
          often have a high GI, while foods high in protein, fat, or fiber
          typically have a low GI. Foods that contain no carbs are not assigned
          a GI and include meat, fish, poultry, nuts, seeds, herbs, spices, and
          oils.
        </Text>
        <Text style={styles.paragraph}>
          Other factors that affect the GI of a food include the ripeness,
          cooking method, type of sugar it contains, and amount of processing it
          has undergone.
        </Text>
        <Text style={styles.paragraph}>
          Keep in mind that the glycemic index is different from the glycemic
          load (GL).
        </Text>
        <Text style={styles.paragraph}>
          Unlike the GI, which doesn’t take into account the amount of food
          eaten, the GL factors in the number of carbs in a serving of a food to
          determine how it may affect blood sugar levels.
        </Text>
        <Text style={styles.paragraph}>
          For this reason, it’s important to take both the glycemic index and
          glycemic load into consideration when selecting foods to help support
          healthy blood sugar levels.
        </Text>
        <Text style={styles.summaryHeading}>Summary</Text>
        <Text style={styles.summaryBox}>
          The glycemic index is used to measure how much a specific food
          increases your blood sugar levels. The higher the GI, the greater the
          effect on blood sugar levels.
        </Text>
        <Text style={styles.subHeading}>Low glycemic diet</Text>
        <Text style={styles.paragraph}>
          The low glycemic diet involves swapping out foods with a high GI for
          those with a lower GI.
        </Text>
        <Text style={styles.smallHeading}>Benefits</Text>
        <Text style={styles.paragraph}>
          Following a low glycemic diet may offer several health benefits,
          including:
        </Text>
        <Text style={styles.paragraph}>
          <Text style={{ fontWeight: "bold" }}>
            <Text style={{ fontSize: 9 }}>{"\u2B24"}</Text>Improved blood sugar
            regulation.
          </Text>
          Many studies have found that following a low GI diet may reduce blood
          sugar levels and improve blood sugar management in people with type 2
          diabetes
        </Text>
        <Text style={styles.paragraph}>
          <Text style={{ fontWeight: "bold" }}>
            <Text style={{ fontSize: 9 }}>{"\u2B24"}</Text>Increased weight
            loss.
          </Text>
          Some research shows that following a low GI diet may increase
          short-term weight loss. More studies are needed to determine how it
          affects long-term weight management
        </Text>
        <Text style={styles.paragraph}>
          <Text style={{ fontWeight: "bold" }}>
            <Text style={{ fontSize: 9 }}>{"\u2B24"}</Text>Reduced cholesterol
            levels.
          </Text>
          Following a low GI diet may help lower levels of both total and LDL
          (bad) cholesterol, both of which are risk factors for heart disease
        </Text>
        <Text style={styles.summaryHeading}>Summary</Text>
        <Text style={styles.summaryBox}>
          Following a low glycemic diet involves swapping out foods that have a
          high GI with low GI alternatives. A low glycemic diet may help manage
          blood sugar levels, reduce your cholesterol, and boost short-term
          weight loss.
        </Text> */}
      </ScrollView>
    </View>
  );
}

export default HelpScreen;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#011',
  },
  textSectionContainer: {
    //    backgroundColor: "#f7f7f7",
    backgroundColor: '#011',
    // marginTop: 200,
    // backgroundColor: "white",
  },
  chartContainer: {
    //    backgroundColor: "#f7f7f7",
    backgroundColor: '#011',
    paddingBottom: 30,
    // backgroundColor: "white",
  },
  paragraph: {
    lineHeight: 18,
    color: '#FFF',
    marginBottom: 12,
  },
  mainHeading: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    paddingTop: 10,
    paddingRight: 10,
    color: '#FFF',
    marginBottom: 12,
  },
  subHeading: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 12,
  },
  smallHeading: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 12,
  },
  summaryHeading: {
    textTransform: 'uppercase',
    color: '#f0533a',
    lineHeight: 26,
    marginBottom: 6,
    //    backgroundColor: "#f7f7f7",
    backgroundColor: '#000',
  },
  summaryBox: {
    lineHeight: 22,
    //    backgroundColor: "#f7f7f7",
    backgroundColor: '#000',
    marginBottom: 12,
  },
  text: {
    color: '#FFF',
    fontFamily: 'Karla-Light',
    fontSize: 16,
  },
  tinyLogo: {
    width: 324,
    height: 182,
    alignSelf: 'center',
    marginBottom: 12,
  },
  bulletPoint: {
    color: 'orange',
    fontSize: 9,
  },
});
