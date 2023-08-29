import { ReactNode } from "react";
import Animated from "react-native-reanimated";

export type TOptionsContainer = {
  children: ReactNode;
  color: string;
  open: boolean;
  optionsHeight: number;
  tooltipPosition: Animated.SharedValue<"top" | "bottom">;
  backgroundColor: string;
  optionsContainerStyle: any;
  optionsPlaceholder?: string;
  pageY: number;
};
