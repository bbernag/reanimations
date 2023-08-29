import React from "react";
import { StyleSheet, Text, View } from "react-native";

type TOptionsContainerPlaceholder = {
  color?: string;
  optionsHeight: number;
  optionsPlaceholder?: string;
};

function OptionsContainerPlaceholder({
  color,
  optionsHeight,
  optionsPlaceholder,
}: TOptionsContainerPlaceholder) {
  return (
    <View style={[{ height: optionsHeight }, styles.placeholderContainer]}>
      <Text style={{ color }}>{optionsPlaceholder}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  placeholderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OptionsContainerPlaceholder;
