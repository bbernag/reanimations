import React from "react";
import { StyleSheet, Text, TextStyle, TouchableOpacity } from "react-native";
import { TOption } from "./Types/TOption";

export type OptionProps = {
  option: TOption;
  color: string;
  isActive: boolean;
  optionStyle?: TextStyle;
  handleSelectedOption: (option: TOption) => void;
};

function Option({
  option,
  color,
  isActive,
  optionStyle,
  handleSelectedOption,
}: OptionProps) {
  return (
    <TouchableOpacity
      key={option.value}
      style={styles.select_option__no_selected}
      onPress={() => handleSelectedOption(option)}
    >
      <Text
        style={[
          styles.select_option__no_selected_label,
          { fontWeight: isActive ? "bold" : "normal" },
          { color },
          optionStyle,
        ]}
      >
        {option.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  select_option__no_selected_label: {
    color: "#fff",
  },
  select_option__no_selected: {
    padding: 8,
    height: 40,
  },
});

export default Option;
