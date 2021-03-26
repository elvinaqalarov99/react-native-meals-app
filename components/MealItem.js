import React from "react";
import {
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  View,
} from "react-native";

const MealItem = (props) => {
  return (
    <TouchableOpacity onPress={props.onSelectMeal}>
      <View style={styles.mealItem}>
        <View>
          <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
            <ImageBackground
              style={styles.bgImage}
              source={{
                uri: props.meal.item.imageUrl,
              }}
            >
              <View style={styles.titleContainer}>
                <Text style={styles.title} numberOfLines={1}>
                  {props.meal.item.title}
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={{ ...styles.mealRow, ...styles.mealDetail }}>
            <Text style={styles.detail}>{props.meal.item.duration}m</Text>
            <Text style={styles.detail}>
              {props.meal.item.complexity.toUpperCase()}
            </Text>
            <Text style={styles.detail}>
              {props.meal.item.affordable.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MealItem;

const styles = StyleSheet.create({
  mealItem: {
    height: 200,
    width: "100%",
    backgroundColor: "#ccc",
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  mealRow: {
    flexDirection: "row",
  },
  mealHeader: {
    height: "85%",
  },
  mealDetail: {
    height: "15%",
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  bgImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  titleContainer: {
    paddingVertical: 5,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 10,
  },
  title: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontFamily: "open-sans-bold",
  },
  detail: {
    fontFamily: "open-sans-bold",
  },
});
