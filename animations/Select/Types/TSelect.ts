import { TextStyle, ViewStyle } from "react-native";
import { TOption } from "./TOption";

export type TSelect = {
  color?: string;
  options: TOption[];
  defaultValue?: TOption;
  selectedValue?: TOption;
  optionsHeight?: number;
  backgroundColor?: string;
  onChange: (option: TOption) => void;
  optionsContainerStyle?: ViewStyle;
  selectedOptionContainerStyle: ViewStyle;
  optionStyle?: TextStyle;
  selectedOptionStyle?: TextStyle;
  toggleOptions?: () => void;
  optionsPlaceholder?: string;
  placeholder?: string;
  name: string;
};
