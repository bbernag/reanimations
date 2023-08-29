import React from "react";
import { ScrollView, View } from "react-native";
// import Select from "./Select";
import Select from "react-native-selector-picker";

function SelectSample() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <View>
        <View>
          <Select name="select_1"></Select>
        </View>
      </View>
      <Select
        name="select_2"
        defaultValue={{ name: "D.C. United", value: "dc-united" }}
        optionStyle={{ color: "red" }}
      ></Select>
      <Select name="select_3"></Select>
      <Select name="select_4"></Select>
      <Select
        name="select_5"
        optionsHeight={500}
        defaultValue={{ name: "Hola", value: "" }}
      ></Select>
      <Select
        name="select_6"
        selectedOptionContainerStyle={{ height: 45 }}
      ></Select>
      <Select
        name="select_7"
        selectedOptionContainerStyle={{ height: 45 }}
      ></Select>
      <Select
        name="select_8"
        selectedOptionContainerStyle={{ height: 45 }}
      ></Select>
      <Select
        name="select_8"
        selectedOptionContainerStyle={{ height: 45 }}
      ></Select>
      <Select
        name="select_9"
        selectedOptionContainerStyle={{ height: 45 }}
      ></Select>
      <Select
        name="select_10"
        selectedOptionContainerStyle={{ height: 45 }}
      ></Select>
      <Select
        name="select_11"
        selectedOptionContainerStyle={{ height: 45 }}
      ></Select>
      <Select
        name="select_12"
        selectedOptionContainerStyle={{ height: 45 }}
      ></Select>
      <Select
        name="select_13"
        selectedOptionContainerStyle={{ height: 45 }}
      ></Select>
      <Select
        name="select_14"
        selectedOptionContainerStyle={{ height: 45 }}
      ></Select>
      <Select
        name="select_15"
        selectedOptionContainerStyle={{ height: 45 }}
      ></Select>
    </ScrollView>
  );
}

export default SelectSample;
