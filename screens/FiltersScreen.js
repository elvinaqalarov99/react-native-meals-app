import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import FilterOption from "../components/FilterOption";
import { useDispatch } from "react-redux";
import { setFilters } from "../store/actions/meals";

const FiltersScreen = (props) => {
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const dispatch = useDispatch();

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      vegan: isVegan,
      vegetarian: isVegetarian,
      lactoseFree: isLactoseFree,
    };
    dispatch(setFilters(appliedFilters));
  }, [isGlutenFree, isVegan, isVegetarian, isLactoseFree, dispatch]);

  useEffect(() => {
    props.navigation.setParams({ saveFilters: saveFilters });
  }, [saveFilters]);

  return (
    <View style={styles.screen}>
      <FilterOption
        toggleOption={() => setIsGlutenFree(!isGlutenFree)}
        title="Gluten Free"
        value={isGlutenFree}
      />
      <FilterOption
        toggleOption={() => setIsVegan(!isVegan)}
        title="Vegan"
        value={isVegan}
      />
      <FilterOption
        toggleOption={() => setIsVegetarian(!isVegetarian)}
        title="Vegetarian"
        value={isVegetarian}
      />
      <FilterOption
        toggleOption={() => setIsLactoseFree(!isLactoseFree)}
        title="Lactose Free"
        value={isLactoseFree}
      />
    </View>
  );
};

FiltersScreen.navigationOptions = (navData) => {
  const saveFilters = navData.navigation.getParam("saveFilters");
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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="menu" iconName="ios-save" onPress={saveFilters} />
      </HeaderButtons>
    ),
  };
};

export default FiltersScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
});
