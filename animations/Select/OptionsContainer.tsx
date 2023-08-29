import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { TOptionsContainer } from "./Types/TOptionsContainer";

function OptionsContainer({
  open,
  pageY,
  children,
  optionsHeight,
  tooltipPosition,
  backgroundColor,
  optionsContainerStyle,
}: TOptionsContainer) {
  const animation = useDerivedValue(() => {
    return open
    ? withTiming(1, { duration: 200 })
    : withTiming(0, { duration: 200 });
    // ? withSpring(1, { damping: 12 })
    // : withSpring(0, { damping: 12 });
  });

  const rStyle = useAnimatedStyle(() => {
    const height = interpolate(animation.value, [0, 1], [0, optionsHeight]);
    const bottomTranslateRanges = [pageY - 35, pageY - 16];
    const topTranslateRanges = [pageY - 30, pageY - optionsHeight - 61];

    const translationRanges =
      tooltipPosition.value === "bottom"
        ? bottomTranslateRanges
        : topTranslateRanges;

    const translateY = interpolate(animation.value, [0, 1], translationRanges);

    return {
      height,
      display: "flex",
      opacity: animation.value,
      transform: [{ translateY }],
    };
  });

  const borderStyles =
    tooltipPosition.value === "bottom" ? styles.bottomRadius : styles.topRadius;

  return (
    <Animated.ScrollView
      style={[
        { backgroundColor },
        styles.optionsContainer,
        borderStyles,
        optionsContainerStyle,
        rStyle,
      ]}
    >
      {children}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  optionsContainer: {
    height: 0,
    zIndex: 2,
    position: "absolute",
    width: "100%",
  },
  bottomRadius: {
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  topRadius: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
});

export default OptionsContainer;
