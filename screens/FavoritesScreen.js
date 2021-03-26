import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MealItem from "../components/MealItem";
import MealsList from "../components/MealsList";
// import { MEALS } from "../data/dummy-data";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { useSelector } from "react-redux";

const FavoritesScreen = (props) => {
  const favMeals = useSelector((state) => state.meals.favoriteMeals);

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
      {favMeals.length !== 0 ? (
        <MealsList data={favMeals} renderItem={renderMeals} />
      ) : (
        <Text style={{ fontFamily: "open-sans-bold" }}>
          No Favorite Meals Found. Start Adding Some!
        </Text>
      )}
    </View>
  );
};

FavoritesScreen.navigationOptions = (navData) => {
  return {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="menu"
          iconName="ios-menu"
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
  };
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});
