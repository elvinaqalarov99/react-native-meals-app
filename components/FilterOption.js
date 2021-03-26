import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Switch } from "react-native-paper";
import colors from "../constants/colors";

const FilterOption = (props) => {
  return (
    <View style={styles.options}>
      <Text style={{ fontFamily: "open-sans-bold", fontSize: 18 }}>
        {props.title}
      </Text>
      <Switch
        color={colors.primaryColor}
        value={props.value}
        onValueChange={() => props.toggleOption(props.id)}
      />
    </View>
  );
};

export default FilterOption;

const styles = StyleSheet.create({
  options: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    marginVertical: 20,
  },
});
