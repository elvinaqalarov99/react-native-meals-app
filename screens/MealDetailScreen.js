import React, { useEffect, useCallback } from "react";
import { Image, StyleSheet, Text, View, ScrollView } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
// import { MEALS } from "../data/dummy-data";
import HeaderButton from "../components/HeaderButton";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { List } from "react-native-paper";
import { Divider } from "react-native-paper";
import { toggleFav } from "../store/actions/meals";
import { useSelector, useDispatch } from "react-redux";
const MealDetailScreen = (props) => {
  const mealId = props.navigation.getParam("mealId");
  const mealDetail = useSelector((state) => state.meals.meals);
  const currentMealIsFav = useSelector((state) =>
    state.meals.favoriteMeals.some((meal) => meal.id === mealId)
  );

  const selectedMeal = mealDetail.find((meal) => meal.id === mealId);

  const dispatch = useDispatch();

  const toggleFavHandler = useCallback(() => {
    dispatch(toggleFav(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    // props.navigation.setParams({ mealsTitle: selectedMeal.title });
    props.navigation.setParams({ toggleFav: toggleFavHandler });
  }, [toggleFavHandler]);

  useEffect(() => {
    props.navigation.setParams({ currentMealIsFav: currentMealIsFav });
  }, [currentMealIsFav]);

  return (
    <ScrollView>
      <View style={styles.screen}>
        <View style={styles.headerContainter}>
          <Image
            style={styles.mealImg}
            source={{ uri: selectedMeal.imageUrl }}
          />
          <Text style={{ fontFamily: "open-sans-bold", fontSize: 16 }}>
            {selectedMeal.title}!
          </Text>
        </View>
        <View style={styles.options}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Entypo
              name="time-slot"
              size={24}
              color="black"
              style={{ marginRight: 3 }}
            />
            <Text>{selectedMeal.duration}m</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <AntDesign
              name="rest"
              size={24}
              color="black"
              style={{ marginRight: 3 }}
            />
            <Text>{selectedMeal.complexity}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Entypo
              name="price-tag"
              size={24}
              color="black"
              style={{ marginRight: 3 }}
            />
            <Text>{selectedMeal.affordable}</Text>
          </View>
        </View>
        <View>
          <List.AccordionGroup>
            <List.Accordion
              title="Ingredients"
              id="1"
              left={(props) => <List.Icon {...props} icon="food" />}
            >
              {selectedMeal.ingredients.map((ingredient, idx) => (
                <View>
                  <List.Item
                    title={ingredient}
                    titleNumberOfLines={10}
                    titleStyle={{ fontFamily: "open-sans" }}
                  />
                  <Divider />
                </View>
              ))}
            </List.Accordion>
            <List.Accordion
              title="Steps"
              id="2"
              left={(props) => (
                <List.Icon {...props} icon="format-list-bulleted" />
              )}
            >
              {selectedMeal.steps.map((steps, idx) => (
                <View>
                  <List.Item
                    title={steps}
                    titleNumberOfLines={10}
                    titleStyle={{ fontFamily: "open-sans" }}
                  />
                  <Divider />
                </View>
              ))}
            </List.Accordion>
          </List.AccordionGroup>
        </View>
      </View>
    </ScrollView>
  );
};

export default MealDetailScreen;

MealDetailScreen.navigationOptions = (navData) => {
  const mealTitle = navData.navigation.getParam("mealTitle");
  const toggleFav = navData.navigation.getParam("toggleFav");
  const currentMealIsFav = navData.navigation.getParam("currentMealIsFav");
  return {
    headerTitle: mealTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorite"
          iconName={currentMealIsFav ? "ios-star" : "ios-star-outline"}
          onPress={toggleFav}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerContainter: {
    alignItems: "center",
    marginBottom: 20,
  },
  mealImg: {
    width: "100%",
    height: 200,
    borderRadius: 20,
    resizeMode: "cover",
  },
  options: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
});
