import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import MealItem from "../components/MealItem";
import MealsList from "../components/MealsList";
const CategoryMealsScreen = (props) => {
  const catId = props.navigation.getParam("categoryId");
  const availableMeals = useSelector((state) => state.meals.filtredMeals);

  const displayedMeals = availableMeals?.filter(
    (meal) => meal.categoryIds.indexOf(catId) >= 0
  );

  const renderMeals = (itemData) => {
    return (
      <MealItem
        meal={itemData}
        onSelectMeal={() =>
          props.navigation.navigate({
            routeName: "MealDetail",
            params: {
              mealId: itemData.item.id,
              mealTitle: itemData.item.title,
            },
          })
        }
      />
    );
  };

  return (
    <View style={styles.screen}>
      {displayedMeals.length !== 0 ? (
        <MealsList data={displayedMeals} renderItem={renderMeals} />
      ) : (
        <Text style={{ fontFamily: "open-sans-bold" }}>
          No meals found, maybe check your filters?
        </Text>
      )}
    </View>
  );
};

CategoryMealsScreen.navigationOptions = (navigationData) => {
  const catId = navigationData.navigation.getParam("categoryId");
  const selectedCategory = CATEGORIES.find((category) => category.id === catId);
  return {
    headerTitle: selectedCategory.title,
  };
};

export default CategoryMealsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
});
