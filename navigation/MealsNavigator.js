import React from "react";
import { Platform, StyleSheet, Text } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import colors from "../constants/colors";
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import FiltersScreen from "../screens/FiltersScreen";

const defaultNavHeaderOptions = {
  mode: "modal",
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor:
        Platform.OS === "android" ? colors.primaryColor : "white",
    },
    headerTitleStyle: {
      fontFamily: "open-sans-bold",
    },
    headerTintColor: Platform.OS === "android" ? "white" : colors.primaryColor,
  },
};

const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen,
    },
    CategoryMeals: {
      screen: CategoryMealsScreen, //Anothem from of telling a navigator about the screen. (Later we will need to load smth else otherviwe the screen)
    },
    MealDetail: MealDetailScreen,
  },
  defaultNavHeaderOptions
);

const FavNavigator = createStackNavigator(
  {
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen,
  },
  defaultNavHeaderOptions
);

const FiltersNavigator = createStackNavigator(
  {
    Filters: FiltersScreen,
  },
  defaultNavHeaderOptions
);

const tabBarConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: colors.primaryColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Meals</Text>
        ) : (
          "Meals"
        ),
    },
  },
  Favorites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-star" size={24} color={tabInfo.tintColor} />;
      },
      tabBarColor: colors.accentColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Favorites</Text>
        ) : (
          "Favorites"
        ),
    },
  },
};

const MealsFavTabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabBarConfig, {
        activeColor: "white",
        shifting: true,
      })
    : createBottomTabNavigator(tabBarConfig, {
        tabBarOptions: {
          labelStyle: {
            fontFamily: "open-sans-bold",
          },
          activeTintColor: colors.accentColor,
        },
      });

const MainNavigator = createDrawerNavigator(
  {
    MealsFav: {
      screen: MealsFavTabNavigator,
      navigationOptions: { drawerLabel: "Meals" },
    },
    Filters: FiltersNavigator,
  },
  {
    drawerWidth: "60%",
    contentOptions: {
      inactiveTintColor: "white",
      activeTintColor: colors.accentColor,
      labelStyle: {
        fontFamily: "open-sans",
      },
    },
    drawerBackgroundColor: colors.primaryColor,
    drawerType: "front",
  }
);

export default createAppContainer(MainNavigator);

const styles = StyleSheet.create({});
