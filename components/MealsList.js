import React from "react";
import { FlatList, StyleSheet } from "react-native";

const MealsList = (props) => {
  return (
    <FlatList
      style={{ width: "100%" }}
      data={props.data}
      renderItem={props.renderItem}
    />
  );
};

export default MealsList;

const styles = StyleSheet.create({});
