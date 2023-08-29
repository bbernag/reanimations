import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

type TChevronProps = {
  color: string;
  animation: Animated.SharedValue<number>;
};

function Chevron({ animation, color }: TChevronProps) {
  const rChevronStyle = useAnimatedStyle(() => {
    const rotate = interpolate(animation.value, [0, 1], [180, 0]);

    return { transform: [{ rotate: `${rotate}deg` }] };
  });

  return (
    <Animated.Text style={[{ color }, styles.chevron, rChevronStyle]}>
      &#x25B2;
    </Animated.Text>
  );
}

const styles = StyleSheet.create({
  chevron: {
    fontSize: 14,
    marginLeft: "auto",
    marginRight: 8,
  },
});

export default Chevron;
